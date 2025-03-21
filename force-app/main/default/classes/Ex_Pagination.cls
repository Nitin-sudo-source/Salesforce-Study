public class Ex_Pagination {
     @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name,Phone, Industry,CreatedDate,
                LastModifiedDate FROM Account 
                WIth SECURITY_ENFORCED ORDER BY NAME];
    }
    
    
    public Class PageWraper{
        @AuraEnabled public String pageNo{get;set;}
        
    }
    

}