public with sharing class UserInfoGet {
    @AuraEnabled(cacheable=true)
    public static string getuserName(){
        String Name = UserInfo.getName();//Returns the context user's full name.
        System.Debug('Name-' + Name);
        return Name;
        }
}