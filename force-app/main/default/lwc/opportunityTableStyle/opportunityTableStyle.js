import { LightningElement,wire,track } from 'lwc';
import fetchOpportunities from '@salesforce/apex/OpportunityDataController.fetchOpportunity';
import {loadStyle} from 'lightning/platformResourceLoader';
 
const COLUMNS = [
    {label:'Opportunity Name', fieldName:'Name',  cellAttributes:{
        class:'datatable-CellColor'
    }},  
    {label:'Stage Name', fieldName:'StageName', type:'text'},
    {label:'Annual Revenue', fieldName:'Amount', type:'currency', cellAttributes:{
        class:{fieldName:'amountColor'},
        iconName:{fieldName:'iconName'}, iconPosition:'right'
    }}
]
 
export default class OpportunityTableStyle extends LightningElement {
    @track data;
    @track error;
    columns = COLUMNS;
    isCssLoaded = false
 
    @wire(fetchOpportunities)
    wireData({data, error}){ 
        if(data){
            let dataCopy = JSON.parse(JSON.stringify(data));
 
            dataCopy.forEach(currentItem => {
                currentItem.amountColor = currentItem.Amount < 50000 ? "slds-text-color_error" : "slds-text-color_success";
                currentItem.iconName = currentItem.Amount < 50000 ? "utility:down" : "utility:up"
            });
 
            this.data = dataCopy;
 
        } else if(error){
            this.data = undefined;
            this.error = error;
        }
    }
 
    renderedCallback(){ 
        if(this.isCssLoaded){
            return
        } 
 
        this.isCssLoaded = true
 
        loadStyle(this, lwcDatatableStyle).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.log(error)
        });
    }
}