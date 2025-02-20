import { LightningElement,api,track } from 'lwc';
export default class CountryWithCode extends LightningElement {
        @track phoneNumber = '';
    @track isDropdownOpen = false;
    @track searchKey = '';
    @track selectedCountry = { name: 'India', code: 'IN', dialCode: '+91', flag: 'https://flagcdn.com/in.svg' };
    @track filteredCountries = [];

    countries = [
        { name: 'Hong Kong', code: 'HK', dialCode: '+852', flag: 'https://flagcdn.com/hk.svg' },
        { name: 'Hungary', code: 'HU', dialCode: '+36', flag: 'https://flagcdn.com/hu.svg' },
        { name: 'Iceland', code: 'IS', dialCode: '+354', flag: 'https://flagcdn.com/is.svg' },
        { name: 'India', code: 'IN', dialCode: '+91', flag: 'https://flagcdn.com/in.svg' },
        { name: 'Indonesia', code: 'ID', dialCode: '+62', flag: 'https://flagcdn.com/id.svg' },
        { name: 'Ireland', code: 'IE', dialCode: '+353', flag: 'https://flagcdn.com/ie.svg' },
        { name: 'Isle of Man', code: 'IM', dialCode: '+44', flag: 'https://flagcdn.com/im.svg' },
        { name: 'Israel', code: 'IL', dialCode: '+972', flag: 'https://flagcdn.com/il.svg' },
        // More countries can be added here
    ];

    connectedCallback() {
        this.filteredCountries = this.countries;
    }

    get selectedCountryFlag() {
        return this.selectedCountry.flag;
    }

    get selectedDialCode() {
        return this.selectedCountry.dialCode;
    }

    handlePhoneNumberChange(event) {
        this.phoneNumber = event.target.value;
    }

    clearPhoneNumber() {
        this.phoneNumber = '';
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    handleSearchChange(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.filteredCountries = this.countries.filter(country =>
            country.name.toLowerCase().includes(this.searchKey)
        );
    }

    selectCountry(event) {
        const selectedCountryCode = event.currentTarget.dataset.id;
        this.selectedCountry = this.countries.find(country => country.code === selectedCountryCode);
        this.isDropdownOpen = false;
    }


}