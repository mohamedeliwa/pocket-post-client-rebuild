import React, { Component } from "react";
import Head from "next/head";
import {Button} from 'react-bootstrap';

export default class extends Component {
  constructor(props) {
    super(props);
    this.editor;
    this.handleSaving = this.handleSaving.bind(this);
  }
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() { 
    
      this.editor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: "editorjs",
        autofocus: true,
        initialBlock: "header",
        // placeholder?: string|false,
        data: this.props.data,
        tools: {
          header: Header,
          image: {
            // Docs : https://github.com/editor-js/image
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
                byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
              },
            },
          },
          list: List,
          checklist: Checklist,
          quote: Quote,
          delimiter: Delimiter,
          Marker: Marker,
         
        }, // end of tools
        onReady: this.props.onReady,
        onChange: this.props.onChange,
      });
  }

  handleSaving(e) {
    e.preventDefault();
    this.editor
      .save()
      .then((data) => console.log(data))
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }
  render() {
    return (
      <div className="bg-white">
        <Head>
          <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
          <script src="https://cdn.jsdelivr.net/npm/@editorjs/header@latest"></script>
          <script src="https://cdn.jsdelivr.net/npm/@editorjs/image@latest"></script>
          <script src="https://cdn.jsdelivr.net/npm/@editorjs/list@latest"></script>
          <script src="https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest"></script>
          <script src="https://cdn.jsdelivr.net/npm/@editorjs/delimiter@latest"></script>
          <script src="https://cdn.jsdelivr.net/npm/@editorjs/quote@latest"></script>
          <script src="https://cdn.jsdelivr.net/npm/@editorjs/marker@latest"></script>
      
        </Head>
        <div id="editorjs"></div>

        <Button variant="primary" onClick={this.handleSaving}  block>Save</Button>
      </div>
    );
  }
}