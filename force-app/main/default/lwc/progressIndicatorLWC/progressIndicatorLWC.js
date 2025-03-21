import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountDataController.getAccounts';

const columns = [{ label: 'Name', fieldName: 'Name', type: 'text'},
{ label: 'Phone', fieldName: 'Phone', type: 'phone'},
{ label: 'Website', fieldName: 'Website', type: 'text'},
{ label: 'Industry', fieldName: 'Industry', type: 'picklist'}]

export default class ProgressIndicatorLWC extends LightningElement {
    step = 1;
    currentStep = "1";
    showSpinner;
    showFirstPage = true;
    showSecondPage = false;
    showThirdPage = false;
    fields = ['Name', 'Type', 'Phone', 'AccountNumber', 'Industry', 'Website'];
    listOfAccounts;
    columns = columns;

    getInitData() {
        this.showSpinner = true;
        getAccounts({})
            .then(data => {
                this.listOfAccounts = data;
                this.showSpinner = false;
            })
            .catch(error => {
                console.log(error);
            });
    }

    nextPage(event) {
        if (this.step != 3) {
            this.step++;
        }

        this.handleSetUpSteps();
    }

    previousPage(event) {
        if (this.step != 1) {
            this.step--;
        }

        this.handleSetUpSteps();
    }

    handleSetUpSteps() {
        this.showFirstPage = this.step == 1;
        this.showSecondPage = this.step == 2;
        this.showThirdPage = this.step == 3;
        this.currentStep = "" + this.step;

        if (this.step === 2) {
            this.showSpinner = true;
            this.getInitData();
        }
    }
}