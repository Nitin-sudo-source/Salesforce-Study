import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


import LEAD_OBJECT from '@salesforce/schema/Lead';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import AnnualRevenue_FIELD from '@salesforce/schema/Lead.AnnualRevenue';
import Industry_FIELD from '@salesforce/schema/Lead.Industry';
import LeadSource_FIELD from '@salesforce/schema/Lead.LeadSource';
import Status_FIELD from '@salesforce/schema/Lead.Status';
import Opportunity_FIELD from '@salesforce/schema/Lead.Opportunity__c';
import Primary_FIELD from '@salesforce/schema/Lead.Primary__c';
import Address_FIELD from '@salesforce/schema/Lead.Address';


export default class RecordFromNitinTest1 extends LightningElement {
    @api recordId;
    LeadObject = LEAD_OBJECT;
    myFields =[NAME_FIELD,EMAIL_FIELD,COMPANY_FIELD,AnnualRevenue_FIELD,Industry_FIELD,LeadSource_FIELD,Status_FIELD,Opportunity_FIELD,Primary_FIELD,Address_FIELD];

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Lead Created ",
            message: "successfully",
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        eval("$A.get('e.force:refreshView').fire();");
    }
}