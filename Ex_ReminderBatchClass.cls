global class Ex_ReminderBatchClass implements Database.Batchable<SObject>, Schedulable {
    private static final Integer BATCH_SIZE = 200;
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        Date today = Date.today();
        DateTime threeHoursFromNow = DateTime.now().addHours(3);
        
        String query = 'SELECT Id, Next_Call_Date__c, Next_Meeting_Date__c, Name, OwnerId ' +
            'FROM CP_Project__c ' +
            'WHERE (' +
            '(Next_Call_Date__c != null AND DAY_ONLY(Next_Call_Date__c) = :today AND Next_Call_Date__c < :threeHoursFromNow) OR ' +
            '(Next_Meeting_Date__c != null AND DAY_ONLY(Next_Meeting_Date__c) = :today AND Next_Meeting_Date__c < :threeHoursFromNow)' +
            ')';
        
        System.debug(LoggingLevel.DEBUG, 'Query: ' + query);
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext bc, List<CP_Project__c> scope) {
        if(scope.isEmpty()) {
            System.debug(LoggingLevel.INFO, 'No records to process');
            return;
        }
        
        Map<Id, CP_Project__c> projectsToNotify = new Map<Id, CP_Project__c>();
        Set<Id> ownerIds = new Set<Id>();
        
        for(CP_Project__c proj : scope) {
            DateTime now = DateTime.now();
            Boolean hasUpcomingCall = proj.Next_Call_Date__c != null && 
                                    proj.Next_Call_Date__c.date() == Date.today() && 
                                    proj.Next_Call_Date__c < now.addHours(3);
            
            Boolean hasUpcomingMeeting = proj.Next_Meeting_Date__c != null && 
                                       proj.Next_Meeting_Date__c.date() == Date.today() && 
                                       proj.Next_Meeting_Date__c < now.addHours(3);
            
            if(hasUpcomingCall || hasUpcomingMeeting) {
                ownerIds.add(proj.OwnerId);
                projectsToNotify.put(proj.Id, proj);
            }
        }
        
        if(!projectsToNotify.isEmpty()) {
            try {
                notifyUsers(projectsToNotify, ownerIds);
            } catch(Exception e) {
                System.debug(LoggingLevel.ERROR, 'Error in execute: ' + e.getMessage() + '\n' + e.getStackTraceString());
            }
        }
    }
    
    global void finish(Database.BatchableContext bc) {
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors, JobItemsProcessed, 
                           TotalJobItems, CreatedBy.Email
                           FROM AsyncApexJob 
                           WHERE Id = :bc.getJobId()];
        
        System.debug(LoggingLevel.INFO, 'Batch Job Completed. Status: ' + job.Status + 
                    ' Items Processed: ' + job.JobItemsProcessed + 
                    ' Errors: ' + job.NumberOfErrors);
    }
    
    global void execute(SchedulableContext sc) {
        Database.executeBatch(new Ex_ReminderBatchClass(), BATCH_SIZE);
    }
    
    global static void notifyUsers(Map<Id, CP_Project__c> projectsToNotify, Set<Id> ownerIds) {
        try {
            CustomNotificationType notificationType = [SELECT Id, DeveloperName 
                                                     FROM CustomNotificationType 
                                                     WHERE DeveloperName = 'Presales_Follow_Up_Reminder' 
                                                     LIMIT 1];
            
            for(CP_Project__c proj : projectsToNotify.values()) {
                DateTime now = DateTime.now();
                String notificationTitle = 'Project Follow-up Required: ' + proj.Name;
                String body = '';
                
                if(proj.Next_Call_Date__c != null && 
                   proj.Next_Call_Date__c.date() == Date.today() && 
                   proj.Next_Call_Date__c < now.addHours(3)) {
                    body += 'Upcoming Call scheduled at ' + proj.Next_Call_Date__c.format('hh:mm a') + '\n';
                }
                
                if(proj.Next_Meeting_Date__c != null && 
                   proj.Next_Meeting_Date__c.date() == Date.today() && 
                   proj.Next_Meeting_Date__c < now.addHours(3)) {
                    body += 'Upcoming Meeting scheduled at ' + proj.Next_Meeting_Date__c.format('hh:mm a');
                }
                
                Messaging.CustomNotification notification = new Messaging.CustomNotification();
                notification.setTitle(notificationTitle);
                notification.setBody(body.trim());
                notification.setNotificationTypeId(notificationType.Id);
                notification.setTargetId(proj.Id);
                
                try {
                    notification.send(ownerIds);
                } catch(Exception e) {
                    System.debug(LoggingLevel.ERROR, 'Failed to send notification for Project: ' + 
                               proj.Id + '. Error: ' + e.getMessage());
                }
            }
        } catch(Exception e) {
            System.debug(LoggingLevel.ERROR, 'Error in notifyUsers: ' + e.getMessage() + 
                        '\n' + e.getStackTraceString());
            throw new BatchException('Failed to process notifications: ' + e.getMessage());
        }
    }
    
    public class BatchException extends Exception {}
}
