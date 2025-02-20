public class Account_op_con_Test{
    public static void beforeInsert(List<Account> acclist){
        for(Account acc :acclist)
        {
            Contact con=new Contact(); 											//create contact
            con.LastName=acc.Name;
            con.AccountId=acc.Id;
            insert con;
            System.debug('insdie con'+con);
            
        }
        for(Account acc :acclist)
        {
            Opportunity opp=new Opportunity(); 											
            opp.Name=acc.Name;
            opp.AccountId=acc.Id;
            opp.StageName='Closed Won';
            opp.CloseDate=System.today();
            insert opp;
            System.debug('insdie con'+opp);
        }
        
    }

}