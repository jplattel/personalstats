var http = HTTP.create(); // create HTTP object

var response = http.request({
  "url": "https://h2s4qel6va.execute-api.us-east-1.amazonaws.com/api/webhook/xq3li4/e6d5f7ef-b609-4677-aab7-c4992a77dd52",
  "method": "POST",
  "data": {
    "name": draft.content
  },
  "headers": {
      "Content-Type": "application/json"
  }
});

if (response.success) {
  console.log('success!');
}
else {
  console.log(response.statusCode);
  console.log(response.error);
}