import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
 
export default class LWCSourceNavigation extends NavigationMixin(LightningElement) {
         
    handleLWCNavigate() {
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__NavigationHelper"
            },
            state: {
                c__amount: 1000
            }
        });
    }
         
}