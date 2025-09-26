import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

function CodeEditor() {
    const editorRef = useRef();
    const [language, setLanguage] = useState("javascript");
    const [value, setValue] = useState("");

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelectLanguage = (language) => { 
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]); 
    };
    return (
        <div className="flex space-x-4"> 
            <div className="w-1/2">
                <LanguageSelector language={language} onSelect={onSelectLanguage}/>
                <Editor 
                    height="90vh" 
                    theme="vs-dark" 
                    language={language} 
                    defaultValue={CODE_SNIPPETS[language]}
                    onMount={onMount}
                    value={value}
                    onChange={
                        (val) => setValue(val)
                    }
                />
            </div>
            <Output editorRef={editorRef} language={language} />
        </div>
    );
}
export default CodeEditor;