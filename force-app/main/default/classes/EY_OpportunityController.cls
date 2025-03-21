public class EY_OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(String stageKey, String startDate, String endDate, Integer pageNumber, String sortBy, String sortDirection) {
        String query = 'SELECT Id, Name, Amount, CloseDate, StageName FROM Opportunity WHERE IsClosed = false';
        
        if (String.isNotBlank(stageKey)) {
            query += ' AND StageName = :stageKey';
        }
        
        if (String.isNotBlank(startDate) && String.isNotBlank(endDate)) {
            query += ' AND CloseDate >= :startDate AND CloseDate <= :endDate';
        }
        
        query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        query += ' LIMIT 5 OFFSET ' + ((pageNumber - 1) * 5);
        
        return Database.query(query);
    }
    
}