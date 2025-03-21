import { LightningElement, api,track,wire } from 'lwc';
import getLeadList from '@salesforce/apex/LeadControllerList.getLeadList';

export default class showLeadDetails extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api Lead;
    @track leads;
    @track error;
    @api recordId;
    handleLoad() {
        getLeadList()
            .then(result => {
                this.leads = result;
            })
            .catch(error => {
                this.error = error;
            });
    }
}

    /*
    @wire(getLeadList)wiredLeads({error,data}){
        if (data) {
            this.leads = data;
        } else if (error) {
            this.error = error;
        }
    }
    @track columns = [{
        label: 'Lead name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'Email',
        sortable: true
    },
    {
        label: 'Mobile ',
        fieldName: 'MobilePhone',
        type: 'Phone',
        sortable: true
    }
];
}

*/