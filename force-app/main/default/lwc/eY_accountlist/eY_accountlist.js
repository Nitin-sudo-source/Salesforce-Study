import { LightningElement, track, wire, api } from 'lwc';
import getAccounts from '@salesforce/apex/EY_AccountController.getAccounts';

export default class EY_accountlist extends LightningElement {
    @track accounts = [];
    @api pageNumber = 1;
    @track sortedBy = 'Name';
    @track sortedDirection = 'asc';
    @api selectedAccountId = '';
    @api pageSize = 5;
    @track totalRecords;
    @api totalPages;


    columns = [
        { label: 'Name', fieldName: 'Name', sortable: true },
        { label: 'Industry', fieldName: 'Industry', sortable: true },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', sortable: true },
        {
            type: 'button',
            typeAttributes: {
                label: 'View Details',
                name: 'view_details'
            }
        }
    ];


    @wire(getAccounts, {
        pageNumber: '$pageNumber',
        sortBy: '$sortedBy',
        sortDirection: '$sortedDirection'
    })
    wiredAccounts({ data, error }) {
        if (data) {
            this.accounts = data;
            this.totalRecords = data;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

        } else if (error) {
            console.error(error);
        }
    }

    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
    }


    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'view_details') {
            this.selectedAccountId = row.Id;
        }
    }

    handlePrevious() {
        if (this.pageNumber > 1) {
            this.pageNumber -= 1;
        }
    }

    handleNext() {
        if (this.pageNumber < this.totalPages) {
            this.pageNumber += 1;
        }
    }



}