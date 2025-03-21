public class EY_AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer pageNumber, String sortBy, String sortDirection) {
        // Default values for sorting
        if (String.isBlank(sortBy)) {
            sortBy = 'Name';
        }
        
        if (String.isBlank(sortDirection)) {
            sortDirection = 'ASC';
        }
        
        // Calculate offset for pagination
        Integer pageSize = 5;
        Integer offset = (pageNumber - 1) * pageSize;
        
        // Build the query
        String query = 'SELECT Id, Name, Industry, AnnualRevenue FROM Account Where Industry != null AND  AnnualRevenue > 0 ORDER BY ' + sortBy + ' ' + sortDirection + 
            ' LIMIT :pageSize OFFSET :offset';
        
        // Execute the dynamic query
        return Database.query(query);
    }
    
    
}