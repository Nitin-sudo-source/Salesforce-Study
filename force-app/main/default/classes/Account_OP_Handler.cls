public class Account_OP_Handler {
    public static void AfterInsert(List<Account> acclist){
    List<Contact> clist=new List<Contact>();
    List<Opportunity> opList=new List<Opportunity>();
     Set<Id> accIds=new Set<Id>();  

       for(Account acc :acclist)
        {
            //contact
            Contact con=new Contact();
            con.LastName=acc.Name;
            con.AccountId=acc.Id;
            clist.add(con);
                    
            Opportunity opp=new Opportunity(); 											
            opp.Name=acc.Name;
            opp.AccountId=acc.Id;
            opp.StageName='Closed Won';
            opp.CloseDate=System.today();
            oplist.add(opp);
        }
    insert clist;  
    insert oplist;

        }
    }