document.getElementById('submit').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  const responseElement = document.getElementById('response');
  responseElement.textContent = 'Parsai is thinking...';

  const OPENAI_API_KEY = ''; // OpenAI API Key

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: userInput }],
        max_tokens: 3000
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0].message) {
      responseElement.textContent = data.choices[0].message.content.trim();
    } else {
      responseElement.textContent = 'Invalid response from OpenAI API';
    }
  } catch (error) {
    responseElement.textContent = `Error: ${error.message}`;
  }
});

browser.storage.local.get('key').then((result) => {
  console.log('Stored value:', result.key);
}).catch((error) => {
  console.error('Error accessing storage:', error);
});
