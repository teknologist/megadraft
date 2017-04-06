/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import {ModalBody} from "backstage-modal";
import AtomicBlocksModalItem from "./AtomicBlocksModalItem";


export default class AtomicBlocksModalList extends Component {
  constructor(props) {
    super(props);
    this.modalClose = ::this.modalClose;
  }

  modalClose() {
    this.props.toggleModalVisibility();
  }

  render() {

    return (
      <ModalBody>
        <AtomicBlocksModalItem
          toggleModalVisibility={this.modalClose}
          atomicBlocks={this.props.atomicBlocks}
          onChange={this.props.onChange}
          editorState={this.props.editorState}
        />
      </ModalBody>
    );
  }
}
