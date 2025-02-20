public class Ex_ProgressBar {
    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> fetchRecordCounts() {
        Map<String, Integer> recordCounts = new Map<String, Integer>();
        // Retrieve counts for Account, Opportunity, Lead, and Case records
        recordCounts.put('Account', [SELECT COUNT() FROM Account]);
        recordCounts.put('Opportunity', [SELECT COUNT() FROM Opportunity]);
        recordCounts.put('Lead', [SELECT COUNT() FROM Lead]);
        recordCounts.put('Case', [SELECT COUNT() FROM Case]);
        return recordCounts;
    }
    
    
}