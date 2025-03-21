import { LightningElement ,api} from 'lwc';


export default class ComponentFUllPage1 extends LightningElement {
 @api recordId ;


 connectedCallback(){
    alert('RecordId'+this.recordId);
 }

}