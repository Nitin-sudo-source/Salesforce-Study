import { LightningElement, wire, track } from 'lwc';
import fetchFiles from '@salesforce/apex/ShowFIleLWC.fetchFiles';


export default class ShowFileInLWC extends LightningElement {

    @track filesData = [];

    @wire(fetchFiles, { objectName: 'Project__c' })
    wiredFilesData({ error, data }) {
        if (data) {
            this.filesData = data.map(item => ({
                "value": item,
                "url": `/sfc/servlet.shepherd/document/download/${item.contentDocumentId}`,
                "imageUrl": `/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId=${item.contentVersionId}`
            }));
            console.log('Data::::' + JSON.stringify(this.filesData));
        } else if (error) {
            console.error(error);
        }
    }
    


    // @track filesData = [];

    // @wire(fetchFiles, { objectName: 'Project__c' })
    // wiredFilesData({ error, data }) {
    //     if (data) {
    //         this.filesData = Object.keys(data).map(item=>({
    //         "value": data[item],
    //         "url": `/sfc/servlet.shepherd/document/download/${data[item].contentDocumentId}`,
    //         "imageUrl": `/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId=${data[item].contentVersionId}`

    //     }))
    //        console.log('Data::::'+JSON.stringify(this.filesData));

    //     } else if (error) {
    //         // Handle the error
    //         console.error(error);
    //     }
    // }

    // connectedCallback(){
    //     this.previewHandler();

    // }

    // previewHandler(event){
    //     console.log(event.target.dataset.id)
    //     this[NavigationMixin.Navigate]({ 
    //         type:'standard__namedPage',
    //         attributes:{ 
    //             pageName:'filePreview'
    //         },
    //         state:{ 
    //             selectedRecordId: event.target.dataset.id
    //         }
    //     })
    // }





}