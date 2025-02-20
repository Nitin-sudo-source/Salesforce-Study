public class Ex_Practise01 {
    @AuraEnabled
    public static Boolean Save(String name, String email, String phone){
        Account acc = new Account();
        Id clinicRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Channel Partner').getRecordTypeId();
        acc.RecordTypeId = clinicRecordTypeId;
            acc.Name = name;
            //acc.LastName = name;  
            acc.Phone = phone;
      
        
        // acc.FirstName = name;
        //if(String.isNotBlank(email))
         //   acc.PersonEmail = email;
       
        
        acc.Active__c = 'Yes';
        acc.SLA__c = 'Gold';
        acc.SLAExpirationDate__c = System.today();
        acc.SLASerialNumber__c = '1';
        try{
            insert acc;
            System.debug('acc: '+ acc.Id);
        }catch(Exception ex){
            System.debug('Error: '+Ex.getMessage());
        }
        if(acc != null){
            return true;
        }else{
            return false;
        }
    }
    
       @AuraEnabled
    public static Blob generatePDF(String name, String email, String phone) {
        // Construct the HTML content for the PDF
        String htmlContent = '<html><body>' +
                             '<h2>Account Form</h2>' +
                             '<p><strong>Name:</strong> ' + name + '</p>' +
                             '<p><strong>Email:</strong> ' + email + '</p>' +
                             '<p><strong>Phone:</strong> ' + phone + '</p>' +
                             '</body></html>';
        
        // Create a PageReference instance for the Visualforce page
        PageReference pdfPage = Page.GeneratePDF;
        pdfPage.getParameters().put('htmlContent', EncodingUtil.urlEncode(htmlContent, 'UTF-8'));
        Blob pdfBlob = pdfPage.getContentAsPDF();
        return pdfBlob;
    }

}