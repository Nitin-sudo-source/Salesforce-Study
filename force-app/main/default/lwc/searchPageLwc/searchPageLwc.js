import { LightningElement, track, api, wire } from 'lwc';
import getProject from '@salesforce/apex/ProjectSetup.getProject';
import searchRecords from '@salesforce/apex/SearchPageLwc.searchRecords'; //getSv
import getSv from '@salesforce/apex/SearchPageLwc.getSv';
import submit from '@salesforce/apex/SearchPageLwc.submit'; //getCPAccount





export default class SearchPageLwc extends LightningElement {
  @api recordId;

  // project variable
  @track projectId = '';
  @track projectOptions = [];

  // show search dataa
  @track searchResult = [];

  // get mobile and email through input
  @track mobile;
  @track email;

  //sv variable
  @track svWrapper = { sv: {} };
  @track updatedSV = [];

  //Page Variable
  @track searchPage = true;
  @track firstPage = false;
  @track showData = false;
  @track secondPage = false;
  @track showContinue = false;
  @track thirdPage = false;

  //data variable
  @track accountList = [];
  @track opplist = [];
  @track leadlist = [];

  //fetch variable through information found;
  @track isLeadFound = false;
  @track isOpportunityFound = false;
  @track isAccountFound = false;

  //cp variable
  @track searchCP = '';
  @track getCPData = [];
  @track showCPField = false;

  @track leadId = '';
  @track OppId = '';



  //get Project Information
  @wire(getProject)
  projectResult({ data, error }) {
    if (data) {
      this.projectOptions = data.map(p => ({ label: p.Name, value: p.Id }));
      console.log('Data received successfully:' + JSON.stringify(this.projectOptions));
    } else if (error) {
      console.error('Error fetching data:', JSON.stringify(error));
    }
  }

  callgetSvWrapper() {
    console.log('Inside:');
    this.leadId = this.leadlist.Id;
    console.log('leadId:' + JSON.stringify(this.leadId));

    this.OppId = this.opplist.Id;
    console.log('OppId:' + JSON.stringify(this.OppId));

    getSv({ leadId: this.leadId, OppId: this.OppId })
    .then((result) => {
        this.svWrapper = result;
        console.log('Data received SV:' + JSON.stringify(this.svWrapper));
      })
      
  }
  //get svWrapper
  // @wire(getSv)
  // wiredMethod({ data, error }) {
  //   if (data) {
  //     this.svWrapper = data;
  //     console.log('Data received SV:' + JSON.stringify(this.svWrapper));
  //   } else if (error) {
  //     console.error('Error fetching data:', JSON.stringify(error));
  //   }
  // }


  handleProjectChange(event) {
    this.projectId = event.target.value;
    //alert(this.projectId);
  }

  handlePhoneChange(event) {
    this.mobile = event.target.value;
    console.log('Watch: mobile ->' + this.mobile); /*eslint-disable-line*/
  }

  handleemailChange(event) {
    this.email = event.target.value;
    //alert(this.email);
  }
  get sectionKeys() {
    return Object.keys(this.searchResult);
  }

  handleSearch() {
    searchRecords({ Mobile: this.mobile, Email: this.email })
      .then(result => {
        console.log(JSON.stringify(result));
        if (result) {
          this.searchResult = this.flattenSearchResult(result);
          console.log('result:::' + JSON.stringify(this.searchResult));
          //Lead Data
          if (result.Lead != null && result.Lead !== '') {
            this.isLeadFound = true;
            if (this.isLeadFound === true) {
              this.leadlist = result.Lead[0];
              
              console.log('Lead List: ' + JSON.stringify(this.leadlist))
            }
          }
          //Opp Data
          if (result.Opportunity != null && result.Opportunity !== '') {
            this.isOpportunityFound = true;
            if (this.isOpportunityFound === true) {
              this.opplist = result.Opportunity[0];
              console.log('opplist : ' + JSON.stringify(this.opplist))
            }
          }
          //Account Data
          if (result.Account != null && result.Account !== '') {
            this.isAccountFound = true;
            if (this.isOpportunityFound === true) {
              this.accountList = result.Account[0];
              console.log('accountList : ' + JSON.stringify(this.accountList))
            }
          }
        }
        else {
          console.log('Null');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.error = error.message || 'Unknown error';
      });
    this.showData = true;
    this.showContinue = true;
  }

  flattenSearchResult(result) {
    let flattenedResult = [];
    Object.keys(result).forEach(sectionKey => {
      if (result[sectionKey]) {
        result[sectionKey].forEach(record => {
          record.section = sectionKey;
          flattenedResult.push(record);
        });
      }
    });
    return flattenedResult;
  }

  handleSV(event) {
    const fieldName = event.target.fieldName;
    const value = event.target.value;
    if (fieldName === 'Master_Source__c') {
        // Check if Master Source is Channel Partner
        if (value === 'Channel Partner') {
            // Show CP Field and set its value
            this.showCPField = true;
            this.updatedSV = {
                ...this.svWrapper.sv,
                [fieldName]: value
            };
        } else {
            // Hide CP Field and remove its value
            this.showCPField = false;
            this.updatedSV = {
                ...this.svWrapper.sv,
                [fieldName]: value,
                'Channel_Partner__c': ''
            };
        }
    } else {
        this.updatedSV = {
            ...this.svWrapper.sv,
            [fieldName]: value
        };
    }
    this.svWrapper = { sv: this.updatedSV };
    console.log('svWrapper: '+JSON.stringify(this.svWrapper));
}



  // showPopulatevalue() {
  //   this.callgetSvWrapper();
  //   // alert('Show Populate Value: '+this.mobile);
  //   this.updatedSV = { ...this.svWrapper.sv, ['Mobile__c']: this.mobile };
  //   this.svWrapper = { sv: this.updatedSV };
  //   this.updatedSV = { ...this.svWrapper.sv, ['Project__c']: this.projectId };
  //   this.svWrapper = { sv: this.updatedSV };
  //   console.log('getSVDetailsPouplatedValues: ' + JSON.stringify(this.svWrapper));
    
  // }

  handleContinue() {
    this.secondPage = false;
    this.firstPage = true;
    this.showData = false;
    this.searchPage = false;
    this.callgetSvWrapper();
  }

  handleNext1() {
    this.secondPage = true;
    this.firstPage = false;
    this.showData = false;
    this.searchPage = false;
  }
  handleNext2() {
    this.thirdPage = true;
    this.secondPage = false;
    this.firstPage = false;
    this.showData = false;
    this.searchPage = false;
  }

  saveData() {
    console.log(JSON.stringify(this.leadlist));
    // alert('Lead: ' + this.isLeadFound + 'Account: ' + this.isAccountFound + 'Opporunity: ' + this.isOpportunityFound);
    // alert('getSVWrapper: ' + JSON.stringify(this.svWrapper));
    submit({ svWrapper: this.svWrapper, leadId: this.leadlist.Id, oppId: this.opplist.Id, accId: this.accountList.Id })
      .then((result) => {
        console.log('Data saved successfully: ' + JSON.stringify(result));
      })
      .catch(error => {
        console.error('Error saving data: ' + JSON.stringify(error));
      });
  }
}