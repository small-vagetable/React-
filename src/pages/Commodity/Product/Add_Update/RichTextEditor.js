import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import './index.css'

export default class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    const html = this.props.detail;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

   uploadImageCallBack =(file)=> {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api1/manage/img/upload');
        // xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => { 
          const response = JSON.parse(xhr.responseText);
          const url = response.data.url;
          console.log(url)
          resolve({data:{link:url}});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  onEditorStateChange = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      
        <Editor
          localization={{ locale: 'zh' }}
          editorClassName ='eidtor'
          editorState={editorState}
          editorStyle={{border:'1px solid balck',height:'250px'}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            // inline: { inDropdown: true },
            // list: { inDropdown: true },
            // textAlign: { inDropdown: true },
            // link: { inDropdown: true },
            // history: { inDropdown: true },
            image: { uploadCallback:this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        
        
    );
  }
}