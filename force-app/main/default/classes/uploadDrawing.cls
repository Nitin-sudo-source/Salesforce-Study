public class uploadDrawing {
    
    @AuraEnabled
    public static list<Drawing_Document__c> insertDocument(List<Map<String, Object>> records, List<String> filenames, List<String> base64DataList) {
        List<Drawing_Document__c> drawingDocuments = new List<Drawing_Document__c>();
        List<ContentVersion> cvList = new List<ContentVersion>();
        for(Integer i=0; i<records.size(); i++) {
            Map<String, Object> record = records[i];
            Drawing_Document__c drawingDocument = new Drawing_Document__c();
            drawingDocument.Name = (String) record.get('Name');
            drawingDocument.Opportunity__c = (Id) record.get('Opportunity__c');
            drawingDocument.Document_Type__c = (String) record.get('Document_Type__c');
            drawingDocuments.add(drawingDocument);
        }

        insert drawingDocuments;
        system.debug(drawingDocuments);
        
        for(Integer i=0; i<drawingDocuments.size(); i++) {
            String base64Data = base64DataList[i];
            String filename = filenames[i];
            
            base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
            ContentVersion cv = new ContentVersion();
            cv.Title = filename;
            cv.PathOnClient = '/' + filename;
            cv.FirstPublishLocationId = drawingDocuments[i].Id;
            cv.VersionData = EncodingUtil.base64Decode(base64Data);
            cv.IsMajorVersion = true;
            cvList.add(cv);
        }
      
        if(!cvList.isEmpty()) {
            insert cvList;
        }
      
        return drawingDocuments;
    }
}