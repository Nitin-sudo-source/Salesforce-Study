public class ToggleButtonController {
    @AuraEnabled
    public static List <User> getUsers(String uid) {
        system.debug('uid: ' +uid);
        List <User> users = [SELECT Id,IsActive FROM User];
        System.debug('Users: ' +users);
        return users;
    }
   
}