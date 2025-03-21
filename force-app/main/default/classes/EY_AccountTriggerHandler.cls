public class EY_AccountTriggerHandler {
    public static void beforeInsert(List<Account> acclist){
        System.debug('List: '+accList);
        EY_AccountTriggerHandlerServices.myLogic(acclist);
        //EY_AccountTriggerHandlerServices.sendEmail(acclist);
        
    }
     public static void AfterInsert(List<Account> acclist){
        System.debug('List: '+accList);
        //EY_AccountTriggerHandlerServices.myLogic(acclist);
        //if we write in before insert 
        //22:37:23:852 USER_DEBUG [93]|DEBUG|Ex: SendEmail failed. First exception on row 15; 
        //first error: SINGLE_EMAIL_LIMIT_EXCEEDED, Email limit exceeded.: []
        EY_AccountTriggerHandlerServices.sendEmail(acclist);
        
    }
    
    
    public static void AfterUpdate(Map<Id, Account> oldMap, Map<Id, Account> newMap){
        Map<Id, Account> sendOppMap = new Map<Id, Account>();
        for(Account oldvalue : oldMap.values()){
            Account newValue = newMap.get(oldValue.Id);
            
            if(oldValue.Name != newValue.Name){
                if(!sendOppMap.containsKey(newValue.Id)){
                    sendOppMap.put(newValue.Id, newValue);
                }
            }
        }
        
        if(sendOppMap != null && !sendOppMap.isEmpty()){
            EY_AccountTriggerHandlerServices.UpdateOpportunity(sendOppMap);
        }
    }
    

}