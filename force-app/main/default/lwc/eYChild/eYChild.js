import { LightningElement, api } from 'lwc';
export default class EYChild extends LightningElement {

    @api calledchild;


    constructor(){
        
    }

    connectedCallback() {
       alert('calledChild: '+this.calledchild);
    }

}