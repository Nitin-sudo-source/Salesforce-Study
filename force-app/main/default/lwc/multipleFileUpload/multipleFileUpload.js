import { LightningElement } from 'lwc';

export default class MultipleFileUpload extends LightningElement {

    handleUploadFinished(event) {
        const files = event.detail.files;
        const fileCount = files.length;
    
        // Display file information using an alert
        let fileDetails = '';
        files.forEach((file) => {
          fileDetails += `Name: ${file.name}, Size: ${file.size} bytes\n`;
        });
        alert(`Uploaded ${fileCount} file(s):\n\n${fileDetails}`);
      }
    
}