public with sharing class AccountResponsive {
    @Auraenabled(cacheable=true)
     public static void saveAccountRecord(Account objAcc)
     {
        try
        {
            insert objAcc;
        }
        catch(Exception ex)
         {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}