//@isTest   or testmethod we can call with both name

@isTest
public class test_01
{
    @isTest   
    static void testMe()
    {
        Example_Test_01 et=new Example_Test_01();
        
        et.setData();
        System.assertEquals('Banking',et.industry);
        System.assertEquals('Hot',et.rating);  
        
        et.m1();
        System.assertEquals('Banking',et.industry);
        System.assertEquals('Cold',et.rating);
        
        et.m2();
        System.assertEquals('Banking',et.industry);
		System.assertEquals('Warm',et.rating);   
    }
}