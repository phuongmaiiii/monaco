import { LANGUAGE_VERSIONS } from "../constants";
const languages = Object.entries(LANGUAGE_VERSIONS);

function LanguageSelector({ language, onSelect}) {   

    return (
        <div>
            <label className="text-gray-900 mb-2 text-lg font-semibold">Language:</label>
            <select 
                className="border bg-gray-700 text-white border-gray-900 rounded p-2 ml-2 mb-1 cursor-pointer"
                value={language}
                onChange={(e) => onSelect(e.target.value)}
            >
                {languages.map(([lang, version]) => (
                    <option key={lang} value={lang}>
                        {lang} (v{version})
                    </option>
                ))}
            </select>
        </div>
    );
}
export default LanguageSelector;