public with sharing class Updateuserlist {
   @AuraEnabled
    public static Boolean UpdateuserActiveBox(Boolean toggle) {
        system.debug('Inside Apex Class:::');
		Id userId = userinfo.getUserId();
        User userObj = [SELECT Id, Active__c FROM User WHERE Id =: userId];
        system.debug('User Obj:::'+userObj);
        if(toggle == true){
            userObj.Active__c = true;
        }else if(toggle == false){
            userObj.Active__c = false;
        }
        system.debug('User Obj Before Update:::'+userObj.Active__c);
        update userObj;
	
        return toggle;
    }
    
   @AuraEnabled
   public static boolean getUsers(){
       Id userId = userinfo.getUserId();
       system.debug('Inside Method getUsers:::' +userId);
       User userObj = [SELECT Active__c  FROM User WHERE Id=: userId];
       if(userObj.Active__c==true)
       {
           userObj.Active__c = true;
           system.debug('userobj:::'+userObj.Active__c);
           
       }
       else{
            userObj.Active__c = false;
            system.debug('userobj:::'+userObj.Active__c);
         	}
       return userObj.Active__c;
		
       }
}