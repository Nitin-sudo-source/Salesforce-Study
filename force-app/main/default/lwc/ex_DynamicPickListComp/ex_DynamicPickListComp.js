/**
 * @description       : 
 * @author            : nitinSFDC@exceller.SFDoc
 * @group             : 
 * @last modified on  : 20-03-2025
 * @last modified by  : nitinSFDC@exceller.SFDoc
**/
import { LightningElement, track } from 'lwc';

export default class Ex_DynamicPickListComp extends LightningElement {

    @track isMultiSelect = false;
    @track selectedLabels = [];

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

        if (this.isMultiSelect) {
            const option = this.options.find(opt => opt.value === selectedValue);
            option.isSelected = !option.isSelected;
            option.itemClass = option.isSelected ? `picklist-item ${option.value} selected bounce` : `picklist-item ${option.value}`;
            this.selectedLabels = this.options.filter(opt => opt.isSelected).map(opt => opt.label);
        } else {
            this.options.forEach(opt => {
                opt.isSelected = false;
                opt.itemClass = `picklist-item ${opt.value}`;
            });

            const option = this.options.find(opt => opt.value === selectedValue);
            option.isSelected = true;
            option.itemClass = `picklist-item ${option.value} selected glow`;
            this.selectedLabels = [selectedLabel];
        }
    }

    // handleSelectionSales(event) {
    //     const selectedValue = event.currentTarget.dataset.value;
    //     const selectedLabel = event.currentTarget.dataset.label;

    //     if (this.isMultiSelect) {
    //         const option = this.salesStages.find(opt => opt.value === selectedValue);
    //         option.isSelected = !option.isSelected;
    //         option.sales = option.isSelected ? `picklist-item ${option.value} selected bounce` : `picklist-item ${option.value}`;
    //         this.selectedLabels = this.salesStages.filter(opt => opt.isSelected).map(opt => opt.label);
    //     } else {
    //         this.salesStages.forEach(opt => {
    //             opt.isSelected = false;
    //             opt.sales = `picklist-item ${opt.value}`;
    //         });

    //         const option = this.salesStages.find(opt => opt.value === selectedValue);
    //         option.isSelected = true;
    //         option.sales = `picklist-item ${option.value} selected glow`;
    //         this.selectedLabels = [selectedLabel];
    //     }
    // }


    handleSelectionConfi(event) {
        const selectedValue = event.currentTarget.dataset.value;
        const selectedLabel = event.currentTarget.dataset.label;

        if (this.isMultiSelect) {
            const option = this.configTypes.find(opt => opt.value === selectedValue);
            option.isSelected = !option.isSelected;
            option.class = option.isSelected ? `picklist-item ${option.value} selected bounce` : `picklist-item ${option.value}`;
            this.selectedLabels = this.configTypes.filter(opt => opt.isSelected).map(opt => opt.label);
        } else {
            this.configTypes.forEach(opt => {
                opt.isSelected = false;
                opt.class = `picklist-item ${opt.value}`;
            });

            const option = this.configTypes.find(opt => opt.value === selectedValue);
            option.isSelected = true;
            option.class = `picklist-item ${option.value} selected glow`;
            this.selectedLabels = [selectedLabel];
        }
    }

    // handleSelectStage(event) {
    //     // const selectedValue = event.currentTarget.dataset.value;
    //     // const selectedLabel = event.currentTarget.dataset.label;

    //     this.selectedStage = event.currentTarget.dataset.value;
    //     this.salesStages = this.salesStages.map(stage => ({
    //         ...stage,
    //         selected: stage.value === this.selectedStage
    //     }));
    // }

    // handleSelectConfig(event) {
    //     this.selectedConfig = event.currentTarget.dataset.value;
    //     this.configTypes = this.configTypes.map(config => ({
    //         ...config,
    //         selected: config.value === this.selectedConfig
    //     }));
    // }




}