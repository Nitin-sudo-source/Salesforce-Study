import { LightningElement ,wire,api,track} from 'lwc';
import Save from '@salesforce/apex/Ex_Practise01.Save';

export default class Ex_Practice01 extends LightningElement {
    @track Name = '';
    @track phone = '';
    @track email = '';
    @track showResult = false;


    handlechangeName(event){
        this.Name = event.target.value;
        console.log('Name: '+JSON.stringify(this.Name));
    }

    handlechangePhone(event){
        this.phone = event.target.value;
        console.log('phone: '+JSON.stringify(this.phone));
    }

    handlechange(event){
        this.email = event.target.value;
        console.log('email: '+JSON.stringify(this.email));
    }

    handleSave(){
        alert('inside Save: '+ 'Name :' + this.Name+ 'email :' + this.email + 'phone: '+ this.phone);
        Save({name : this.name, email: this.email, phone: this.phone})
            .then(result => {
                this.showResult = result;
                console.log('result: '+JSON.stringify(result));
            })
            .catch(error => {
                console.log('error: '+JSON.stringify(this.error));
            });
    }

}