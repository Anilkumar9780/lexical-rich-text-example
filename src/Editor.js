import React, { useState } from 'react';

// lexical library components
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkNode } from "@lexical/link";
import { $getRoot } from "lexical";

// components
import ExampleTheme from "./themes/ExampleTheme";
import { CustomPreventLineBreakNodePlugin } from './plugins/CustomPreventLineBreakNodePlugin';
import { AddValueInTextFieldAddCursorTaskOption } from './plugins/AddValueInTextFieldCurrentCursorPointerPlugin';

export const Editor = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const onChangeTaskDescripation = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setTaskDescription(root?.__cachedText)
    });
  }

  const editorConfig = {
    namespace: 'MyEditor',
    theme: ExampleTheme,
    editor__DEPRECATED: null,
    nodes: [LinkNode],
    onError(error) {
      console.log(error);
    },
  };

  const onChangeTaskName = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setTaskName(root?.__cachedText)
    });
  };

  return (
    <>
      <div className='editor-container'>
        <LexicalComposer initialConfig={editorConfig}>
          <AddValueInTextFieldAddCursorTaskOption taskName={taskName} />
          <span>Task Name*</span>
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input1" />}
              placeholder={<div className="editor-placeholder1">Enter Task Name...</div>}
              ErrorBoundary={ErrorBoundary}
            />
            <OnChangePlugin onChange={onChangeTaskName} />
            <CustomPreventLineBreakNodePlugin />
          </div>
        </LexicalComposer>
        <br />
        <LexicalComposer initialConfig={editorConfig}>
          <span>Task Description*</span>
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div className="editor-placeholder">Enter Task Description...</div>}
              ErrorBoundary={ErrorBoundary}
            />
            <OnChangePlugin onChange={onChangeTaskDescripation} />
          </div>
        </LexicalComposer>
      </div>
    </>
  );
}



