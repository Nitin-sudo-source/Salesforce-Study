@isTest
public class test_02 
{
    testmethod static void testMe()
    {
        Example_Test_02 et=new Example_Test_02();
        
        et.industry='Banking';
        et.m1();
        System.debug('Inside M1');
        
        System.assertEquals('Cold',et.rating);
        System.assertEquals('Public',et.ownership);
        
        et.industry='Energy';
        et.m1();
		System.assertEquals('Hot',et.rating);
       	System.assertEquals('Private',et.ownership);
        
    }

}