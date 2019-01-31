var http = HTTP.create(); // create HTTP object

var response = http.request({
  "url": "https://api.personalstats.nl/webhook/{rest_of_the_url}",
  "method": "POST",
  "data": {
    "name": draft.content
  },
  "headers": {
      "Content-Type": "application/json"
  }
});

if (response.success) {
  console.log('Posted to Workflowy!');
} else {
  console.log(response.statusCode);
  console.log(response.error);
}