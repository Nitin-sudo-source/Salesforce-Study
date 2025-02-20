import { LightningElement, api, wire, track } from 'lwc';

import getOpportunities from '@salesforce/apex/EY_OpportunityController.getOpportunities';

export default class EY_opportunityList extends LightningElement {
    @api accountId;
    @track opportunities;
    @track showData = false;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Stage', fieldName: 'StageName' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' }
    ];

    @wire(getOpportunities, { accountId: '$accountId' })
    wiredOpportunities({ data, error }) {
        if (data) {
            this.opportunities = data;
            console.log('opportunities: '+ JSON.stringify(this.opportunities));
            if(this.opportunities.length > 0){
                this.showData = true;
            }
        } else if (error) {
            console.error(error);
        }
    }


}