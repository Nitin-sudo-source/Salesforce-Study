//Show Image IN LWc Without duplication

public class ShowFIleLWC {
    
    @AuraEnabled(cacheable=true)
    public static List<ContentDocumentLinkWrapper> fetchFiles(String objectName) {
        List<ContentDocumentLinkWrapper> result = new List<ContentDocumentLinkWrapper>();
        System.debug('result  '+result.size());
        
        try {
            List<Project__c> pList = [
                SELECT Id, Name
                FROM Project__c ORDER BY CreatedDate DESC
            ];
            
            if (!pList.isEmpty()) {
                Set<Id> pIds = new Set<Id>();
                for (Project__c pro : pList) {
                    pIds.add(pro.Id);
                }
                
                String query = 'SELECT ContentDocumentId, ContentDocument.Title, ContentDocument.FileType, ContentDocument.ContentSize, ContentDocument.LastModifiedDate, ContentDocument.CreatedDate, LinkedEntity.Type, ContentDocument.LatestPublishedVersionId,ContentDocument.LatestPublishedVersion.Title, LinkedEntity.Id FROM ContentDocumentLink WHERE LinkedEntityId IN :pIds';
                if (String.isNotBlank(objectName)) {
                    query += ' AND LinkedEntity.Type = \'' + objectName + '\'';
                }
                System.debug('Query::'+query);
                
                List<ContentDocumentLink> contentDocumentLinks = Database.query(query);
                Set<Id> processedContentDocumentIds = new Set<Id>();
                
                for (ContentDocumentLink cdl : contentDocumentLinks) {
                    if (!processedContentDocumentIds.contains(cdl.ContentDocumentId)) {
                        ContentDocumentLinkWrapper wrapper = new ContentDocumentLinkWrapper();
                        wrapper.contentDocumentId = cdl.ContentDocumentId;
                        wrapper.title = cdl.ContentDocument.LatestPublishedVersion.Title;
                        wrapper.fileType = cdl.ContentDocument.FileType;
                        wrapper.contentSize = cdl.ContentDocument.ContentSize;
                        wrapper.lastModifiedDate = cdl.ContentDocument.LastModifiedDate;
                        wrapper.createdDate = cdl.ContentDocument.CreatedDate;
                        wrapper.linkedEntityType = cdl.LinkedEntity.Type;
                        wrapper.contentVersionId = cdl.ContentDocument.LatestPublishedVersionId;
                        result.add(wrapper);
                        processedContentDocumentIds.add(cdl.ContentDocumentId);
                    }
                }
                System.debug('contentDocumentLinks::'+contentDocumentLinks);
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        System.debug('result  '+result);
        return result;
    }
    
    
    public class ContentDocumentLinkWrapper {
        @AuraEnabled
        public Id contentDocumentId { get; set; }
        
        @AuraEnabled
        public String title { get; set; }
        
        @AuraEnabled
        public String fileType { get; set; }
        
        @AuraEnabled
        public Integer contentSize { get; set; }
        
        @AuraEnabled
        public Datetime lastModifiedDate { get; set; }
        
        @AuraEnabled
        public Datetime createdDate { get; set; }
        
        @AuraEnabled
        public String linkedEntityType { get; set; }
        
        @AuraEnabled
        public String projectName { get; set; }
        
        @AuraEnabled
        public String projectId { get; set; }
        
        @AuraEnabled
        public String contentVersionId { get; set; }
        
        
    }    
    
}