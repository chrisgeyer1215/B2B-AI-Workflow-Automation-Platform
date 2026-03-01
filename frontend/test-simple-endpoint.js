// Test the simple endpoint
async function testSimpleEndpoint() {
  try {
    console.log('Testing simple endpoint...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      role: 'CEO',
      goal: 'Automate lead handling and onboarding',
      budget: '$5000',
      timeline: '30 days'
    };

    const response = await fetch('http://localhost:3000/api/lead-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Simple endpoint test successful!');
      console.log('Response:', result);
    } else {
      console.log('❌ Simple endpoint test failed');
      console.log('Response:', result);
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testSimpleEndpoint();
