import { LightningElement, track, wire, api } from 'lwc';
import getContacts from '@salesforce/apex/EY_ContactController.getContacts';

const DELAY = 300;
export default class EY_contactList extends LightningElement {
    @track contacts = [];
    @track searchKey = '';
    @track pageNumber = 1;
    @track sortedBy = 'FirstName';
    @track sortedDirection = 'asc';
     @api accountId;
     @track showData = false;

    searchTimeout;

    columns = [
        { label: 'First Name', fieldName: 'FirstName', sortable: true },
        { label: 'Last Name', fieldName: 'LastName', sortable: true },
        { label: 'Email', fieldName: 'Email', type: 'email', sortable: true }
    ];

    @wire(getContacts, { 
        accountId: '$accountId', 
        searchKey: '$searchKey', 
        pageNumber: '$pageNumber', 
        sortBy: '$sortedBy', 
        sortDirection: '$sortedDirection' 
    })
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data;
            console.log('contacts: '+ JSON.stringify(this.contacts));
            if(this.contacts.length > 0){
                this.showData = true;
            }
        } else if (error) {
            console.error(error);
        }
    }

    handleSearch(event) {
        window.clearTimeout(this.searchTimeout);
        const searchKey = event.target.value;
        this.searchTimeout = setTimeout(() => {
            this.searchKey = searchKey;
            this.pageNumber = 1;
        }, DELAY);
    }

    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
    }

    handlePrevious() {
        this.pageNumber = Math.max(1, this.pageNumber - 1);
    }

    handleNext() {
        this.pageNumber += 1;
    }


}