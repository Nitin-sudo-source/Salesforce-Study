import { LightningElement, wire, api,track } from 'lwc';
import getuserName from '@salesforce/apex/UserInfoGet.getuserName';

  
export default class WaterMarkLwc extends LightningElement {
    @track error;
    //@track userId = Id;
    @api userData;
    @api isTemplateOne;
    isTemplateOne = false;

    handleClick(){
        if (this.isTemplateOne == true) {
            alert('Nitin Log  1      ' + this.isTemplateOne);

        }else{
            this.isTemplateOne = false ;
            alert('Nitin Log  2   ' + this.isTemplateOne);

        }

    }

   /* @wire(getuserName) getName({data}){
        if(data){
           // alert(data);
            this.userData = data.repeat(50);
            console.log(this.userData);
        }else{
            this.data = undefined;
        }
    }*/
}