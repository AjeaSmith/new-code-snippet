// components/DynamicCodeEditor.js
import AceEditor from "react-ace";
// Import all the supported modes and themes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = ({ lang, value, onChange }) => {
	return (
		<AceEditor
			name="code"
			value={value}
			onChange={onChange}
			width="100%"
			height="300px"
			mode={lang}
			theme="monokai"
			setOptions={{ useWorker: false }}
			editorProps={{ $blockScrolling: true }}
		/>
	);
};

export default CodeEditor;
