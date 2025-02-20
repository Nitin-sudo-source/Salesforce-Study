/**
 * @description       : 
 * @author            : nitinSFDC@exceller.SFDoc
 * @group             : 
 * @last modified on  : 20-01-2025
 * @last modified by  : nitinSFDC@exceller.SFDoc
 * Scenario  Question         : LWC Scenario 1 : Dynamic Form Creation
Question: You need to create a dynamic form with input fields that change based on user selection. How would you implement this in LWC?
 * Scenario Answer : Answer: Implementing a dynamic form with input fields that adapt based on user selection in Lightning Web Components (LWC) involves a combination of conditional rendering and event handling. Here's how you could approach it:
**/
import { LightningElement } from 'lwc';

export default class LWC_Dynamic_Form_Creation_1 extends LightningElement {

    handleChange(event){
        const result = event.target.value;
        console.log('result: '+result);

    }


}