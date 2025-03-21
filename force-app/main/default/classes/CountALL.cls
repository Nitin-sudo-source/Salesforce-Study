public class CountALL
{
    public static void AfterUpdate(List<Contact> cclist)
    {
        Contact c=new Contact();
        if(trigger.isAfter && trigger.isInsert)
        {
            Account acc=new Account();
            acc.Id=c.AccountId;
            acc.Name=c.LastName;
            //acc=[Select id,Number_of_Detail__c From Account];
            system.debug('Sucessfully  Complete');
        }
    }
}