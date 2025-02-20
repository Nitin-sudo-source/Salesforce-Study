public class MultipleUploadController  
    {  /*   
        //Picklist of tnteger values to hold file count  
        public List<SelectOption> filesCountList {get; set;}  
        //Selected count  
        public String FileCount {get; set;}  
          
        public List<Attachment> allFileList {get; set;}  
          
        public MultipleUploadController(ApexPages.StandardController controller)  
        {  
            //Initialize    
            filesCountList = new List<SelectOption>() ;  
            FileCount = '' ;  
            allFileList = new List<Attachment>() ;  
              
            //Adding values count list - you can change this according to your need  
            for(Integer i = 1 ; i < 11 ; i++)  
                filesCountList.add(new SelectOption(''+i , ''+i)) ;  
        }  
          
        public Pagereference SaveAttachments()  
        {  
            String accId = System.currentPagereference().getParameters().get('Id');  
            if(accId == null || accId == '')  
                ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.ERROR,'No record is associated. Please pass record Id in parameter.'));  
            if(FileCount == null || FileCount == '')  
                ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.ERROR,'Please select how many files you want to upload.'));  
      
            List<Attachment> listToInsert = new List<Attachment>() ;  
              
            //Attachment a = new Attachment(parentId = accid, name=myfile.name, body = myfile.body);  
            for(Attachment a: allFileList)  
            {  
                if(a.name != '' && a.name != '' && a.body != null)  
                    listToInsert.add(new Attachment(parentId = '00Q2v00001mZnreEAC', name = a.name, body = a.body)) ;  
            }  
              
            //Inserting attachments  
            if(listToInsert.size() > 0)  
            {  
                insert listToInsert ;  
                ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.INFO, listToInsert.size() + ' file(s) are uploaded successfully'));  
                FileCount = '' ;  
            }  
            else  
                ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.ERROR,'Please select at-least one file'));  
                  
            return null;  
        }  
          
        public PageReference ChangeCount()  
        {  
            allFileList.clear() ;  
            //Adding multiple attachments instance  
            for(Integer i = 1 ; i <= Integer.valueOf(FileCount) ; i++)  
                allFileList.add(new Attachment()) ;  
            return null ;  
        }  */
   /* public List<SelectOption> filesCountList { get; set; }
    public String FileCount { get; set; }
    public Id parentId { get; set; }

    public MultipleUploadController(ApexPages.StandardController controller) {
        filesCountList = new List<SelectOption>();
        FileCount = '';
        parentId = controller.getId();

        for (Integer i = 1; i < 11; i++) {
            filesCountList.add(new SelectOption(String.valueOf(i), String.valueOf(i)));
        }
    }

    public Pagereference SaveAttachments() {
        if (String.isBlank(FileCount)) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Please select the number of files you want to upload.'));
            return null;
        }

        List<ContentVersion> contentVersions = new List<ContentVersion>();

        for (Integer i = 1; i <= Integer.valueOf(FileCount); i++) {
            ContentVersion contentVersion = new ContentVersion();
            contentVersion.Title = 'File ' + i;
            contentVersion.PathOnClient = 'File' + i + '.txt'; // Replace with the actual file path on the client
            contentVersion.VersionData = Blob.valueOf('Sample file content'); // Replace with the actual file content

            contentVersions.add(contentVersion);
        }

        insert contentVersions;

        List<ContentDocumentLink> documentLinks = new List<ContentDocumentLink>();

        for (ContentVersion contentVersion : contentVersions) {
            ContentDocumentLink documentLink = new ContentDocumentLink();
            documentLink.ContentDocumentId = contentVersion.ContentDocumentId;
            documentLink.LinkedEntityId = parentId;
            documentLink.ShareType = 'V'; // Set the sharing access to 'V' for Viewer access

            documentLinks.add(documentLink);
        }

        insert documentLinks;

        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.INFO, contentVersions.size() + ' file(s) were uploaded successfully.'));
        FileCount = '';

        return null;
    }

    public PageReference ChangeCount() {
        FileCount = '';

        return null;
    }*/
}