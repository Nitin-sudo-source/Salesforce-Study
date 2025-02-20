import { LightningElement, api } from 'lwc';
export default class Pagination extends LightningElement {
    @api pageNumber;
    @api isPreviousDisabled;
    @api isNextDisabled;
     @api totalPages;


    get isFirstPage() {
        return this.pageNumber === 1;
    }

    get isLastPage() {
        return this.pageNumber === this.totalPages;
    }

    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
    }



}