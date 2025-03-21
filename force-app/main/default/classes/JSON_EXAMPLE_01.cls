public class JSON_EXAMPLE_01
{
    public String integerValue{set;get;}
    public String decimalValue{set;get;}
    public String accountValue{set;get;}
    public String integerPretty{set;get;}
    public String decimalPretty{set;get;}
    public String accountPretty{set;get;}
    public JSON_EXAMPLE_01()
    {
        integerValue=JSON.serialize(10);
        decimalValue=JSON.serialize(122.34);
        Account acc=new Account(Name='Wipro',Industry='Banking',Phone='12345');
        accountValue=JSON.serialize(acc);
        integervalue=JSON.serializePretty(25);
        decimalValue=JSON.serializePretty(45.88);
        integerPretty=JSON.serializePretty(55);
        decimalPretty=JSON.serializePretty(888.22);
        accountPretty=JSON.serializePretty(acc);
        

    }
}