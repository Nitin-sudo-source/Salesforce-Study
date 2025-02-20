public class TestContactList 
{
    public static void listofcon()
    {
    	List<Contact> listcon = [SELECT FirstName ,LastName FROM Contact];
    
   		 for (Contact con: listcon)
   		 {
        		String Fullname='First Name: '+con.FirstName+'Last Name: '+con.LastName;
       		    System.debug(Fullname);
   		 }
	}
}