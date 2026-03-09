const https = require('https');

async function testDashboardActions() {
  try {
    console.log('Testing dashboard actions...');
    
    // First, let's create a test lead via the API to populate the dashboard
    const testData = {
      name: 'Dashboard Test User',
      email: `dashboard.test.${Date.now()}@example.com`,
      company: 'Test Dashboard Corp',
      role: 'Product Manager',
      goal: 'Testing dashboard functionality',
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
      
      if (res.statusCode === 200) {
        console.log('✅ Test lead created successfully!');
        console.log('📱 Now you can:');
        console.log('   1. Login to the dashboard');
        console.log('   2. See the new lead in the table');
        console.log('   3. Try changing the status with the dropdown');
        console.log('   4. Use the "Add test lead" button to create more');
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

testDashboardActions();
