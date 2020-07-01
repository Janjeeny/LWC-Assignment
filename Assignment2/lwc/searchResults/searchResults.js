import { LightningElement,api,track } from 'lwc';
import getAccounts from '@salesforce/apex/SearchAccounts.getAccounts';
export default class SearchResults extends LightningElement {

@track AccountList;
@track showLoading = false;
@track message = 'No records to show';

@api
getAccountsRecord(selVal){
    console.log('getAccountsRecord-->'+selVal);
    this.AccountList = '';
    this.showLoading = true;
    this.message = '';
    getAccounts({searchTerm:selVal})
                .then(result => {
                    console.log(result.length)
                    this.showLoading = false;
                    if(result.length > 0){
                        this.AccountList = result;
                    }
                    else{
                        
                        this.message = 'No records to show';
                    }
                    
                })
                .catch(error => {
                    this.showLoading = false;
                    this.message = error;
                });
}

}