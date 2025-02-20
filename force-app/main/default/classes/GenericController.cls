public without sharing class GenericController {
    @AuraEnabled
    public static List<ContentVersion> returnFiles(List<String> lstFileIds) {
        return [SELECT Id, Title FROM ContentVersion WHERE Id IN :lstFileIds];
    }

    @AuraEnabled
    public static List<Id> saveFiles(List<Lead> leadsToInsert) {
        system.debug('leadsToInsert'+leadsToInsert);
        List<Id> lstCntVerIds = new List<Id>();
        List<ContentVersion> lstVersionsToInsert = new List<ContentVersion>();
        
        for (Lead lead : leadsToInsert) {
            FileInfo fileData = (FileInfo)JSON.deserialize(JSON.serialize(lead), FileInfo.class);
            ContentVersion objCntVersion = new ContentVersion();
            objCntVersion.PathOnClient = fileData.Title;
            objCntVersion.Title = fileData.Title;
            
            if (fileData.VersionData != null) {
                objCntVersion.VersionData = fileData.VersionData;
                lstVersionsToInsert.add(objCntVersion);
            }
        }

        List<Database.SaveResult> res = Database.insert(lstVersionsToInsert);
        for (Database.SaveResult saveResult : res) {
            if (saveResult.isSuccess()) {
                lstCntVerIds.add(saveResult.getId());
            }
        }
        
        // Attach the files to the related Lead records
        List<Attachment> lstAttachments = new List<Attachment>();
        
        for (Lead lead : leadsToInsert) {
            for (ContentVersion version : lstVersionsToInsert) {
                Attachment attachment = new Attachment();
                attachment.Name = version.Title;
                attachment.Body = version.VersionData;
                attachment.ParentId = lead.Id;
                lstAttachments.add(attachment);
            }
        }
        
        if (!lstAttachments.isEmpty()) {
            insert lstAttachments;
        }
        
        return lstCntVerIds;
    }

    public class FileInfo {
        public String Title;
        public Blob VersionData;
    }
}