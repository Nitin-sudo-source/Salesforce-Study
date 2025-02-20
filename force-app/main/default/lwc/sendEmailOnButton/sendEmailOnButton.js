import { LightningElement,api } from 'lwc';
import sendMail from '@salesforce/apex/sendEmailOnclick.sendMail';

export default class SendEmailOnButton extends LightningElement {
    @api recordId;

    handleClick(){
    console.log(this.recordId);
    sendMail({ Id: this.recordId })
        .then(result => {
            console.log(JSON.stringify(result));
        })
    }
}