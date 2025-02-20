import { LightningElement, wire, api, track } from 'lwc';
import getObjectNamesAndApiNames from '@salesforce/apex/ObjectController.getObjectNamesAndApiNames';


export default class Ex_ApprovalDashboard extends LightningElement {
    selectedObjectName;
    selectedObjectApiName;
    objectNamesOptions = [];

    @wire(getObjectNamesAndApiNames)
    wiredObjectNames({ error, data }) {
        if (data) {
            this.objectNamesOptions = Object.keys(data).map(objectName => {
                return { label: objectName, value: objectName };
            });
        } else if (error) {
            // Handle error
        }
    }

    handleChange(event) {
        this.selectedObjectName = event.detail.value;
        console.log('selectedObjectName: '+JSON.stringify(this.selectedObjectName));
       // this.selectedObjectApiName = this.objectNamesAndApiNames[this.selectedObjectName];
        // Use this.selectedObjectApiName as needed
    }


}