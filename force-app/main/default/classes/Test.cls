public class Test {
    public Integer i;
    public Test(){
        i=1;
        if(i<5){
            ++i;
            i++;
            System.debug('Value of i'+i);
        }
    }
}