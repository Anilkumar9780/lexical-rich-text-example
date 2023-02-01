import React, { useEffect } from "react";

// lexical library components
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// lexical library Command
import {
    COMMAND_PRIORITY_EDITOR,
    INSERT_PARAGRAPH_COMMAND,
} from "lexical";

export const CustomPreventLineBreakNodePlugin = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        editor.registerCommand(
            INSERT_PARAGRAPH_COMMAND,
            () => {
                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);
}
