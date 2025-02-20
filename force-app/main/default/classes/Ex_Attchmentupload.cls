public class Ex_Attchmentupload {

    public List<Attachment> attachcList {get;set;}
    public List<Attachment> attachcListToInsert {get;set;}
    public Integer rowNum { get; set; }
    public Decimal attachmentCount {get;set;}
    public Id bk {get;set;}
    public Integer numberOfAttachments {get;set;}
    public  Boolean hasValidAttachments {get;set;}
   
   
    public  Ex_Attchmentupload(){

        
        
        bk = System.currentPagereference().getParameters().get('id');
        system.debug('BKIDSS:: ' +bk);
        attachcList = new List<Attachment>();
        attachcListToInsert = new List<Attachment>();
        
        Attachment  attach = new Attachment();
        attach.ParentId = bk;
        attachcList.add(attach);
        
       
         /*  for(integer i=0; i<3; i++){
            Attachment  attach = new Attachment();
            attach.ParentId = bk;
            attachcList.add(attach);
           }*/
       
    }
   
       public void addRows(){
           for(Attachment attach1 : attachcList){
               system.debug('body:: ' +attach1.Body);
               system.debug('Name:: ' +attach1.Name);
               
           }
        Attachment attach = new Attachment();
        attachcList.add(attach);
        
        system.debug('attachcList :: '+attachcList);
        system.debug('attachcList size::'+attachcList.size());
       
    }
       
    public void rmvRows(){
        rowNum = Integer.valueOf(ApexPages.currentPage().getParameters().get('rowIndex'));
        system.debug('row number:: ' + rowNum);
        system.debug('Row Delete :: '+ attachcList[rowNum]);
        attachcList.remove(rowNum);
    }
   
   
   
    public Pagereference save(){
       
     Boolean hasInvalidAttachments = false;
       
     if(!attachcList.isEmpty()) {
            for(Attachment a : attachcList) {
                if(String.isNotBlank(a.name)){
                    attachcListToInsert.add(a);
                     hasInvalidAttachments = true;
                }
             }
        }
       
          if (hasInvalidAttachments == false){
          ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Please upload at least one document.'));
        return null;
       }
     
     if(!attachcListToInsert.isEmpty()){
         insert  attachcListToInsert;
     }
       
         /* if(bk != null){
           
            PageReference thankYouPage = Page.BookingLinkRecordSuccessResponse;
            thankYouPage.setRedirect(false);
            return thankYouPage;
           
        }*/
        return NULL;
    }
}