import { React, useEffect, useState } from 'react';

// lexical library components
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $getSelection,
    $createTextNode,
    $isRangeSelection,
    $isRootNode,
} from "lexical";

export const MyCustomAddCursorTaskOption = () => {
    const [editor] = useLexicalComposerContext();
    const [value, setValue] = useState("");

    useEffect(() => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const textnode = $createTextNode(value)
                if ($isRootNode(selection.anchor.getNode())) {
                    selection.insertText();
                }
                selection.insertNodes([textnode]);
            }
        });
    }, [editor, value]);

    const handleOptionChange = (option) => {
        setValue(option)
    }

    return (
        <div style={{  marginLeft: "600px" }}>
            <select onChange={(e) => handleOptionChange(e.target.value)}>
                <option value="ONE">ONE</option>
                <option value="TWO">TWO</option>
                <option value="THREE">THREE</option>
                <option value="FOUR">FOUR</option>
                <option value="FIVE">FIVE</option>
                <option value="SIX">SIX</option>
                <option value="SEVEN">SEVEN</option>
                <option value="EIGHT">EIGHT</option>
            </select>
        </div>
    );
}

