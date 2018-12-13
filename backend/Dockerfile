FROM python:3.6.7

# Create code dir in the container
RUN mkdir /code

# Add code to run
ADD . /code/
WORKDIR /code

# Add requirements
ADD requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt
RUN pip install boto3
RUN pip install chalice

# Run locally
CMD ["chalice", "local", "--autoreload", "--host", "0.0.0.0"]