import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');

  const [value, setValue] = useState('');
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  const convertBase64ToPng = () => {
    // Extract Base64 images from the editor's HTML
    const base64Regex = /<img.*?src="data:image\/(.*?);base64,(.*?)".*?>/g;
    let newEditorHtml = editorHtml.replace(base64Regex, (match, format, base64String) => {
      // Convert Base64 to PNG
      const binaryData = atob(base64String);
      const byteArray = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
          byteArray[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: `image/${format}` });

      // Create a data URL for the PNG
      const imageUrl = URL.createObjectURL(blob);

      // Replace the Base64 image with the PNG image
      return `<img src="${imageUrl}" />`;
    });

    // Update the editor's content with PNG images
    setEditorHtml(newEditorHtml);
  };

//   const convertBase64ToPng = () => {
//     // Extract Base64 images from the editor's HTML
//     const base64Regex = /<img.*?src="data:image\/(.*?);base64,(.*?)".*?>/g;
//     const matches = editorHtml.matchAll(base64Regex);

//     let newEditorHtml = editorHtml;

//     for (const match of matches) {
//         const format = match[1];
//         const base64String = match[2];

//         // Convert Base64 to PNG
//         const binaryData = atob(base64String);
//         const arrayBuffer = new ArrayBuffer(binaryData.length);
//         const byteArray = new Uint8Array(arrayBuffer);
//         for (let i = 0; i < binaryData.length; i++) {
//             byteArray[i] = binaryData.charCodeAt(i);
//         }
//         const blob = new Blob([byteArray], { type: `image/${format}` });

//         // Create a data URL for the PNG
//         console.log(blob,"blob");
//         const imageUrl = URL.createObjectURL(blob);
//           console.log(imageUrl,"imageUrl");
//         // Replace the Base64 image with the PNG image
//         newEditorHtml = newEditorHtml.replace(
//             match[0],
//             `<img src="${imageUrl}"  />`
//         );
//     }

//     // Update the editor's content with PNG images
//     setEditorHtml(newEditorHtml);

//     console.log(newEditorHtml);
// };

  const module={
    toolbar:toolbarOptions
  }
  return (
    <>
    <ReactQuill modules={module} theme="snow" value={editorHtml} onChange={setEditorHtml} />
    <Button onClick={()=>convertBase64ToPng()}>
      Submit
    </Button>
    <p
                      className="mt-5"
                      dangerouslySetInnerHTML={{ __html:editorHtml}}
                    ></p>
    </>
  );
};

export default MyEditor;
