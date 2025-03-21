import { LightningElement, api,track } from 'lwc';
import insertDocument from '@salesforce/apex/uploadDrawing.insertDocument'
import {ShowToastEvent} from "lightning/platformShowToastEvent";
// import uploadFile from '@salesforce/apex/uploadDrawing.uploadFile';
export default class UploadDrawing extends LightningElement {
    @api recordId ;
    @track docId ;
    @track listOfDocuments;
    @track upload = false ;
    @track showSpinner = false;
    @track fileData;
    @track fileName;
   
    connectedCallback() {
        this.initData();
    }

    initData() {
        let listOfDocuments = [];
        this.createRow(listOfDocuments);
        this.listOfDocuments = listOfDocuments;
    }

    createRow(listOfDocuments) {
        let DocObject = {};
        if (listOfDocuments.length > 0) {
          DocObject.index = listOfDocuments[listOfDocuments.length - 1].index + 1;
        } else {
          DocObject.index = 1;
        }
        DocObject.Name = null;
        DocObject.Opportunity__c = this.recordId;
        DocObject.Document_Type__c = null;
        DocObject.fileUploader = null;
        DocObject.fileName = null;
        DocObject.fileData = null;
        listOfDocuments.push(DocObject);
        console.log(DocObject);
      }
    createRow(listOfDocuments) {
        let DocObject = {};
        if (listOfDocuments.length > 0) {
            DocObject.index = listOfDocuments[listOfDocuments.length - 1].index + 1;
        } else {
            DocObject.index = 1;
        }
        DocObject.Name = null;
        DocObject.Opportunity__c = this.recordId;
        DocObject.Document_Type__c = null;
        DocObject.fileUploader = null;
        DocObject.fileName = null;
        DocObject.fileData = null;
        listOfDocuments.push(DocObject);
        console.log(DocObject);
        }
            

    addNewRow() {
        this.createRow(this.listOfDocuments);
    }

    removeRow(event) {
        let strIndex = event.target.dataset.index;
        let tempList = this.listOfDocuments;
        tempList.splice( strIndex, 1 );
        this.listOfDocuments = JSON.parse( JSON.stringify( tempList ) );
        this.newList.splice(strIndex, 1);
    }
    removeAllRows() {
        let listOfDocuments = [];
        this.createRow(listOfDocuments);
        this.listOfDocuments = listOfDocuments;
    }

    handleInputChange(event) {
        let index = event.target.dataset.id;
        let fieldName = event.target.name;
        let value = event.target.value;
        this.NameChange = event.target.value;
        console.log(this.NameChange);
        for (let i = 0; i < this.listOfDocuments.length; i++) {
            if (this.listOfDocuments[i].index === parseInt(index)) {
              this.listOfDocuments[i][fieldName] = value;
           
            }
        }
        for (let i = 0; i < this.listOfDocuments.length; i++) {
          if (this.listOfDocuments[i].index === parseInt(index)) {
            this.listOfDocuments[i][fieldName] = value;
          }
        }
      }
    handleChange(event) {
        let index = event.target.dataset.id;
        let fieldName = event.target.name;
        let value = event.target.value;
        for (let i = 0; i < this.listOfDocuments.length; i++) {
          if (this.listOfDocuments[i].index === parseInt(index)) {
            this.listOfDocuments[i][fieldName] = value;
      
            if (event.target.files.length > 0) {
              const file = event.target.files[0];
              var reader = new FileReader();
              reader.onload = () => {
                var base64 = reader.result.split(",")[1];
                this.listOfDocuments[i].fileName = file.name;
                this.listOfDocuments[i].fileData = {
                  filename: file.name,
                  base64: base64
                };
              };
              reader.readAsDataURL(file);
            }
          }
        }
    }
    createDocuments() {
      let recordsToCreate = [];
      let filenames = [];
      let base64DataList = [];
      let errors = [];

      for (let i = 0; i < this.listOfDocuments.length; i++) {
        const doc = this.listOfDocuments[i];
        const name = doc.Name;
        const documentType = doc.Drawing_Type__c;
        const fileData = doc.fileData;
      
        if (!name && !documentType && !fileData) {
          errors.push(`Row ${i+1}: Name, Document Type and Upload File`);
        } else if (!name && !documentType && fileData) {
          errors.push(`Row ${i+1}: Name and Document Type`);
        } else if (!name && documentType && !fileData) {
          errors.push(`Row ${i+1}: Name and Upload File`);
        } else if (name && !documentType && !fileData) {
          errors.push(`Row ${i+1}: Document Type and Upload File`);
        } else if (!name && documentType && fileData) {
          errors.push(`Row ${i+1}: Name`);
        } else if (name && !documentType && fileData) {
          errors.push(`Row ${i+1}: Document Type`);
        } else if (name && documentType && !fileData) {
          errors.push(`Row ${i+1}: Upload File`);
        }
      }
      if (errors.length > 0) {
        const errorMessage = errors.join('\n');
        alert(`Please provide the following details:\n${errorMessage}`);
      }
       this.listOfDocuments.forEach(doc => {
          recordsToCreate.push({
              'Name': doc.Name,
              'Opportunity__c': this.recordId,
              'Document_Type__c': doc.Document_Type__c,
          });
          
          filenames.push(doc.fileData.filename);
          base64DataList.push(doc.fileData.base64);
      });
      
      insertDocument({ 
          records: recordsToCreate,
          filenames: filenames,
          base64DataList: base64DataList
      })
      .then(data => {
        alert('Saved Document Succesfully');
        window.open(`\$recordId`, _blank);
        /*
          const event = new ShowToastEvent({
              title: 'Success',
              message: 'Documents created successfully.',
              variant: 'success',
          });
          this.dispatchEvent(event);
          */
          this.removeAllRows();
      })
      .catch(error => {
        /*
          const event = new ShowToastEvent({
              title: 'Error',
              message: error.message,
              variant: 'error',
          });
          this.dispatchEvent(event);*/
          alert('Error Occured');
      })
  }
  
    cancelbutton(){
        this.initData();
    }
}