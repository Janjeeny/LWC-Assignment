import { LightningElement} from 'lwc';

export default class RootParent extends LightningElement {

    //handles the event 'selectvaluechange' fired from picklistSearch comp
    handleSelectValueChange(event)
    {
       this.selectedVal = event.detail;
       console.log('eventHandled==>'+event.detail);
       this.template.querySelector("c-search-results").getAccountsRecord(event.detail);
    }

}