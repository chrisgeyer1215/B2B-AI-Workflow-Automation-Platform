// Test script to simulate form submission
async function testFormSubmission() {
  try {
    console.log('Testing form submission...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      role: 'CEO',
      goal: 'Automate lead handling and onboarding',
      budget: '$5000',
      timeline: '30 days'
    };

    const response = await fetch('http://localhost:3000/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Form submission successful!');
      console.log('Response:', result);
    } else {
      console.log('❌ Form submission failed');
      console.log('Response:', result);
    }
  } catch (error) {
    console.error('Test submission error:', error);
  }
}

testFormSubmission();
