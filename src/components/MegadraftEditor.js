/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

// i18n shim! I feel bad for doing this =(
// https://github.com/megawac/async/blob/d2dd36b4558f483682f3c672630fdcb36a96d4d2/lib/async.js#L16
((typeof self === "object" && self.self === self && self) ||
  (typeof global === "object" && global.global === global && global) ||
  this).__ = (x) => x;

import React, {Component} from "react";
import {
    RichUtils,
    EditorState,
    genKey,
    ContentBlock
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import Immutable from "immutable";


import DefaultToolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import Media from "./Media";
import DEFAULT_ATOMIC_BLOCKS from "../atomicBlocks/default";
import DEFAULT_ACTIONS from "../actions/default";
import DEFAULT_ENTITY_INPUTS from "../entity_inputs/default";
import createCorePlugin from "../createCorePlugin";

const NO_RESET_STYLE_DEFAULT = ["ordered-list-item", "unordered-list-item"];

const corePlugin = createCorePlugin();

export default class MegadraftEditor extends Component {
  static defaultProps = {
    actions: DEFAULT_ACTIONS,
  }

  constructor(props) {
    super(props);
    this.state = {
      readOnly: this.props.readOnly || false
    };

    this.onChange = ::this.onChange;

    this.setReadOnly = ::this.setReadOnly;
    this.getReadOnly = ::this.getReadOnly;
    this.getInitialReadOnly = ::this.getInitialReadOnly;
    this.setInitialReadOnly = ::this.setInitialReadOnly;

    this.entityInputs = this.props.entityInputs || DEFAULT_ENTITY_INPUTS;
    this.blocksWithoutStyleReset = (this.props.blocksWithoutStyleReset ||
                                    NO_RESET_STYLE_DEFAULT);

    this.keyBindings = this.props.keyBindings || [];
  }

  componentWillReceiveProps(nextProps){
    if (this.props.readOnly !== nextProps.readOnly) {
      this.setState({readOnly: nextProps.readOnly});
    }
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  /*
   * Copyright (c) 2016 Icelab
   *
   * License: MIT
   */
   //Based on https://github.com/icelab/draft-js-block-breakout-plugin
  resetBlockStyle(editorState, selection, contentState, currentBlock, blockType) {
    const {List} = Immutable;
    const emptyBlockKey = genKey();

    const emptyBlock = new ContentBlock({
      key: emptyBlockKey,
      text: "",
      type: blockType,
      depth: 0,
      characterList: List(),
      inlineStyleRanges: [],
    });
    const blockMap = contentState.getBlockMap();

    const blocksBefore = blockMap.toSeq().takeUntil(function (v) {
      return v === currentBlock;
    });
    const blocksAfter = blockMap.toSeq().skipUntil(function (v) {
      return v === currentBlock;
    }).rest();

    const augmentedBlocks = [
      [currentBlock.getKey(), currentBlock],
      [emptyBlockKey, emptyBlock],
    ];

    const focusKey = emptyBlockKey;
    const newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap();
    const newContentState = contentState.merge({
      blockMap: newBlocks,
      selectionBefore: selection,
      selectionAfter: selection.merge({
        anchorKey: focusKey,
        anchorOffset: 0,
        focusKey: focusKey,
        focusOffset: 0,
        isBackward: false
      })
    });

    const noStyle = Immutable.OrderedSet([]);
    const resetState = EditorState.push(editorState, newContentState, "split-block");
    const noStyleState = EditorState.setInlineStyleOverride(resetState, noStyle);
    this.props.onChange(noStyleState);
  }


  focus() {
    this.refs.draft.focus();
  }

  setReadOnly(readOnly) {
    this.setState({readOnly});
  }

  getReadOnly() {
    return this.state.readOnly;
  }

  getInitialReadOnly() {
    return this.props.readOnly || false;
  }

  setInitialReadOnly() {
    let readOnly = this.props.readOnly || false;
    this.setState({readOnly});
  }

  renderSidebar(props) {
    const {sidebarRendererFn} = this.props;
    if(typeof sidebarRendererFn === "function") {
      return sidebarRendererFn(props);
    }
    return <Sidebar {...props} />;
  }

  renderToolbar(props) {
    const {Toolbar = DefaultToolbar} = this.props;
    return <Toolbar {...props} />;
  }

  render() {
    return (
      <div className="megadraft">
        <div
          className="megadraft-editor"
          id="megadraft-editor"
          ref="editor">
          {this.renderSidebar({
            atomicBlocks: this.props.atomicBlocks,
            editorState: this.props.editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            maxSidebarButtons: this.props.maxSidebarButtons,
            modalOptions: this.props.modalOptions,
          })}
          <Editor
            {...this.props}
            ref="draft"
            readOnly={this.state.readOnly}
            atomicBlocks={this.props.atomicBlocks}
            plugins={[corePlugin]}
            onChange={this.onChange}
          />
          {this.renderToolbar({
            editor: this.refs.editor,
            editorState: this.props.editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            actions: this.props.actions,
            entityInputs: this.entityInputs,
            shouldDisplayToolbarFn: this.props.shouldDisplayToolbarFn,
          })}
        </div>
      </div>
    );
  }
}
