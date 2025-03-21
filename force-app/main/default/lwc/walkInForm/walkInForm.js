import { LightningElement,api,track } from 'lwc';
import image from '@salesforce/resourceUrl/myImage';

export default class WalkInForm extends LightningElement {
imageUrl=image;
  projectOptions = [];

  handleChange(event) {
    this.selectedProject = event.target.value;
  }

  handlePhoneChange(event) {
    this.phone = event.target.value;
    console.log(this.phone);
  }

  handleEmailChange(event) {
    this.email = event.target.value;
    console.log(this.email);
  }
}