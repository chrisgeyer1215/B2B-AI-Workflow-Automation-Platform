const https = require('https');

async function createTestLead() {
  try {
    console.log('Creating test lead for dashboard...');
    
    const testData = {
      name: 'John Doe',
      email: `john.doe.${Date.now()}@example.com`,
      company: 'Test Corp',
      role: 'Marketing Director',
      goal: 'Interested in lead automation',
      budget: '$10,000',
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
      
      if (res.statusCode === 200) {
        console.log('✅ Test lead created successfully!');
        console.log('📱 Check the dashboard to see the new lead');
      }
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

createTestLead();
