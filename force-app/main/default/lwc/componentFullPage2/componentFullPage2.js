import { LightningElement,api } from 'lwc';

export default class ComponentFullPage2 extends LightningElement {
    @api recordId;

    connectedCallback(){
        alert('SameRecordId'+this.recordId);
    }
}