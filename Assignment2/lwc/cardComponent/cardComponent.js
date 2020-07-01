import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class CardComponent extends LightningElement {
    @api accRecord ;
    @wire(CurrentPageReference) pageRef;
    displayRecord()
    {
        console.log('this.accRecord.Id-->'+this.accRecord.Id);
        fireEvent(this.pageRef, "eventdetails", this.accRecord.Id);
    }

}