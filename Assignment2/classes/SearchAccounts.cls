public class SearchAccounts {
	 @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String searchTerm, Integer recLimit) {
        String key = '%' + searchTerm + '%';
        return [
            SELECT Id, Name, Phone, Industry
            FROM Account
            WHERE Name LIKE :key 
            LIMIT :recLimit
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchTerm) {
        system.debug('searchTerm ==>'+searchTerm );
        return [
            SELECT Id, Name, Phone, Industry
            FROM Account
            WHERE Type = :searchTerm 
            LIMIT 20
        ];
    }
    
   }