public class OpportunityDataController {
 
    @AuraEnabled (cacheable=true)
    public static List<Opportunity> fetchOpportunity(){
        return [SELECT Id, Name, Amount, StageName FROM Opportunity ];       
    }
}