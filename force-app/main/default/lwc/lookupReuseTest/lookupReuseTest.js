import { LightningElement } from 'lwc';

export default class LookupReuseTest extends LightningElement {

    lookupRecord(event){
        alert('Selected Record Value on Parent Component is ' +  JSON.stringify(event.detail.selectedRecord));
    }

}