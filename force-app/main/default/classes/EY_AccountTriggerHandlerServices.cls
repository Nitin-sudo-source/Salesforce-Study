public class EY_AccountTriggerHandlerServices {
    /*
* 1. Write a trigger on Account, when an account is inserted, automatically account
*  billing address should populate into the account shipping address.*/
    public static void myLogic(List<Account> acclist){
        for(Account ac : acclist){
            if(ac.BillingStreet != null)
                ac.ShippingStreet = ac.BillingStreet;
            if(ac.BillingCity != null)
                ac.ShippingCity = ac.BillingCity;
            if(ac.BillingCountry != null)
                ac.ShippingCountry = ac.BillingCountry;
            if(ac.BillingPostalCode != null)
                ac.ShippingPostalCode = ac.ShippingPostalCode;
        }
        
    }
    
    /*
* 2. Write a trigger on the Account when the Account is updated check all opportunities related to the account.
*  Update all Opportunities Stage to close lost
*  if an opportunity created date is greater than 30 days from today and stage not equal to close won.*/
    
    public static void UpdateOpportunity(Map<Id, Account> sendOppMap){
        List<Opportunity> getOppList = new List<Opportunity>();
        List<Opportunity> UpdateList = new List<Opportunity>();
        DateTime day30 = system.now().addDays(-30000);
        
        getOppList = [Select Id, Name, AccountId, StageName from Opportunity Where AccountId In: sendOppMap.keySet()
                      AND CreatedDate > :day30 AND StageName != 'Closed Won'];
        
        System.debug('OppList: '+getOppList.size());
        
        if(getOppList != null){
            for(Opportunity op: getOppList){
                op.StageName = 'Closed Lost';
                UpdateList.add(Op);
            }
        }
        try{
            if(UpdateList != null){
                update UpdateList;
            }
        }Catch(Exception ex){
            System.debug('Exception ex: '+ex.getMessage());
        }
    }
    
    /*
* 
* 3. Once an Account is inserted an email should go to the System Admin user with specified text below.
An account has been created and the name is “Account Name”.*/
    
        // 3. Send Email to System Admins on Account Creation
    public static void sendEmail(List<Account> acclist) {
        System.debug('acclist: ' + acclist);

        // Collect System Admin Emails
        List<String> adminEmails = new List<String>();
        for (User u : [
            SELECT Email 
            FROM User 
            WHERE Profile.Name = 'System Administrator'
            AND IsActive = TRUE
        ]) {
            if (u.Email != null) {
                adminEmails.add(u.Email);
            }
        }

        // Collect Account Names for the Email Body
        List<String> accountNames = new List<String>();
        for (Account acc : acclist) {
            accountNames.add(acc.LastName);
        }

        // Avoid Exceeding Email Limits
        if (!adminEmails.isEmpty() && !accountNames.isEmpty()) {
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setSenderDisplayName('Salesforce Notification');
            email.setSubject('New Account Created Notification');
            email.setToAddresses(adminEmails);
            email.setUseSignature(false);
            email.setBccSender(false);
            email.setSaveAsActivity(true);

            // Consolidate all Account Names into one email body
            String body = 'New Accounts have been created: <br>';
            for (String accName : accountNames) {
                body += '- ' + accName + '<br>';
            }
            email.setHtmlBody(body);

            // Send Email and Check for Exceptions
            try {
                Messaging.SendEmailResult[] results = Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{ email });
                if (results[0].success) {
                    System.debug('The email was sent successfully.');
                } else {
                    System.debug('The email failed to send: ' + results[0].errors[0].message);
                }
            } catch (Exception ex) {
                System.debug('Exception in Sending Email: ' + ex.getMessage());
            }
        }
    }

}