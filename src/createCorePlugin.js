/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import DEFAULT_ATOMIC_BLOCKS from "./atomicBlocks/default";
import notFoundAtomicBlock from "./atomicBlocks/not-found";
import Media from "./components/Media";


export default function createCorePlugin (config = {}) {
  return {
    getValidAtomicBlocks(atomicBlocks) {
      return atomicBlocks.filter((atomicBlock) => {
        const isInvalid = (!atomicBlock || typeof atomicBlock.type !== "string");
        if (isInvalid) {
          console.warn("AtomicBlock: Missing `type` field. Details: ", atomicBlock);
        }
        return !isInvalid;
      });
    },

    getAtomicBlocksByType(atomicBlocks) {
      return atomicBlocks.reduce((atomicBlocksByType, atomicBlock) => {
        atomicBlocksByType[atomicBlock.type] = atomicBlock;
        return atomicBlocksByType;
      }, {});
    },

    blockRendererFn(contentBlock, PluginFunctions) {
      const {
        setEditorState,
        getEditorState,
        getReadOnly,
        setReadOnly,
        getProps
      } = PluginFunctions;

      if (contentBlock.getType() !== "atomic") {
        return null;
      }

      const type = contentBlock.getData().toObject().type;

      const {atomicBlocks} = getProps();
      const atomicBlocksByType = this.getAtomicBlocksByType(atomicBlocks);
      let atomicBlock = atomicBlocksByType[type] || this.handleBlockNotFound(contentBlock, PluginFunctions);
      if (!atomicBlock) {
        return null;
      }

      return {
        component: Media,
        editable: false,
        props: {
          atomicBlock: atomicBlock,
          // TODO: temporary compatibility for old plugins
          get plugin() {
            console.warn("Megadraft will remove `blockProps.plugin` prop in future versions, please use `blockProps.atomicBlock` instead");
            return atomicBlock;
          },
          // TODO: make atomicBlocks use setEditorState instead of onChange
          onChange: setEditorState,
          // TODO: make atomicBlocks use getEditorState instead of editorState
          editorState: getEditorState(),
          setReadOnly: setReadOnly,
          getReadOnly: getReadOnly,
          // TODO: support setInitialReadOnly
          getInitialReadOnly: this.getInitialReadOnly,
          setInitialReadOnly: this.setInitialReadOnly
        }
      };
    },

    handleBlockNotFound(contentBlock, {getProps}) {
      const {handleBlockNotFound} = getProps();
      if (handleBlockNotFound) {
        return handleBlockNotFound(contentBlock);
      }
      return notFoundAtomicBlock;
    },

    blockStyleFn(contentBlock) {
      const type = contentBlock.getType();
      if (type === "unstyled") {
        return "paragraph";
      }
    },

    // handleKeyCommand(command, {setEditorState}) {
    //   // external key bindings
    //   if (this.keyBindings.length) {
    //     const extKb = this.keyBindings.find(kb => kb.name === command);
    //     if (extKb) {
    //       extKb.action();
    //       return true;
    //     }
    //   }
    //
    //   const {editorState} = this.props;
    //   const newState = RichUtils.handleKeyCommand(editorState, command);
    //   if (newState) {
    //     setEditorState(newState);
    //     return true;
    //   }
    //   return false;
    // },
    //
    // handleReturn(event) {
    //   if (this.props.softNewLines === false) {
    //     return false;
    //   }
    //
    //   if (!event.shiftKey) {
    //     const {editorState} = this.props;
    //     const selection = editorState.getSelection();
    //     const contentState = editorState.getCurrentContent();
    //     const currentBlock = contentState.getBlockForKey(selection.getEndKey());
    //     const endOffset = selection.getEndOffset();
    //     const atEndOfBlock = (endOffset === currentBlock.getLength());
    //     const resetStyleNewLine = this.props.resetStyleNewLine;
    //     const noReset = this.blocksWithoutStyleReset.includes(currentBlock.type);
    //
    //     if (atEndOfBlock && resetStyleNewLine) {
    //       const blockType = noReset ? currentBlock.type : "unstyled";
    //       this.resetBlockStyle(
    //         editorState,
    //         selection,
    //         contentState,
    //         currentBlock,
    //         blockType
    //       );
    //       return true;
    //     }
    //     return false;
    //   }
    //
    //   const {editorState} = this.props;
    //
    //   const currentContent = editorState.getCurrentContent();
    //   const currentSelection = editorState.getSelection();
    //   const contentBlock = currentContent.getBlockMap().get(currentSelection.getFocusKey());
    //   const contentText = contentBlock.getText();
    //
    //   if (contentText.charAt(currentSelection.focusOffset -1) == "\n" ||
    //       contentText.charAt(currentSelection.focusOffset) == "\n"){
    //     return false;
    //   }
    //
    //   const newState = RichUtils.insertSoftNewline(editorState);
    //   this.props.onChange(newState);
    //   return true;
    // },

    onTab(event) {
      event.preventDefault();
    }
  };
}
