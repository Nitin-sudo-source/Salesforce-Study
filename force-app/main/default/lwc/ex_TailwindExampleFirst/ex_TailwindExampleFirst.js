import { LightningElement, track } from 'lwc';
import tailwindcssEx from '@salesforce/resourceUrl/tailwindcss';
import { loadStyle } from 'lightning/platformResourceLoader';
// import mycss from './css/tailwind.dev.css';



export default class Ex_TailwindExampleFirst extends LightningElement {
    tailwindcssEx = tailwindcssEx;
    @track cssLoaded = false;
    // mycss = mycss;

    renderedCallback() {
        //console.log('mycss: '+mycss);
        if (this.cssLoaded) {
            return;
        }
        this.cssLoaded = true;

        // Load Tailwind CSS using loadStyle
        loadStyle(this, tailwindcssEx)
            .then(() => {
                console.log('Tailwind CSS loaded successfully.');
            })
            .catch(error => {
                console.error('Error loading Tailwind CSS:', error);
            });


    }


}