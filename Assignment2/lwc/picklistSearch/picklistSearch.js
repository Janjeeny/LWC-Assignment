import { LightningElement,wire,api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

export default class PicklistSearch extends LightningElement {
    @wire(getPicklistValues, { recordTypeId: '01290000001IlzTAAS' , fieldApiName: TYPE_FIELD }) picklistValues;
    
    //onchange function of the picklist
    displayAccounts(event) {
        //custom Event
        const selectedEvent = new CustomEvent("selectvaluechange", {
            detail: event.target.value,
          });
      
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
   }        
}