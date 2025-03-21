import { LightningElement,track } from 'lwc';
export default class CheckboxComponent extends LightningElement {
    @track data = [];
    @track currentPage = 1;
    @track pageSize = 10;
    @track currentData = [];
    @track isPreviousDisabled = true;
    @track isNextDisabled = false;
    @track selectedCount = 0;



    connectedCallback() {
        // Simulate data fetching
        this.data = Array.from({ length: 20 }, (v, k) => ({
            id: k + 1,
            name: `Item ${k + 1}`,
            selected: false
        }));
        this.updateCurrentData();
        this.updateButtonState();
        this.updateSelectedCount();


    }

    updateCurrentData() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = this.currentPage * this.pageSize;
        this.currentData = this.data.slice(start, end);
        alert('currentData: '+JSON.stringify(this.currentData));
        this.updateSelectedCount();

    }

    nextPage() {
        if ((this.currentPage * this.pageSize) < this.data.length) {
            this.currentPage++;
            this.updateCurrentData();
            this.updateButtonState();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateCurrentData();
            this.updateButtonState();
        }
    }

    updateButtonState() {
        this.isPreviousDisabled = this.currentPage === 1;
        this.isNextDisabled = this.currentPage * this.pageSize >= this.data.length;
    }

    selectAll() {
        this.currentData = this.currentData.map(item => ({ ...item, selected: true }));
        this.updateOriginalData();
                this.updateSelectedCount();

    }

    unselectAll() {
        this.currentData = this.currentData.map(item => ({ ...item, selected: false }));
        this.updateOriginalData();
                this.updateSelectedCount();

    }

    updateOriginalData() {
        this.currentData.forEach(item => {
            const index = this.data.findIndex(dataItem => dataItem.id === item.id);
            if (index !== -1) {
                this.data[index] = item;
            }
        });
        alert('currentData: '+JSON.stringify(this.currentData));
    }

    handleCheckboxChange(event) {
        const itemId = parseInt(event.target.dataset.id, 10);
        const selected = event.target.checked;
        this.currentData = this.currentData.map(item =>
            item.id === itemId ? { ...item, selected } : item
        );
        this.updateOriginalData();
                this.updateSelectedCount();

    }

    updateSelectedCount() {
        this.selectedCount = this.currentData.filter(item => item.selected).length;
    }

    updateAll() {
        this.updateOriginalData();
        alert('Data updated successfully');
    }

     handleInputChange(event) {
        const itemId = parseInt(event.target.dataset.id, 10);
        const newName = event.target.value;
        this.currentData = this.currentData.map(item =>
            item.id === itemId ? { ...item, name: newName } : item
        );
    }

}