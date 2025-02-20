import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class FileUploadInLwc extends LightningElement {
    @api recordId;

    /*get acceptedFormats() {
        return ['.pdf', '.png','.jpg'];
    }*/
   
    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        const toastEvent = new ShowToastEvent({
            title: "Upload ",
            message: "successfully",
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        alert('No. of files uploaded : ' + uploadedFiles.length);
        eval("$A.get('e.force:refreshView').fire();");

    }
}