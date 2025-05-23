import { LightningElement ,api} from 'lwc';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';



export default class ResponsiveFormTest extends LightningElement {
    // The record page provides recordId and objectApiName
    @api recordId;
    @api objectApiName;

    fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];


    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.LastName = 'My Custom Last Name'; // modify a field
        this.template.querySelector('lightning-record-form').submit(fields);
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: 'Account Created Successfully!!',
            variant: 'success'
        }),);
    
    }
}