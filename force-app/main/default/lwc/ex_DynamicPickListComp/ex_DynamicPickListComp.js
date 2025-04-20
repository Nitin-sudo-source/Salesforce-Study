/**
 * @description       : 
 * @author            : nitinSFDC@exceller.SFDoc
 * @group             : 
 * @last modified on  : 20-04-2025
 * @last modified by  : nitinSFDC@exceller.SFDoc
**/
import { LightningElement, track } from 'lwc';
import getPicklistValues from '@salesforce/apex/Ex_SiteVisitFormModern.getPicklistValues';
import getProjectList from '@salesforce/apex/Ex_SiteVisitFormModern.getProjectList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { loadStyle } from 'lightning/platformResourceLoader';
import TAILWIND from '@salesforce/resourceUrl/tailwind';


export default class Ex_DynamicPickListComp extends LightningElement {

    TAILWIND = TAILWIND;

    @track isMultiSelect = false;
    @track showDefaultPage = false;
    @track showFirstPage = false;
    @track showSecondPage = false;
    @track showThirdPage = false;
    @track selectedLabels = [];
    @track selectedConfiguration = [];
    @track searchQuery = '';
    @track selectedCountry = '';
    @track showDropdownList = false;
    @track ageOptions = [];
    @track projectList = [];
    @track mobileNumber = '';
    @track email = '';
    @track showToast = false;
    @track toastMessage = '';
    @track toastVariant = 'success'; // 'success' or 'error'
    @track toastIcon = 'utility:success';


    connectedCallback() {
        loadStyle(this, TAILWIND)
            .then(() => {
                console.log('Tailwind loaded successfully');
            })
            .catch(error => {
                console.error('Failed to load Tailwind', error);
            });
    }


    @track formType = [
        { label: 'Fresh', value: 'Fresh', icon: 'utility:Fresh', isSelected: false, itemClass: 'picklist-item form-type' },
        { label: 'Revisit', value: 'Revisit', icon: 'utility:emoji', isSelected: false, itemClass: 'picklist-item form-type' }
    ];

    @track options = [
        { label: 'Like', value: 'like', icon: 'utility:like', isSelected: false, itemClass: 'picklist-item like' },
        { label: 'Smile', value: 'smile', icon: 'utility:emoji', isSelected: false, itemClass: 'picklist-item smile' },
        { label: 'Love', value: 'love', icon: 'utility:favorite', isSelected: false, itemClass: 'picklist-item love' },
        { label: 'Star', value: 'star', icon: 'utility:star', isSelected: false, itemClass: 'picklist-item star' },
        { label: 'Fire', value: 'fire', icon: 'utility:fire', isSelected: false, itemClass: 'picklist-item fire' },
        { label: 'World', value: 'world', icon: 'utility:world', isSelected: false, itemClass: 'picklist-item world' }
    ];

    @track configTypes = [
        { label: '1 BHK', value: '1bhk', itemClass: 'picklist-item config', isSelected: false },
        { label: '2 BHK', value: '2bhk', itemClass: 'picklist-item config', isSelected: false },
        { label: '3 BHK', value: '3bhk', itemClass: 'picklist-item config', isSelected: false },
        { label: 'Studio', value: 'studio', itemClass: 'picklist-item config', isSelected: false }
    ];

    handleChangeMobile(event) {
        this.mobileNumber = event.target.value;
    }

    handleChangeEmail(event) {
        this.email = event.target.value;
    }

    handleSubmit() {
        const isValid = /^[0-9]{10}$/.test(this.mobileNumber);
        console.log('isValid: ' + isValid);

        if (isValid) {
            this.customToast('Valid Mobile Number Entered!', 'success', 'utility:success');
        } else {
            this.customToast('Please enter a valid 10-digit mobile number.', 'error', 'utility:error');
        }
    }

    customToast(message, variant, icon) {
        const event = new ShowToastEvent({
            title: variant === 'success' ? 'Success' : 'Error',
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.toastVariant = variant;
        this.toastIcon = icon;
        this.showToast = true;
        this.dispatchEvent(event);
    }

    handleMobileChange(event) {
        this.mobileNumber = event.target.value;
    }
    connectedCallback() {
        this.showDefaultPage = true;
        this.loadPicklistValues();
        this.getgetProjectList();
    }

    getgetProjectList() {
        getProjectList()
            .then(result => {
                this.projectList = result.map(value => {
                    return {
                        Id: value.Id,
                        Name: value.Name,
                        label: value.Name,
                        value: value.Id,
                        //icon: this.getIcon(value.Name),
                        isSelected: false,
                        itemClass: `picklist-item project ${value}`,
                    };
                });
                console.log('projectList: ' + JSON.stringify(this.projectList));
            }).catch(error => {
                console.error('Error in getting list of projects: ', error);
            });
    }

    loadPicklistValues() {
        getPicklistValues({ fieldName: 'Age__c' })
            .then(data => {
                this.ageOptions = data.map(value => {
                    const formattedValue = value.toLowerCase().replace(/\s+/g, '_');
                    const isSpecialItem = (formattedValue === '41_to_45_years');
                    return {
                        label: value,
                        value: formattedValue,
                        icon: this.getIcon(value),
                        isSelected: false,
                        isSpecialItem: isSpecialItem,
                        itemClass: `picklist-item age ${formattedValue}${isSpecialItem ? ' special-item' : ''}`
                    };
                });
                console.log('age: ' + JSON.stringify(this.ageOptions));
            })
            .catch(error => {
                console.error('Error fetching picklist values:', error);
            });
    }

    getIcon(value) {
        const iconMap = {
            'Less than 25 Years': 'utility:user',
            '25 to 30 Years': 'utility:user',
            '31 to 35 Years': 'utility:user',
            '36 to 40 Years': 'utility:user',
            '41 to 45 Years': 'utility:user',
            '46 to 50 Years': 'utility:user',
            '51 to 60 Years': 'utility:user',
            'Above 60': 'utility:user'
        };
        return iconMap[value] || 'utility:question';
    }

    // handleSelection(event) {
    //     const selectedValue = event.currentTarget.dataset.value;
    //     const selectedLabel = event.currentTarget.dataset.label;
    //     const dataName = event.currentTarget.dataset.name;

    //     if (dataName === 'Age__c') {
    //         this.ageOptions.forEach(opt => {
    //             opt.isSelected = false;
    //             opt.itemClass = `picklist-item age ${opt.value}`;
    //         });

    //         const option = this.ageOptions.find(opt => opt.value === selectedValue);
    //         option.isSelected = true;
    //         option.itemClass = `picklist-item age ${option.value} selected glow`;
    //         console.log('Age__c ' + JSON.stringify(this.ageOptions));
    //         this.customToast(selectedLabel + ' is Selected', 'success', 'utility:success');

    //     } else if (dataName === 'Icons__c') {
    //         this.options.forEach(opt => {
    //             opt.isSelected = false;
    //             opt.itemClass = `picklist-item ${opt.value}`;
    //         });

    //         const option = this.options.find(opt => opt.value === selectedValue);
    //         option.isSelected = true;
    //         option.itemClass = `picklist-item ${option.value} selected glow`;
    //         console.log('Icons__c ' + JSON.stringify(this.options));
    //         this.customToast(selectedLabel + ' is Selected', 'success', 'utility:success');

    //     } else if (dataName === 'Form_Type__c') {
    //         this.formType.forEach(opt => {
    //             opt.isSelected = false;
    //             opt.itemClass = `picklist-item form-type ${opt.value}`;
    //         });
    //         const option = this.formType.find(opt => opt.value === selectedValue);
    //         option.isSelected = true;
    //         option.itemClass = `picklist-item form-type ${option.value} selected glow`;
    //         console.log('Form_Type__c ' + JSON.stringify(this.formType));
    //         this.customToast(selectedLabel + ' is Selected', 'success', 'utility:success');

    //     } else if (dataName === 'Project__c') {
    //         this.projectList.forEach(opt => {
    //             opt.isSelected = false;
    //             opt.itemClass = `picklist-item project ${opt.value}`;
    //         });

    //         const option = this.projectList.find(opt => opt.value === selectedValue);
    //         option.isSelected = true;
    //         option.itemClass = `picklist-item project ${option.value} selected glow`;
    //         this.customToast(selectedLabel + ' is Selected', 'success', 'utility:success');

    //     } else if (dataName === 'Configuration__c') {
    //         this.configTypes.forEach(opt => {
    //             opt.isSelected = false;
    //             opt.itemClass = `picklist-item config ${opt.value}`;
    //         });

    //         const option = this.configTypes.find(opt => opt.value === selectedValue);
    //         option.isSelected = true;
    //         option.itemClass = `picklist-item config ${option.value} selected glow`;
    //         this.customToast(selectedLabel + ' is Selected', 'success', 'utility:success');

    //     } else {
    //         alert('No Valid Data Found Data-Name: ' + dataName);
    //     }
    // }


    handleSelection(event) {
        const selectedValue = event.currentTarget.dataset.value;
        const selectedLabel = event.currentTarget.dataset.label;
        const dataName = event.currentTarget.dataset.name;
    
        const picklistMap = {
            'Age__c': { list: this.ageOptions, baseClass: 'picklist-item age' },
            'Icons__c': { list: this.options, baseClass: 'picklist-item' },
            'Form_Type__c': { list: this.formType, baseClass: 'picklist-item form-type' },
            'Project__c': { list: this.projectList, baseClass: 'picklist-item project' },
            'Configuration__c': { list: this.configTypes, baseClass: 'picklist-item config' }
        };
    
        if (picklistMap[dataName]) {
            const { list, baseClass } = picklistMap[dataName];
            list.forEach(opt => {
                opt.isSelected = false;
                opt.itemClass = `${baseClass} ${opt.value}`;
            });
    
            const option = list.find(opt => opt.value === selectedValue);
            if (option) {
                option.isSelected = true;
                option.itemClass = `${baseClass} ${option.value} selected glow`;
            }
    
            this.customToast(`${selectedLabel} is Selected`, 'success', 'utility:success');
            console.log(`${dataName} => `, JSON.stringify(list));
        } else {
            alert('No Valid Data Found. Data-Name: ' + dataName);
        }
    }
    


    handleNavigation(event) {
        const action = event.target.dataset.action;
        alert('Action: ' + action + '\n' + 'Selected: ' + event.target.value);

        if (action === "next") {
            if (this.showDefaultPage) {
                this.showFirstPage = true;
                this.showDefaultPage = false;
            } else if (this.showFirstPage) {
                this.showFirstPage = false;
                this.showSecondPage = true;
            } 
            // else if (this.showSecondPage) {
            //     this.showSecondPage = false;
            //     this.showThirdPage = true;
            // }
        } else if (action === "prev") {
            // if (this.showThirdPage) {
            //     this.showThirdPage = false;
            //     this.showSecondPage = true;
            // } else
             if (this.showSecondPage) {
                this.showSecondPage = false;
                this.showFirstPage = true;
            } else if (this.showDefaultPage) {
                this.showFirstPage = false;
                this.showDefaultPage = true;
            }else if (this.showFirstPage) {
                this.showFirstPage = false;
                this.showDefaultPage = true;
            }
        }
    }
}