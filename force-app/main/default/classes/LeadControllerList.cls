public with sharing class LeadControllerList {
    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeadList() {
        return [
            SELECT Id, Name, MobilePhone,Phone, Email
            FROM Lead
        ];
    }

}