/**
 * @description       : 
 * @author            : nitinSFDC@exceller.SFDoc
 * @group             : 
 * @last modified on  : 22-03-2025
 * @last modified by  : nitinSFDC@exceller.SFDoc
**/
import { LightningElement, track } from 'lwc';

export default class Ex_DynamicPickListComp extends LightningElement {

    @track isMultiSelect = false;

    @track showFirstPage = false;
    @track showSecondPage = false;
    @track showThirdPage = false;
    @track selectedLabels = [];
    @track selectedConfiguration = [];
    @track searchQuery = '';
    @track selectedCountry = '';
    @track mobileNumber = '';
    @track email = '';
    @track showDropdownList = false;

    @track selectedFlag = 'https://flagcdn.com/w40/in.png';

    @track countries = [
        { code: 'IN', name: 'India', dial_code: '+91', flag: 'https://flagcdn.com/w40/in.png' },
        { code: 'US', name: 'United States', dial_code: '+1', flag: 'https://flagcdn.com/w40/us.png' },
        { code: 'UK', name: 'United Kingdom', dial_code: '+44', flag: 'https://flagcdn.com/w40/gb.png' },
        { code: 'CA', name: 'Canada', dial_code: '+1', flag: 'https://flagcdn.com/w40/ca.png' },
        { code: 'AU', name: 'Australia', dial_code: '+61', flag: 'https://flagcdn.com/w40/au.png' }
    ];
    
    get filteredCountries() {
        return this.searchQuery
            ? this.countries.filter(country =>
                  country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
              )
            : this.countries;
    }

    handleSearch(event) {
        this.searchQuery = event.target.value;
        console.log('searchQuery '+JSON.stringify(this.searchQuery));
        console.log('filterd: '+JSON.stringify(this.filteredCountries));
        
        this.showDropdownList = true;
    }

    handleCountrySelect(event) {
        const code = event.currentTarget.dataset.code;
        const name = event.currentTarget.dataset.name;
        const dialCode = event.currentTarget.dataset.dialcode;

        this.selectedCountry = `${code} ${name} ${dialCode}`;
        console.log('selectedCountry '+ JSON.stringify(this.selectedCountry));

        this.searchQuery = this.selectedCountry;
        console.log('searchQuery '+JSON.stringify(this.searchQuery));


        this.showDropdownList = false;
    }


    handleMobileChange(event) {
        this.mobileNumber = event.target.value;
    }

    get countryDropdownClass() {
        return this.showDropdownList ? 'country-list show' : 'country-list hidden';
    }

    toggleDropdown() {
        this.showDropdownList = !this.showDropdownList;
    }

    handleOutsideClick(event) {
        if (!this.template.querySelector('.container').contains(event.target)) {
            this.showDropdownList = false;
        }
    }

    connectedCallback() {
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        this.showFirstPage = true;
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.handleOutsideClick.bind(this));
    }


  







    options = [
        { label: 'Like', value: 'like', icon: 'utility:like', isSelected: false, itemClass: 'picklist-item like' },
        { label: 'Smile', value: 'smile', icon: 'utility:emoji', isSelected: false, itemClass: 'picklist-item smile' },
        { label: 'Love', value: 'love', icon: 'utility:favorite', isSelected: false, itemClass: 'picklist-item love' },
        { label: 'Star', value: 'star', icon: 'utility:star', isSelected: false, itemClass: 'picklist-item star' },
        { label: 'Fire', value: 'fire', icon: 'utility:fire', isSelected: false, itemClass: 'picklist-item fire' },
        { label: 'World', value: 'world', icon: 'utility:world', isSelected: false, itemClass: 'picklist-item world' }
    ];


    @track salesStages = [
        { label: 'Prospecting', value: 'prospecting', isSelected: false, itemClass: 'picklist-item stage' },
        { label: 'Qualification', value: 'qualification', isSelected: false, itemClass: 'picklist-item stage' },
        { label: 'Needs Analysis', value: 'needs_analysis', isSelected: false, itemClass: 'picklist-item stage' },
        { label: 'Value Proposition', value: 'value_proposition', isSelected: false, itemClass: 'picklist-item stage' },
        { label: 'Id. Decision Makers', value: 'decision_makers', isSelected: false, itemClass: 'picklist-item stage' },
        { label: 'Perception Analysis', value: 'perception_analysis', isSelected: false, itemClass: 'picklist-item stage' },
        { label: 'Proposal/Price Quote', value: 'price_quote', isSelected: false, itemClass: 'picklist-item stage' },
        { label: 'Negotiation/Review', value: 'negotiation_review', isSelected: false, itemClass: 'picklist-item stage' },
        { label: 'Closed Won', value: 'closed_won', isSelected: false, itemClass: 'picklist-item stage' },
        { label: 'Closed Lost', value: 'closed_lost', isSelected: false, itemClass: 'picklist-item stage' }
    ];
    
    @track configTypes = [
        { label: '1 BHK', value: '1bhk', itemClass: 'picklist-item config', isSelected: false },
        { label: '2 BHK', value: '2bhk', itemClass: 'picklist-item config', isSelected: false },
        { label: '3 BHK', value: '3bhk', itemClass: 'picklist-item config', isSelected: false },
        { label: 'Studio', value: 'studio', itemClass: 'picklist-item config', isSelected: false }
    ];
    


    // Toggle Multi-Select Mode
    toggleMultiSelect(event) {
        this.isMultiSelect = event.target.checked;
        this.selectedLabels = [];
        this.options.forEach(option => {
            option.isSelected = false;
            option.itemClass = `picklist-item ${option.value}`;
        });
    }

    // Handle Selection
    handleSelection(event) {
        const selectedValue = event.currentTarget.dataset.value;
        const selectedLabel = event.currentTarget.dataset.label;
            this.options.forEach(opt => {
                opt.isSelected = false;
                opt.itemClass = `picklist-item ${opt.value}`;
            });

            const option = this.options.find(opt => opt.value === selectedValue);
            option.isSelected = true;
            option.itemClass = `picklist-item ${option.value} selected glow`;
            this.selectedLabels = [selectedLabel];
        }
    


    handleSelectionConfi(event) {
        const selectedValue = event.currentTarget.dataset.value;
        const selectedLabel = event.currentTarget.dataset.label;
            this.configTypes.forEach(opt => {
                opt.isSelected = false;
                opt.itemClass = `picklist-item config ${opt.value}`;
            });

            const option = this.configTypes.find(opt => opt.value === selectedValue);
            option.isSelected = true;
            option.itemClass = `picklist-item config ${option.value} selected glow`;
            this.selectedConfiguration = [selectedLabel];
        }


        handlenext(){
            this.showSecondPage = true;
        }

        handlePrevious(){
               this.showThirdPage = false;
                this.showSecondPage = false;
                this.showFirstPage = true;
        }




}