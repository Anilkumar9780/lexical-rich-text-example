import React, { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $isRootNode,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  $createTextNode
} from "lexical";

export const INSERT_RICH_LEGISLATION_COMMAND = createCommand();
export const CONVERT_SELECTION_TO_RICH_LEGISLATION_COMMAND = createCommand();

export function RichLegislationNodePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_RICH_LEGISLATION_COMMAND,
      () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const textnode = $createTextNode('Anil')

          if ($isRootNode(selection.anchor.getNode())) {
            selection.insertParagraph();
          }

          selection.insertNodes([textnode]);
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      CONVERT_SELECTION_TO_RICH_LEGISLATION_COMMAND,
      () => {
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
