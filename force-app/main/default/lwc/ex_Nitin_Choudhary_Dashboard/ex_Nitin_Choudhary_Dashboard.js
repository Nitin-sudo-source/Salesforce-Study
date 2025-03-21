import { LightningElement, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';  // Import loadStyle
import FONT_AWESOME from '@salesforce/resourceUrl/fontAwesome';
import TAILWIND from '@salesforce/resourceUrl/tailwindcss';


export default class Ex_Nitin_Choudhary_Dashboard extends LightningElement {
@track showTechnical = false;
FONT_AWESOME = FONT_AWESOME;
TAILWIND = TAILWIND;

connectedCallback(){
    this.handleloadStyle();
    this.loadTailwind();
    this.showTechnical = true;

}

handleloadStyle(){
    loadStyle(this, FONT_AWESOME)
    .then(() => {
        console.log('Font Awesome loaded successfully');
    })
    .catch(error => {
        console.error('Error loading Font Awesome:', error);
    });
}

loadTailwind(){
    loadStyle(this, TAILWIND)
      .then(() => {
        console.log('Tailwind CSS loaded successfully');
      })
      .catch(error => {
        console.error('Error loading Tailwind CSS', error);
      });
  }



    handleTechnical(){

    }

}