public class TestConstant {
    static final Double regular=0.1;
    static Double finalprice =0;
    
    public static Double provideDiscount (Integer price){
        finalprice =price - price * regular ;
        return finalprice;
    }

}