import { LightningElement,api,track ,wire} from 'lwc';
import fetchRecordCounts from '@salesforce/apex/Ex_ProgressBar.fetchRecordCounts';


export default class Ex_ProgressBarSVG extends LightningElement {
    @track accountCount;
    @track opportunityCount;
    @track leadCount;
    @track caseCount;

    @wire(fetchRecordCounts)
    wiredRecordCounts({ error, data }) {
        if (data) {
            this.accountCount = data.Account;
            this.opportunityCount = data.Opportunity;
            this.leadCount = data.Lead;
            this.caseCount = data.Case;
        } else if (error) {
            console.error('Error fetching record counts:', error);
        }
    }
    handlehover(event){
        this.recordCountText = event.target.dataset.count;

    }


     get recordCountText() {
        return `Account: ${this.accountCount}`;
    }

  


}