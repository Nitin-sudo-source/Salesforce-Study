import { LightningElement,api } from 'lwc';
export default class ResumeSection extends LightningElement {
    @api sectionTitle;

    get sectionId() {
        return this.sectionTitle.toLowerCase().replace(/\s+/g, '');
    }

}