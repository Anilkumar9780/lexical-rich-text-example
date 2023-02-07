import React, { useEffect } from "react";

// lexical library components
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// lexical library Command
import {
    COMMAND_PRIORITY_EDITOR,
    KEY_ENTER_COMMAND
} from "lexical";

export const CustomPreventLineBreakNodePlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.registerCommand(
            KEY_ENTER_COMMAND,
            (event) => {
                if (
                    (event?.shiftKey && event?.keyCode === 13) ||
                    event?.keyCode === 13
                ) {
                    event.preventDefault();
                    return true;
                }
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);
}
