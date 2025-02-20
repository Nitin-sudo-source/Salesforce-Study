public class ShowTimeInLWc {
    
    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProject()
    {
        List<Project__c> plist = new List<Project__c>();
        try{
          plist=[select Id,Show_Time__c, Name FROM Project__c];
          System.debug('plist:'+plist);
            
        }catch(Exception ex){
            System.debug('Error:'+ex.getMessage());
            
        }
        return plist;
    }
    
}