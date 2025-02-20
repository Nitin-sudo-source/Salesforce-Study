public class Case_ex
{
    public static void beforeInsert(List<Case> cases)
    {
        for(Case c: cases)
        if(c.origin=='Email')
		{
			c.status='Working';
            System.debug('Inside Status');
			c.Priority='Medium';
            System.debug('Inside Medium'); 
		}
    }

}