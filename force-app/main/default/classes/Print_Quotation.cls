public class Print_Quotation {
        public Id QID {get;set;}
        public Quotation__c  Qlist {get;set;}
    
    public Print_Quotation()
    {
          String QID = apexpages.currentPage().getparameters().get('QId');
          if(QId != null)
          {
              Qlist= [Select id,Name ,Agreement_Value__c ,Date__c ,GST_Amount__c ,Stamp_Duty_Registration__c ,
                      Other_Charges__c ,Total_Amount__c	from Quotation__c where Id=: QID];
          }

    }


}