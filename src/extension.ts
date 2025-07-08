import * as vscode from 'vscode';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';



OpenAI API key
const OPENAI_API_KEY = '';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('parsai.chat', async () => {
        const userInput = await vscode.window.showInputBox({ prompt: 'Enter your question for ChatGPT' });

        if (userInput) {
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Parsai is thinking...",
                cancellable: false
            }, async (progress, token) => {
                try {
                    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                        model: 'gpt-4',
                        messages: [{ role: 'user', content: userInput }],
                        max_tokens: 2600  // Increase max_tokens to get more content
                    }, {
                        headers: {
                            'Authorization': `Bearer ${OPENAI_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.data && response.data.choices && response.data.choices[0].message) {
                        const output = response.data.choices[0].message.content.trim();
                        await displayResponseInEditor(output);
                    } else {
                        throw new Error('Invalid response format from OpenAI API');
                    }
                } catch (error) {
                    let errorMessage = 'Error communicating with OpenAI API';
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data && error.response.data.error) {
                            errorMessage += `: ${error.response.data.error.message}`;
                        } else {
                            errorMessage += `: ${error.message}`;
                        }
                    } else if (error instanceof Error) {
                        errorMessage += `: ${error.message}`;
                    } else {
                        errorMessage += ': An unknown error occurred';
                    }
                    vscode.window.showErrorMessage(errorMessage);
                }
            });
        }
    });

    context.subscriptions.push(disposable);
}

async function displayResponseInEditor(output: string) {
    const language = detectLanguage(output);
    const fileExtension = getFileExtension(language);
    const fileName = `response.${fileExtension}`;
    const filePath = path.join(vscode.workspace.rootPath || '', fileName);

    // Write the output to a new file
    fs.writeFileSync(filePath, output);

    // Open the new file in the editor
    const doc = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(doc, { preview: false });

    // Set the language mode of the opened document
    await vscode.languages.setTextDocumentLanguage(doc, language);
}

function detectLanguage(text: string): string {
    if (text.startsWith("```")) {
        const firstLine = text.split('\n')[0];
        const language = firstLine.slice(3).trim();
        return language || 'plaintext';
    }
    return 'plaintext';
}

function getFileExtension(language: string): string {
    const languageToExtension: { [key: string]: string } = {
        'python': 'py',
        'javascript': 'js',
        'typescript': 'ts',
        'html': 'html',
        'css': 'css',
        'java': 'java',
        'c': 'c',
        'cpp': 'cpp',
        'ruby': 'rb',
        'go': 'go',
        'php': 'php',
        'swift': 'swift',
        'kotlin': 'kt',
        'rust': 'rs',
        'r': 'r',
        'perl': 'pl',
        'plaintext': 'txt'
    };
    return languageToExtension[language] || 'txt';
}

export function deactivate() {}
