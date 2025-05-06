
<img src='https://github.com/parsabe/Parsai/blob/main/main.jpg'>

# Parsai - GPT-4 Powered Assistant

Parsai is a Edge, Firefox and Chrome extension and a Telegram bot to provide versatile coding assistance using OpenAI's GPT-4.

## Distributions

### 1. Parsai Google Chrome Extension
This Chrome Extension, which uses GPT-4,  helps you by responding to your queries.

#### Features
- **Ask GPT-4**: Enter your questions and get responses directly from GPT-4.
- **Syntax Highlighting**: Responses are formatted and highlighted based on the detected programming language.
- **Dark Theme**: The extension features a sleek dark theme with black and dark purple colors.

#### Setup
1. **Download the Source Code**: Download the source code from the [Releases](https://github.com/your-username/parsai/releases) page.
2. **Extract the Zip File**: Extract the downloaded zip file.
3. **OpenAI API key**: Go to <a href='https://platform.openai.com/settings/organization/api-keys'>OpenAI API Document</a> and get your OpenAI key.
4. **Paste** : Paste your OpenAI key in the popup.js code here:
```js
const OPENAI_API_KEY = ''; //openAI API Key
```

5. **Load Unpacked Extension**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable Developer Mode by toggling the switch in the top right corner.
   - Click on `Load unpacked` and select the extracted directory.



### 2. Parsai Telegram Bot
The Parsai Telegram bot allows you to ask coding questions and receive answers.

#### Features

- Ask questions and get answers from GPT-4 directly in Telegram.
- Easy to use and accessible from anywhere.

#### Setup
1. Go to <a href='https://platform.openai.com/settings/organization/api-keys'>OpenAI API Document</a>
2. Download the Python code from here.
3. Install python modules dependencies:
```py
pip install openai python-telegram-bot
```
5. Install telegram and go to <a href='https://t.me/BotFather'>Telegram BotFather (bot creator)</a>
6. Copy the both OpenAI API and Telegram bot you set and paste them here:
```py
OPENAI_API_KEY = '' #OpenAI API Code
TELEGRAM_API_KEY = '' #Telgram Bot Access Token
```
5. Then Press on start

>
   <br/>


### 3. Firefox Extension

#### Step 0: Prepare Your Extension Files
Ensure your extension files (`manifest.json`, `popup.html`, `popup.js`, `styles.css`, etc.) are complete and properly configured. If needed, include the updated `browser_specific_settings` field in the `manifest.json` for Firefox compatibility.

#### Step 1: OpenAI Setup
1. **Download the Source Code**: Download the source code from the [Releases](https://github.com/your-username/parsai/releases) page.
2. **Extract the Zip File**: Extract the downloaded zip file.
3. **OpenAI API key**: Go to <a href='https://platform.openai.com/settings/organization/api-keys'>OpenAI API Document</a> and get your OpenAI key.
4. **Paste** : Paste your OpenAI key in the popup.js code here:
```js
const OPENAI_API_KEY = ''; //openAI API Key
```

#### Step 2: Open Firefox Developer Tools
1. Launch **Firefox Developer Edition** or **Firefox Nightly**.
   - These are ideal for extension development and testing.
   - Regular Firefox works too, but some features may be restricted.

#### Step 3: Navigate to Debugging Page
1. Open a new tab.
2. Go to `about:debugging`.
3. Click on **"This Firefox"** (or **"This Nightly"** if using Nightly).

#### Step 4: Load the Extension
1. Click on **"Load Temporary Add-on"**.
2. Navigate to your extension’s folder.
3. Select any file in the extension directory (e.g., `manifest.json`).
4. Firefox will load the extension temporarily.

### 4. Microsoft Edge Extension

#### Step 0: Prepare Your Extension Files
Ensure your extension files (`manifest.json`, `popup.html`, `popup.js`, `styles.css`, etc.) are complete and properly configured. Edge supports WebExtension APIs, so your extension’s `manifest.json` should already be compatible. Double-check permissions and ensure everything is in place.

#### Step 1: OpenAI Setup
1. **Download the Source Code**: Download the source code from the [Releases](https://github.com/your-username/parsai/releases) page.
2. **Extract the Zip File**: Extract the downloaded zip file.
3. **OpenAI API key**: Go to <a href='https://platform.openai.com/settings/organization/api-keys'>OpenAI API Document</a> and get your OpenAI key.
4. **Paste** : Paste your OpenAI key in the popup.js code here:
```js
const OPENAI_API_KEY = ''; //openAI API Key
```

#### Step 2: Open Edge Extensions Page
1. Launch **Microsoft Edge**.
2. Open a new tab and go to `edge://extensions/`.
3. Enable **Developer mode** by toggling the switch in the bottom left corner.

#### Step 3: Load Your Extension
1. Click on **"Load unpacked"**.
2. Navigate to your extension’s folder.
3. Select the folder containing your extension files (not an individual file).

#### Step 4: Test Your Extension
1. The extension’s icon should now appear in the Edge toolbar.
2. Click the icon to open and test your extension.
3. Verify all functionality, including inputs, buttons, and API calls.




