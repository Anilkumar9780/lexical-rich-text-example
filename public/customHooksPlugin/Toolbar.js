import { useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useSelectedNode } from "./useSelectedNode";
import { INSERT_RICH_LEGISLATION_COMMAND } from "./RichAddTextNodePlugin";

function ToolbarComponent({
  editor,
  isLink,
  isText,
}) {
  const popupCharStylesEditorRef = useRef(null);

  return (
    <div ref={popupCharStylesEditorRef} className="character-style-popup">
      <button
        onClick={() => {
          editor.dispatchCommand(INSERT_RICH_LEGISLATION_COMMAND,null);
        }}
        aria-label="insert rich legislation"
      >
        Insert vlaue
      </button>
    </div>
  );
}

export function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isText, isLink] = useSelectedNode(editor);

  return <ToolbarComponent
    editor={editor}
    isLink={isLink}
    isText={isText}
  />;
}
