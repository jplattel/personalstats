from chalice import Chalice, CognitoUserPoolAuthorizer, BadRequestError, NotFoundError
from wfapi.error import WFLoginError
from wfapi.workflowy.features.deamon import WFMixinDeamon
from wfapi import *
import boto3
from decouple import config

# Chalice application config
app = Chalice(app_name='personalstats')
app.debug = config('DEBUG', default=False, cast=bool)

# Authorizer for most endpoints
authorizer = CognitoUserPoolAuthorizer(
    config('COGNITO_USER_POOL_NAME'), 
    provider_arns=[config("COGNITO_USER_POOL_ARN")]
)
# Cognito client for getting users from the backend
cognito_client = boto3.client('cognito-idp')
dynamo_db = boto3.client('dynamodb', region_name='us-west-1')

# Utilty function for rendering the nodes from Workflowy (should be made memory save (with an iterator?))
def render_nested_json(root, indent=0):
    node = {
        "name": root.name, 
        "uuid": root.projectid,
        "last_modified": str(root.last_modified)
    }
    if root.children:
        node['children'] = []
        indent += 1
        for child_node in root.children:
            n = render_nested_json(child_node, indent=indent)
            node['children'].append(n)
    return node

# Get all cards for a user
@app.route('/cards', methods=['GET'], authorizer=authorizer, cors=True)
def dashboard():
    cognito_identity_id = app.current_request.identity.cognitoIdentityId
    filter_by_cognito_identity_id = Key('cognito_identity_id').eq(cognito_identity_id)
    cards = dynamo_db.query(
        TableName=config('DYNAMO_DB_TABLE'),
        KeyConditionExpression=filter_by_cognito_identity_id
    )
    return {"cards": cards}

# Create a card for a user
@app.route('/cards', methods=['POST'], authorizer=authorizer, cors=True)
def create_card():
    cognito_identity_id = dict(app.current_request)
    # .get('cognitoIdentityId')
    # card = app.current_request.json_body
    # card.update(cognito_identity_id=cognito_identity_id)
    # dynamo_db.put_item(
    #     TableName=config('DYNAMO_DB_TABLE'),
    #     Item=card,
    # )
    return {"card": cognito_identity_id}

# TODO: Delete a card route
@app.route('/cards/{card_uuid}/delete', methods=['POST'], authorizer=authorizer, cors=True)
def delete_card():
    return {"statuss": 'deleted'}

# Basic endpoint for healthchecks (used by the author)
@app.route('/status', methods=['GET'], cors=True)
def authenticated():
    return {"status": "ok"}

# Endpoint that let's you configure invite codes
@app.route('/signup/invite', methods=["GET"], cors=True)
def check_invite_code():
    # TODO: get from env, user .split(",") for multiple
    invite = app.current_request.query_params.get('invite', '')
    invite_codes = [
        "personal-beta" 
    ]
    if invite in invite_codes:
        return {"invite": "accepted"}
    else:
        raise BadRequestError("Invalid invite code..")

# Endpoint that lets a user login into workflowy, returning a session I
@app.route('/workflowy/login', methods=['POST'], authorizer=authorizer, cors=True)
def workflowy_login():
    data = app.current_request.json_body
    # Login to workflowy and collect the session token.. 
    try:
        wf = Workflowy(username=data['username'], password=data['password'])
        return {'session_id': wf.browser.session.cookies.get('sessionid')}
    except WFLoginError:
        raise BadRequestError("Cannot authorize with Workflowy")

# Endpoint to get the current data from Workflowy
@app.route('/workflowy/data', methods=['POST'], authorizer=authorizer, cors=True)
def workflowy_data():
    data = app.current_request.json_body
    # Login to workflowy and collect the session token.. 
    try:
        wf = Workflowy(sessionid=data['session_id'])
        data = []
        for root_node in wf.root:
            data.append(render_nested_json(root_node))
        return data
    except WFLoginError:
        raise BadRequestError("Cannot authorize with Workflowy")

# Webhook url that is generated based on the cognito user ID & a code 
# (reconfigurable by the user) that is stored with the cognito user
@app.route('/webhook/{webhook_code}/{cognito_id}', methods=['POST'], cors=True)
def webhook_activate(webhook_code, cognito_id):

    # See if we can find a user in Cognito
    cognito_user = cognito_client.list_users(
        UserPoolId="us-east-1_C9oDqsGvF",
        Filter="sub = \"{}\"".format(cognito_id)
    ).get('Users')
    if len(cognito_user) != 1:
        raise NotFoundError('Webhook not found')
    
    # Check if the user has a webhook code
    attributes = cognito_user[0].get("Attributes", [])
    user_webhook_code = list(filter(
        lambda attr: attr.get("Name") == "custom:webhook_code", attributes
    ))
    if len(user_webhook_code) != 1:
        raise NotFoundError('Webhook not found')
    
    # Check if the webhook code matches
    if not webhook_code == user_webhook_code[0].get("Value"):
        raise NotFoundError('Webhook not found')

    # Get the session ID from the user attributes
    session_id = list(filter(
        lambda attr: attr.get("Name") == "custom:session_id", attributes
    ))
    if len(session_id) != 1:
        raise NotFoundError('Webhook not found')

    # Get the post data: expecting: {"name": "node content here"}
    data = app.current_request.json_body

    # Setup workflowy
    wf = Workflowy(sessionid=session_id[0].get("Value"))
    node = wf.root.create()
    try:
        node.edit(data.get("name"))
        return {"status": 'ok'}
    except WFLoginError:
        # TODO: email the user once the let them know we have trouble with the 
        # connection to workflowy. (and then suffix the expended session ID)
        raise BadRequestError("Cannot authorize with Workflowy")

# # @app.on_s3_event(bucket='workflowy-data')
# # def parse_email(event):
# #     print("Object uploaded for bucket: %s, key: %s" % (event.bucket, event.key))