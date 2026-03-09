const https = require('https');

const testData = {
  name: "Test User Deployed",
  email: "test-deployed@example.com", 
  company: "Test Co Deployed",
  role: "Manager",
  goal: "Automation",
  budget: "$5000",
  timeline: "1 month"
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'ai-automation-agency-puce.vercel.app',
  path: '/api/lead',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  res.on('data', (chunk) => {
    console.log(`Response: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
