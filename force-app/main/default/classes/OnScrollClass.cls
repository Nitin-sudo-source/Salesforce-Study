public class OnScrollClass {
    
    @AuraEnabled(Cacheable=true)
    public static List<opportunity> getRecords(){
        List<Opportunity> getOpp = new List<Opportunity>();
        getOpp = [Select Id, Name, AccountId from Opportunity];
        System.debug('getOpp: '+getOpp);
        if(!getOpp.isEmpty() && getOpp != null)
            return getOpp;
        else
            return null;
    }

}