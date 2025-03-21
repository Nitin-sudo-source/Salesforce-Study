// 1. Scenario: You need to display a paginated list of records in LWC, but the 
// list should only load more records when the user scrolls to the bottom. 
// How would you achieve this?

// Answer

// This can be implemented using infinite scrolling.
// First, create a method that fetches records in chunks from the server (e.g., using Apex).
// Then, the onScroll event listener will detect when the user reaches the bottom of the list.
//  When the bottom is detected, trigger the method to fetch more records and append them to the existing list.
import { LightningElement, track, wire } from 'lwc';
import getRecords from '@salesforce/apex/OnScrollClass.getRecords';

const columns = [
    { label: 'Name', fieldName: 'Name', sortable: true, type: 'text', editable: true  },
    { label: 'AccountId', fieldName: 'AccountId', sortable: true, type: 'text'}
    
 
];

const reactions = [

    { label: 'Edit', name: 'edit' },

    { label: 'Delete', name: 'delete' }

    // other actions

];

export default class LWC_onScroll extends LightningElement {

    @track pageSize = 1;
    @track getAllRecords = [];
    @track columns = columns;
    @track reactions = reactions;

    @wire(getRecords)
    wiredData({ error, data }) {
        if (data) {
            console.log('Data', data);
            this.getAllRecords = data;
            console.log('getAll: '+JSON.stringify(this.getAllRecords));

        } else if (error) {
            console.error('Error:', error);
        }
    }

}