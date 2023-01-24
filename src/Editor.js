import React, { useState, useEffect, useLayoutEffect, useRef, forwardRef } from 'react';

// lexical library components
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  $getRoot,
  $getSelection,
  $createrootNode,
  $createTextNode,
  $getRangeAt,
  $createRange,
  $isRangeSelection,
  $createLinkNode,
  $getNodeByKey,
  $rootTextContent,
  $insertNodeToNearestRoot
} from "lexical";
import {
  INSERT_root_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  CLEAR_EDITOR_COMMAND,
  INSERT_LINK_COMMAND,
  INSERT_PARAGRAPH_COMMAND
} from "lexical";
import { $generateNodesFromDOM } from '@lexical/html';

// components
import ExampleTheme from "./themes/ExampleTheme";

/**
 * get useLexicalComposeContest and  store one state
 * using useEffect
 * run editer registerCommand 
 * passing dep editer state
 */
const MyCustomLineBreakNodePlugin = () => {
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

const MyCustomAddCursorTaskOption = (props) => {
  const { taskName, cursor } = props;
  const [editor] = useLexicalComposerContext();
  const [value, setValue] = useState("");

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot().getFirstChild();
      const textnode = $createTextNode(value)
      root.append(textnode);
    });
  }, [editor, value]);

  const handleOptionChange = (option) => {
    setValue(value.slice(0, cursor) + option + value.slice(cursor))
  };

  return (
    <select onChange={(e) => handleOptionChange(e.target.value)}>
      <option value="ONE">ONE</option>
      <option value="TWO">TWO</option>
      <option value="THREE">THREE</option>
    </select>
  );
}


export const Editor = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [cursor, setCursor] = useState('');
  console.log(taskName)

  const onChangeTaskDescripation = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setTaskDescription(root.__cachedText)
    });
  }

  const editorConfig = {
    namespace: 'MyEditor',
    theme: ExampleTheme,
    onError(error) {
      console.log(error);
    },
  };

  const onChangeTaskName = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      setCursor(selection.anchor.offset);
      setTaskName(root.__cachedText)
    });
  };

  return (
    <>
      <div className='editor-container'>
        <LexicalComposer initialConfig={editorConfig}>
          <span>Task Name*</span>
          <MyCustomAddCursorTaskOption cursor={cursor} taskName={taskName} />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input1" />}
              placeholder={<div className="editor-placeholder1">Enter Task Name...</div>}
              ErrorBoundary={ErrorBoundary}
            />
            <OnChangePlugin onChange={onChangeTaskName} />
            <MyCustomLineBreakNodePlugin />
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



