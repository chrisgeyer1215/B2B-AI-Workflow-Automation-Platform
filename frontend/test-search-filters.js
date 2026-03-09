const https = require('https');

async function testSearchAndFilters() {
  try {
    console.log('Testing search and filter functionality...');
    
    // Create multiple test leads with different statuses
    const testLeads = [
      {
        name: 'John Smith',
        email: `john.smith.${Date.now()}@example.com`,
        company: 'Tech Corp',
        status: 'new'
      },
      {
        name: 'Sarah Johnson',
        email: `sarah.j.${Date.now()}@example.com`,
        company: 'Marketing Inc',
        status: 'in_progress'
      },
      {
        name: 'Mike Davis',
        email: `mike.davis.${Date.now()}@example.com`,
        company: 'Sales Co',
        status: 'closed'
      }
    ];
    
    // Submit each lead
    for (const lead of testLeads) {
      const postData = JSON.stringify(lead);
      
      await new Promise((resolve, reject) => {
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
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            console.log(`✅ Created ${lead.name} (${lead.status})`);
            resolve();
          });
        });
        
        req.on('error', reject);
        req.write(postData);
        req.end();
      });
    }
    
    console.log('\n🎯 Test leads created with different statuses!');
    console.log('📱 Now you can test:');
    console.log('   1. Search for "John" or "Sarah"');
    console.log('   2. Filter by status: "New", "In progress", "Closed"');
    console.log('   3. Try combinations: search "Mike" + filter "Closed"');
    
  } catch (err) {
    console.error('❌ Test failed:', err);
  }
}

testSearchAndFilters();
