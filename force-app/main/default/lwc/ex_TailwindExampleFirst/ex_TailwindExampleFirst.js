/**
 * @description       : 
 * @author            : nitinSFDC@exceller.SFDoc
 * @group             : 
 * @last modified on  : 19-04-2025
 * @last modified by  : nitinSFDC@exceller.SFDoc
**/
import { LightningElement, track } from 'lwc';
import tailwindcssEx from '@salesforce/resourceUrl/tailwindcss';
import { loadStyle } from 'lightning/platformResourceLoader';
// import mycss from './css/tailwind.dev.css';



export default class Ex_TailwindExampleFirst extends LightningElement {
    tailwindcssEx = tailwindcssEx;
    // @track cssLoaded = false;
    // // mycss = mycss;

    // renderedCallback() {
    //     //console.log('mycss: '+mycss);
    //     if (this.cssLoaded) {
    //         return;
    //     }
    //     this.cssLoaded = true;

    //     // Load Tailwind CSS using loadStyle
    //     loadStyle(this, tailwindcssEx)
    //         .then(() => {
    //             console.log('Tailwind CSS loaded successfully.');
    //         })
    //         .catch(error => {
    //             console.error('Error loading Tailwind CSS:', error);
    //         });


    // }

    @track cssLoaded = false;
    @track isClicked = false;
    @track buttonLabel = 'Save Changes';
    @track showCheck = false;


    // get buttonClass() {
    //     return `group w-full inline-flex items-center justify-center px-6 py-3 text-white font-semibold transition duration-300 ease-in-out 
    //     rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 
    //     ${this.isClicked ? 'bg-green-600' : 'bg-violet-600'} 
    //     hover:bg-violet-700 active:scale-95`.replace(/\s+/g, ' ').trim();
    // }

    get buttonClass() {
        return `
            w-full flex items-center justify-between px-6 py-3 rounded-full
            font-semibold text-white text-sm tracking-wide
            bg-gradient-to-r from-purple-500 to-indigo-600
            shadow-xl shadow-indigo-400/30
            hover:from-indigo-500 hover:to-purple-600
            hover:scale-105 active:scale-95
            transition-all duration-300 ease-in-out
            disabled:opacity-60 disabled:cursor-not-allowed
        `.replace(/\s+/g, ' ').trim();
    }


    

    renderedCallback() {
        if (this.cssLoaded) return;
        this.cssLoaded = true;

        loadStyle(this, tailwindcssEx)
            .then(() => {
                console.log('Tailwind CSS loaded');
            })
            .catch(error => {
                console.error('Error loading Tailwind:', error);
            });
    }
    handleClick() {
        this.isLoading = true;
        this.buttonLabel = 'Saving...';
        this.showCheck = false;

        setTimeout(() => {
            this.isLoading = false;
            this.showCheck = true;
            this.buttonLabel = 'Saved!';
            setTimeout(() => {
                this.showCheck = false;
                this.buttonLabel = 'Save Changes';
            }, 2500);
        }, 2000);
    }




}