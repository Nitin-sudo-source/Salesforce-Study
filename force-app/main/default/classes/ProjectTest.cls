public class ProjectTest {

     @AuraEnabled 
     public static list<Project__c> fetchProject(){
     List<Project__c> plist= [SELECT Id,Name From Project__c limit 5];
     return plist;
     }
         
      @AuraEnabled 
     public static list<Tower__c> fetchTower(String Pid)
     {
   	    system.debug('Id'+Pid);
        List<Tower__c> tlist=[select Id, Name From Tower__c WHERE Project__r.id =: Pid];
        system.debug('after query '+tlist);
        return tlist;        
    }
}