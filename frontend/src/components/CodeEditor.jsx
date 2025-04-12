import { useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, onChange }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const getLanguageId = () => {
    console.log(language);
    return language === "r" ? "r" : "python";
  };

  return (
    <Editor
      height="450px"
      defaultLanguage={getLanguageId()}
      language={getLanguageId()}
      value={code || getPlaceholderCode()}
      onChange={onChange}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontLigatures: true,
        fontSize: 14,
        tabSize: 2,
        scrollbar: {
          useShadows: false,
          verticalScrollbarSize: 3,
          horizontalScrollbarSize: 4,
          vertical: "visible",
          horizontal: "visible",
          alwaysConsumeMouseWheel: false,
        },
      }}
      className="border rounded-md overflow-hidden"
    />
  );
};

export default CodeEditor;
