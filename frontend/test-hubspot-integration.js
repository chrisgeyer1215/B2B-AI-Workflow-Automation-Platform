const https = require('https');

async function testHubSpotIntegration() {
  try {
    console.log('Testing HubSpot integration...');
    
    const testData = {
      name: 'Test User HubSpot',
      email: `test-hubspot-${Date.now()}@gmail.com`,
      company: 'Test Company HubSpot',
      role: 'Marketing Manager',
      goal: 'Test CRM integration',
      budget: '$5000',
      timeline: '30 days'
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
      
      res.on('data', (chunk) => {
        console.log('Response:', chunk.toString());
      });
    });
    
    req.on('error', (e) => {
      console.error('Request error:', e.message);
    });
    
    req.write(postData);
    req.end();
    
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testHubSpotIntegration();
