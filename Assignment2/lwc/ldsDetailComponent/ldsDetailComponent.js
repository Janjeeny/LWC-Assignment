import { LightningElement, wire, track, api } from "lwc";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";
import { getRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { updateRecord } from "lightning/uiRecordApi";
import { refreshApex } from "@salesforce/apex";

import NAME_FIELD from "@salesforce/schema/Account.Name";
import OWNER_NAME_FIELD from "@salesforce/schema/Account.Owner.Name";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import TYPE_FIELD from "@salesforce/schema/Account.Industry";
import ID_FIELD from "@salesforce/schema/Account.Id";

export default class LdsDetailComponent extends LightningElement {
    @api recordid;
    @track isViewMode = true;
    @track showLoading = false; //to load spinner.
    @track recordCopy;
    @track account;
    @track phone;
    @wire(getRecord, {
        recordId: "$recordid",
        fields: [
            NAME_FIELD,
            ID_FIELD,
            OWNER_NAME_FIELD,
            PHONE_FIELD,
            INDUSTRY_FIELD,
            TYPE_FIELD
        ]
    })
    accountRec(result) {
        this.account = "";
        this.recordCopy = result;
        console.log("wire Method" + JSON.stringify(this.recordCopy));
        if (result.data) {
            this.account = result.data;
            this.phone = result.data.fields.Phone.value;
            console.log("this.phone in wire==>" + this.phone);
        } else if (result.error) {
            this.account = undefined;
        }
    }

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener("eventdetails", this.fetchAccount, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    renderedCallback() {
        /* this.showLoading = this.accountRec == ''?true:false;
            //this.recordCopy = this.accountRec == ''?'':[...this.accountRec];
            //this.recordid  = this.recordid ==''?this.recordidCopy:this.recordid;*/
        console.log("In Render recrdCopy===>" + JSON.stringify(this.recordCopy));
        console.log("this.phone in render==>" + this.phone);
    }

    fetchAccount(AccId) {
        console.log("Event captured");
        // if(this.recordid != AccId)
        // this.accountRec = '';   //to control spinner logic

        this.recordid = AccId;
        this.isViewMode = true;
        console.log("record Id===>" + this.recordid);
    }

    updateAccount() {
        console.log("Update Record");
        this.isViewMode = !this.isViewMode;
        //this.recordCopy = this.accountRec;
    }
    saveAccount() {
        console.log("save Record");
        var fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordCopy.data.fields.Id.value;
        fields[NAME_FIELD.fieldApiName] = this.template.querySelector(
            "[data-field='Name']"
        ).value;
        fields[PHONE_FIELD.fieldApiName] = this.template.querySelector(
            "[data-field='Phone']"
        ).value;

        var recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Success",
                        message: "Account updated",
                        variant: "success"
                    })
                );
                this.isViewMode = true;
                // return refreshApex(this.recordCopy);
                // Display fresh data in the form
                // return refreshApex(this.contact);
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error creating record",
                        message: "Error",
                        variant: "error"
                    })
                );
            });
    }
    cancelAccount() {
        console.log('Cancel Record');
            var fields = {};
            fields[ID_FIELD.fieldApiName] = this.recordCopy.data.fields.Id.value;
            
            var recordInput = { fields };
    
            updateRecord(recordInput)
                    .then(() => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Account Cancelled',
                                variant: 'success'
                            })
                        );
                        this.isViewMode = true;
                       // return refreshApex(this.recordCopy);
                        // Display fresh data in the form
                       // return refreshApex(this.contact);
                    })
                    .catch(error => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error creating record',
                                message: 'Error',
                                variant: 'error'
                            })
                        );
                    });
    
    
       /* const inputFields = this.template.querySelectorAll("lightning-input-field");
        if (inputFields) {
            inputFields.forEach((field) => {
                field.reset();
            });
        }*/
    }
}