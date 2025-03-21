public class AccountNotificationHandler {
    public static void SendNotification(List<Account> accList){
        CustomNotificationType NewNotification=[SELECT Id, 
                                                        DeveloperName  
                                                        FROM CustomNotificationType  
                                                        WHERE DeveloperName='Owner_Notify' ]; 
        for(Account acc: acclist)
        {
           String body = 'Account ' +acc.Name +' is created Successfully.'; 
                Messaging.CustomNotification Notification = new Messaging.CustomNotification(); 
                Notification.setNotificationTypeId(NewNotification.id); 
                Notification.setSenderId(Userinfo.getUserId()); 
                Notification.setBody(body); 
                Notification.setTitle('New account created'); 
                Notification.setTargetId(acc.Id); 
                Notification.send(new Set<String> {userinfo.getUserId()}); 

            
        }
    }

}