public with sharing class sendEmailOnclick {
    public sendEmailOnclick() {

    }
    @AuraEnabled
    public static Boolean sendMail(Id recordId){
        try {
            System.debug(recordId);
            System.debug('Success Send Email');
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return true;
    }
   
}