import { executeCode } from "../api";
import { useState } from "react";

const Output = ({ editorRef, language}) => {
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        if(!editorRef.current){
            console.error("Editor not ready");
            return;
        }
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const {run:result} = await executeCode(language, sourceCode);
            setOutput(result.output.split('\n'));
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            console.error("Error executing code:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-1/2">
            <label className="text-gray-900 mb-2 text-lg font-semibold">Output:</label>
            <button
                variant="outline"
                className="border bg-gray-700 hover:bg-gray-900 text-white border-gray-900 rounded p-2 ml-2 mb-1 cursor-pointer"
                isLoading={isLoading}
                onClick={runCode}
            >
                Run Code
            </button>
            <div className={`mt-0 p-2 h-[90vh] overflow-y-auto border rounded ${isError ? "border-red-700 text-red-800" : "border-gray-900"}`}>
                {output ? output.map((line, index) => <div key={index}>{line}</div>) : 'Click "Run Code" to see the output here'}
            </div>
        </div>
    );
}

export default Output;
