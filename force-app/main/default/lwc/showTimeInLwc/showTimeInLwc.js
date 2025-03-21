import { LightningElement, wire, track } from 'lwc';
import getProject from '@salesforce/apex/ShowTimeInLWc.getProject';

export default class ShowTimeInLwc extends LightningElement {
  @track projects = [];
  @track timeshow;

  @wire(getProject)
  wiredProject({ error, data }) {
    if (data) {
      this.projects = data.map((record) => ({
        Id: record.Id,
        Name: record.Name,
        OwnerId: record.OwnerId,
        Show_Time__c: this.msToTime(record.Show_Time__c),
      }));
      console.log('Project Data::' + JSON.stringify(this.projects));

    } else if (error) {
      console.error(error);
    }
  }

  msToTime(s) {
    if (typeof s !== 'number' || isNaN(s)) {
      return '00:00:00.000Z';
    }
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;
    hrs = hrs < 10 ? '0' + hrs : hrs;
    mins = mins < 10 ? '0' + mins : mins;
    return hrs + ':' + mins + ':' + (secs < 10 ? '0' + secs : secs) + '.' + ms + 'Z';
  }
}