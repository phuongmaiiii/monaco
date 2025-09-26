import axios from 'axios';

const API = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston'
});

export const executeCode = async (language, sourceCode,) => {
    const response = await API.post("/execute", {
        "language": language,
        "version": "*",
        "files": [
            {
                name: `main.${getExtension(language)}`,
                "content": sourceCode
            }
        ]
    });
    return response.data;
};

const getExtension = (language) => {
    switch (language) {
        case 'javascript':
            return 'js';
        case 'typescript':
            return 'ts';
        case 'python':
            return 'py';
        case 'java':
            return 'java';
        case 'csharp':
            return 'cs';
        case 'php':
            return 'php';
        default:
            return 'txt';
    }
};

