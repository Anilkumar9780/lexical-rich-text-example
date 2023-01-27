import { useCallback, useEffect, useState } from "react";
import { $isAtNodeEnd } from "@lexical/selection";
import {
    $getSelection,
    $isRangeSelection,
    $isTextNode,
    COMMAND_PRIORITY_EDITOR,
} from "lexical";
import {
    createCommand,
} from "lexical";


export const DETECT_LEGISLATION = createCommand();

function getSelectedNode(selection) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
        return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
}

export function useSelectedNode(editor) {
    const [isText, setIsText] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [isDetection, setDetection] = useState(false);
    const [isHTMLImport, setIsHTMLImport] = useState(false);


    const detectChanges = useCallback(() => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            const nativeSelection = window.getSelection();
            const rootElement = editor.getRootElement();
            if (
                nativeSelection !== null &&
                (!$isRangeSelection(selection) ||
                    rootElement === null ||
                    !rootElement.contains(nativeSelection.anchorNode))
            ) {
                setIsText(false);
                setIsLink(false);
                setIsHTMLImport(false);
                return;
            }
            if (!$isRangeSelection(selection)) {
                return;
            }
            const node = getSelectedNode(selection);
            if (selection.getTextContent() !== "") {
                const isText = $isTextNode(node);
                setIsText(isText);
            } else {
                setIsText(false);
                if ($isTextNode(node)) {
                    setDetection(false);
                }
            }
        });
    }, [editor]);

    useEffect(() => {
        return editor.registerCommand(
            DETECT_LEGISLATION,
            () => {
                const domSelection = window.getSelection();
                if (domSelection) {
                    setDetection(true);
                }
                return false;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);

    useEffect(() => {
        return editor.registerUpdateListener(() => {
            detectChanges();
        });
    }, [editor, detectChanges]);

    return [
        Boolean(isText),
        Boolean(isLink),
        Boolean(isDetection),
        Boolean(isHTMLImport),
    ];
}
