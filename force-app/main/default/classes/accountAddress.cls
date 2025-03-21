public class accountAddress {
    public static void accAddress(list<Account> acclist){
        for(Account acc : acclist){
            if(acc.BillingPostalCode != Null && acc.Match_Billing_Address__c == true){
                acc.ShippingPostalCode = acc.BillingPostalCode;
            }
            system.debug('==='+acc.ShippingPostalCode);
            system.debug('==='+acc.BillingPostalCode);
        }
    }
}