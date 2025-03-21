public class Notification_Trigger_handler
{
    public static void sendEmailNotification(Set<String> recipientsIds, String targetId)
    {
        CustomNotificationType notificationType =[SELECT Id ,DeveloperName FROM CustomNotificationType 
                                                  WHERE Developername='Owner_Notify'];
        Messaging.CustomNotification notification = new Messaging.CustomNotification();
        
        notification.setTitle('Account Custom Notification');
        notification.setBody('Account Created Sucessfully');
        
        notification.setNotificationTypeId(notificationType.Id);
        notification.setTargetId(targetId);
        try {
            notification.send(recipientsIds);
        }
        catch (Exception e) {
            System.debug('Problem sending notification: ' + e.getMessage());
        }
        

        
   
    }
} 






        /*
       CustomNotificationType accnotify=[SELECT Id,DeveloperName FROM CustomNotificationType WHERE DeveloperName='Owner_Notify'];
		System.debug('inside accnotify');

        for(Account ac:accounts)
        {
        	 String body = ac.Name +'Account'+' Created Sucessfully.';
             Messaging.CustomNotification mc = new Messaging.CustomNotification(accnotify.Id, null, 'Successfully', body, ac.Id, null);
			try
            {
            	mc.send(new set<String> {ac.OwnerId});
                System.debug('Inside try');
            }
            catch(Exception e)
            {
                System.debug('Notification could not send '+e.getMessage());
            }
            

        }
*/