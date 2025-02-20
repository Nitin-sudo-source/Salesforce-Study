import { LightningElement, wire,api,track } from 'lwc';
import getAccounts from '@salesforce/apex/Ex_Pagination.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// const columns = [
//     { label: 'Name', fieldName: 'Name' },
//     { label: 'Type', fieldName: 'Type' },
//     { label: 'Industry', fieldName: 'Industry' },
//     { label: 'BillingCountry', fieldName: 'BillingCountry' },
// ];

export default class Pazgination extends LightningElement {
    // page = 1; //initialize 1st page
    // items = []; //contains all the records.
    // data = []; //data  displayed in the table
    // columns; //holds column info.
    // startingRecord = 1; //start record position per page
    // endingRecord = 0; //end record position per page
    // pageSize = 10; //default value we are assigning
    // totalRecountCount = 0; //total record count received from all retrieved records
    // totalPage = 0; //total number of page is needed to display all records
    // selectedRows = [];
    // @api hideCheckboxColumn = false;
    // @track sortDirection = 'asc';
    // @track sortedBy;
    // @api loadMoreOffset = 0;
    // @track isLoading = false;

    // @wire(retrieveAccounts)
    // wiredAccounts({ error, data }) {
    //     if (data) {
    //         this.items = data;
    //         this.totalRecountCount = data.length;
    //         this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
    //         //here we slice the data according page size
    //         this.data = this.items.slice(0, this.pageSize);
    //         this.endingRecord = this.pageSize;
    //         this.columns = columns;
    //         this.error = undefined;
    //     } else if (error) {
    //         this.error = error;
    //         this.data = undefined;
    //         this.showToast(this.error, 'Error', 'Error'); //show toast for error
    //     }
    // }

    // //press on previous button this method will be called
    // previousHandler() {
    //     if (this.page > 1) {
    //         this.page = this.page - 1;
    //         this.displayRecordPerPage(this.page);
    //     }
    // }

    // //press on next button this method will be called
    // nextHandler() {
    //     if ((this.page < this.totalPage) && this.page !== this.totalPage) {
    //         this.page = this.page + 1;
    //         this.displayRecordPerPage(this.page);
    //     }
    // }

    // //this method displays records page by page
    // displayRecordPerPage(page) {
    //     this.startingRecord = ((page - 1) * this.pageSize);
    //     this.endingRecord = (this.pageSize * page);
    //     this.endingRecord = (this.endingRecord > this.totalRecountCount)
    //         ? this.totalRecountCount : this.endingRecord;
    //     this.data = this.items.slice(this.startingRecord, this.endingRecord);
    //     //increment by 1 to display the startingRecord count, 
    //     //so for 2nd page, it will show "Displaying 6 to 10 of 23 records. Page 2 of 5"
    //     this.startingRecord = this.startingRecord + 1;
    //     this.template.querySelector('[data-id="datatable"]').selectedRows = this.selectedRows;
    // }

    // handleRowSelection(event) {
    //     let updatedItemsSet = new Set();
    //     // List of selected items we maintain.
    //     let selectedItemsSet = new Set(this.selectedRows);
    //     // List of items currently loaded for the current view.
    //     let loadedItemsSet = new Set();

    //     this.data.map((ele) => {
    //         loadedItemsSet.add(ele.Id);
    //     });

    //     if (event.detail.selectedRows) {
    //         event.detail.selectedRows.map((ele) => {
    //             updatedItemsSet.add(ele.Id);
    //         });

    //         // Add any new items to the selectedRows list
    //         updatedItemsSet.forEach((id) => {
    //             if (!selectedItemsSet.has(id)) {
    //                 selectedItemsSet.add(id);
    //             }
    //         });
    //     }

    //     loadedItemsSet.forEach((id) => {
    //         if (selectedItemsSet.has(id) && !updatedItemsSet.has(id)) {
    //             // Remove any items that were unselected.
    //             selectedItemsSet.delete(id);
    //         }
    //     });

    //     this.selectedRows = [...selectedItemsSet];
    //     console.log('selectedRows==> ' + JSON.stringify(this.selectedRows));
    // }

    // showToast(message, variant, title) {
    //     const event = new ShowToastEvent({
    //         title: title,
    //         message: message,
    //         variant: variant,
    //         mode: 'dismissable'
    //     });
    //     this.dispatchEvent(event);
    // }

    // handleSort(event) {
    //     this.sortedBy = event.detail.fieldName;
    //     this.sortDirection = event.detail.sortDirection;
    //     // Fetch sorted data based on this.sortedBy and this.sortDirection
    // }

    // handleFetchMore(event) {
    //     // Simulate loading more data
    //     this.isLoading = true;
    //     setTimeout(() => {
    //         this.loadMoreOffset += event.detail.loadMoreOffset;
    //         // Fetch more data based on this.loadMoreOffset
    //         this.isLoading = false;
    //     }, 1000);
    // }


      // Declare variables for data binding
  // Accounts data array to store account records returned from apex controller
  @track accounts = [];
  // Accounts data array to be displayed on current page
  @track displayAccounts = [];
  // Array of page numbers
  @track pageNumbers = [];
  // Current page number
  @track currentPage = 1;
  // Total number of pages
  @track totalPages = 0;
  // Number of records per page
  @track pageSize = 10;
  // Total number of records
  @track totalRecords;
  // Flag to indicate if current page is first page
  @track isFirstPage = true;
  // Flag to indicate if current page is last page
  @track isLastPage = false;
  // Flag to disable previous button
  @track isPreviousDisabled = true;
  // Flag to disable next button
  @track isNextDisabled = false;
  // Field on which data is to be sorted
  @track sortField;
  // Flag to indicate if data is to be sorted in ascending order
  @track sortAscending = true;
  // Flag to show/hide spinner
  @track showSpinner = true;
  // Flag to show/hide paginationbuttons
  @track showPageButtons = true;
 
  //using the @wire decorator to connect to the getAccounts Apex method
  @wire(getAccounts)
  /**
   * wiredAccounts method is used to handle the data returned from the Apex method.
   * It assigns the data to the accounts property and sets the total number of records and total number of pages.
   * It also calls the setPages and navigateToFirstPage methods to set the pagination and navigate to the first page.
   * @param {Object} data - data returned from the Apex method
   * @param {Object} error - error returned from the Apex method
   */
  wiredAccounts({ data, error }) {
    // If data is returned from the Apex method
    if (data) {
      // Assign the data to the accounts property
      this.accounts = data;
      // Assign the total number of records to the totalRecords property
      this.totalRecords = data.length;
      // Calculate the total number of pages based on the page size and the total number of records
      this.totalPages = Math.ceil(this.accounts.length / this.pageSize);
      // Call the setPages method, passing in the data
      this.setPages(data);
      // Call the navigateToFirstPage method to navigate to the first page
      this.navigateToFirstPage();
      this.showSpinner = false;
    } else if (error) {
      // If an error is returned, handle it
      this.showSpinner = false;
    }
  }
  /**
   * setPages method is used to set the page numbers for the pagination component.
   * It creates an array of page numbers based on the length of the data and the page size.
   * The created array is assigned to this.pageNumbers so that it can be used in the pagination component.
   * @param {Object} data - data used to calculate the number of pages
   */
  setPages(data) {
    // Create an array of page numbers based on the length of the data and the page size.
    // this.pageNumbers is assigned the array so that it can be used in the pagination component.
    this.pageNumbers = Array.from(
      // Using the Array.from method with the length of Math.ceil(data.length / this.pageSize)
      { length: Math.ceil(data.length / this.pageSize) },
      // _ is a placeholder for the value of the array and i is the index of the array, and it starts with 1.
      (_, i) => i + 1
    );
  }
  /**
     * getPagesList method is used to return the list of page numbers to be displayed in the pagination component.
     * It calculates the middle of the page size and checks if the total number of pages is greater than the middle of the page size.
     * If so, it returns a slice of page numbers from the current page - middle to the current page + middle - 1.
     * If the total number of pages is less than or equal to the middle of the page size, 
     it returns a slice of page numbers from the start to the page size
    */
  getPagesList() {
    //Calculates the middle of the page size
    let mid = Math.floor(this.pageSize / 2) + 1;
    //Checks if the total number of pages is greater than the middle of the page size
    if (this.pageNumbers > mid) {
      //Returns a slice of page numbers from the current page - middle to the current page + middle - 1
      return this.pageNumbers.slice(
        this.currentPage - mid,
        this.currentPage + mid - 1
      );
    }
    //If the total number of pages is less than or equal to the middle of the page size,
    //returns a slice of page numbers from the start to the page size
    return this.pageNumbers.slice(0, this.pageSize);
  }
  /**
     * navigateToFirstPage method is used to navigate to the first page of the pagination component.
     * It assigns the current page to the first page, sets the flags for the first page, last page, 
     previous button, and next button, and assigns the accounts to be displayed on the first page.
    */
  navigateToFirstPage() {
    // Assign the current page to the first page
    this.currentPage = 1;
    // Assign the flag for first page to true
    this.isFirstPage = true;
    // Setting the flag for last page to false
    this.isLastPage = false;
    // Assign the flag for previous button to be disabled
    this.isPreviousDisabled = true;
    // Assign the flag for next button to be enabled
    this.isNextDisabled = false;
    // Assign the accounts to be displayed on the first page
    this.displayAccounts = this.accounts.slice(0, this.pageSize);
  }
  /**
     * navigateToLastPage method is used to navigate to the last page of the pagination.
     * It assigns the current page variable to the total number of pages, updates the isFirstPage and isLastPage variables, 
     and sets the isPreviousDisabled and isNextDisabled variables.
    * It also assigns the displayAccounts variable to the slice of the accounts array that corresponds to the current page
    */
  navigateToLastPage() {
    // Assign the current page variable to the total number of pages
    this.currentPage = this.totalPages;
    // Assign the isFirstPage variable to false, indicating that the current page is not the first page
    this.isFirstPage = false;
    // Assign the isLastPage variable to true, indicating that the current page is the last page
    this.isLastPage = true;
    // This line sets the isPreviousDisabled variable to false, indicating that the "previous" button should be enabled
    this.isPreviousDisabled = false;
    // Assign the isNextDisabled variable to true, indicating that the "next" button should be disabled
    this.isNextDisabled = true;
    // Assign the displayAccounts variable to the slice of the accounts array that corresponds to the current page, using the currentPage, pageSize and the accounts array
    this.displayAccounts = this.accounts.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
  /**
     * navigateToPage method is used to navigate to a specific page.   
     * It sets the currentPage variable to the page number that was clicked and checks if the current page 
     is the first page, last page, and if the previous and next buttons should be disabled.
    * It also calls the displayAccounts property and slice the accounts array to display the accounts for the current page.
    * @param {Object} event - event object passed when a page number is clicked.
    */
  navigateToPage(event) {
    //Sets the currentPage variable to the page number that was clicked
    this.currentPage = parseInt(event.target.textContent, 10);
    //Checks if the current page is the first page
    this.isFirstPage = this.currentPage === 1;
    //Checks if the current page is the last page
    this.isLastPage = this.currentPage === this.totalPages;
    //Checks if the previous button should be disabled
    this.isPreviousDisabled = this.currentPage === 1;
    //Checks if the next button should be disabled
    this.isNextDisabled = this.currentPage === this.totalPages;
    //Displays the accounts for the current page
    this.displayAccounts = this.accounts.slice(
      //Calculates the start index for the current page
      (this.currentPage - 1) * this.pageSize,
      //Calculates the end index for the current page
      this.currentPage * this.pageSize
    );
  }
  /**
     * navigateToPreviousPage method is used to navigate to the previous page in the pagination.
     * It updates the currentPage, isFirstPage, isLastPage, isPreviousDisabled and isNextDisabled properties
     and also updates the accounts to be displayed on the current page
    */
  navigateToPreviousPage() {
    // Assign the current page variable to the current page minus 1
    this.currentPage = this.currentPage - 1;
    // Assign the isLastPage variable to false, indicating that the current page is not the last page
    this.isLastPage = false;
    // If the current page is equal to 1
    if (this.currentPage === 1) {
      // Assign the isFirstPage variable to true, indicating that the current page is the first page
      this.isFirstPage = true;
      // Assign the isPreviousDisabled variable to true, indicating that the "previous" button should be disabled
      this.isPreviousDisabled = true;
    }
    // Assign the isNextDisabled variable to false, indicating that the "next" button should be enabled
    this.isNextDisabled = false;
    // Assign the accounts to be displayed on the previous page
    this.displayAccounts = this.accounts.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
  /**
   * navigateToNextPage method is used to navigate to the next page of accounts.
   * It checks if the current page is less than the total number of pages.
   * If true, it increments the current page by 1, updates the isFirstPage, isLastPage, isPreviousDisabled and isNextDisabled properties.
   * It also updates the displayAccounts array to show the accounts for the current page
   */
  navigateToNextPage() {
    //Checks if the current page is less than the total number of pages
    if (this.currentPage < this.totalPages) {
      //Increments the current page by 1
      this.currentPage++;
      //Checks if the current page is equal to the total number of pages
      if (this.currentPage === this.totalPages) {
        //Sets isFirstPage and isPreviousDisabled to false, isLastPage and isNextDisabled to true
        this.isFirstPage = false;
        this.isLastPage = true;
        this.isPreviousDisabled = false;
        this.isNextDisabled = true;
      } else {
        //Sets isFirstPage, isLastPage, isPreviousDisabled, and isNextDisabled to false
        this.isFirstPage = false;
        this.isLastPage = false;
        this.isPreviousDisabled = false;
        this.isNextDisabled = false;
      }
      //Updates the displayAccounts array to show the accounts for the current page
      this.displayAccounts = this.accounts.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  }
  /**
   * handleSort method is used to handle the sorting of data when user clicks on the table header.
   * It gets the field name of the clicked table header and checks if the current sort field is the same as the field name of the clicked table header.
   * If the same, it toggles the sort order. If not, it updates the sort field and sets the sort order as ascending.
   * It also calls the sortData method to sort the data.
   * @param {Event} event - event object of the table header click
   */
  handleSort(event) {
    // get the field name of the clicked table header
    let fieldName = event.target.dataset.fieldName;
    // check if the current sort field is the same as the field name of the clicked table header
    if (this.sortField === fieldName) {
      // if the same, toggle the sort order
      this.sortAscending = !this.sortAscending;
    } else {
      // if not the same, update the sort field and set sort order as ascending
      this.sortField = fieldName;
      this.sortAscending = true;
    }
    // call the sortData method to sort the data
    this.sortData(this.sortField, this.sortAscending);
  }
  /**
     * sortData method is used to sort the data based on the given field name and sort order.
     * It creates a copy of the accounts array, sorts it using the provided field name and sort order, and assigns the sorted data back to the accounts array.
     * It also assigns a slice of the sorted data to the displayAccounts array to only show a certain number of records per page,
     and creates and adds a sort icon to indicate the current sort order.
    * @param {String} sortField - the field name by which to sort the data.
    * @param {Boolean} sortAscending - the sort order, true for ascending and false for descending
    */
  sortData(sortField, sortAscending) {
    this.accounts = [...this.accounts].sort((a, b) => {
      let valueA;
      let valueB;
      // Check if the field name exists in the object, if not set value to null
      if (a[sortField] === undefined) {
        valueA = null;
      } else {
        valueA = a[sortField];
      }
      if (b[sortField] === undefined) {
        valueB = null;
      } else {
        valueB = b[sortField];
      }
      if (valueA === null) {
        // return 1 for ascending and -1 for descending if valueA is null
        return sortAscending ? 1 : -1;
      }
      if (valueB === null) {
        // return -1 for ascending and 1 for descending if valueB is null
        return sortAscending ? -1 : 1;
      }
      if (typeof valueA === "string") {
        // convert valueA to lowercase if it is a string
        valueA = valueA.toLowerCase();
      }
      if (typeof valueB === "string") {
        // convert valueB to lowercase if it is a string
        valueB = valueB.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      if (sortAscending) {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    /* Assign a slice of the sorted data to the displayAccounts
     *  array to only show a certain number of records per page
     */
    this.displayAccounts = this.accounts.slice(0, this.pageSize);
    // Select any existing sort icon on the page
    let existingIcon = this.template.querySelectorAll('img[id="sorticon"]');
    // If an existing sort icon is found, remove it
    if (existingIcon[0]) {
      existingIcon[0].parentNode.removeChild(existingIcon[0]);
    }
    // Create a new sort icon element
    let icon = document.createElement("img");
    /* If sortAscending is true, set the sort icon's
     *source to the ascending arrow image
     */
    if (sortAscending) {
      icon.setAttribute("src", Images + "/Images/arrowup.png");
    }
    /* If sortAscending is false, set the sort icon's
     *  source to the descending arrow image
     */
    if (!sortAscending) {
      icon.setAttribute("src", Images + "/Images/arrowdown.png");
    }
    // Set the sort icon's id attribute to "sorticon"
    icon.setAttribute("id", "sorticon");
    // Set the sort icon's height and width
    icon.style.height = "15px";
    icon.style.width = "15px";
    icon.style.paddingBottom = "2px";
    // Select the table header for the sortField passed in
    let nodes = this.template.querySelectorAll(
      'span[data-field-id="' + sortField + '"]'
    );
    // Append the sort icon to the selected table header
    nodes.forEach((input) => {
      input.appendChild(icon);
    });
    this.navigateToFirstPage();
  }

    

}