public class EY_ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accountId, String searchKey, Integer pageNumber, String sortBy, String sortDirection) {
        String query = 'SELECT Id, FirstName, LastName, Email FROM Contact WHERE AccountId = :accountId';
        
        if (String.isNotBlank(searchKey)) {
            searchKey = '%' + searchKey + '%';
            query += ' AND (FirstName LIKE :searchKey OR LastName LIKE :searchKey OR Email LIKE :searchKey)';
        }
        
        query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        query += ' LIMIT 5 OFFSET ' + ((pageNumber - 1) * 5);
        System.debug('query: '+Database.query(query));
        
        return Database.query(query);
    }
    
    
}