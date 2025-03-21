public class AttachmentController {
    public Decimal attachmentCount {get;set;}
    public Id bId {get;set;}
    
    public AttachmentController(){
        bId = ApexPages.currentPage().getParameters().get('bId');
        system.debug('GetId:'+bId);
        attachmentCount = 1;
    }
    @RemoteAction
    public static Integer getAttachmentCount() {
        AttachmentController controller = new AttachmentController();
        return (Integer) controller.attachmentCount;
    }
   
    public void saveAttachments() {
        List<Attachment> attachments = new List<Attachment>();
        
        for (Integer i = 1; i <= attachmentCount.intValue(); i++) {
            Attachment attachment = new Attachment();
            attachment.Body = AttachmentController.getAttachmentBody('attachment' + i);
            attachment.Name = 'Attachment ' + i;
            attachment.ParentId = bId;
            system.debug(' attachment.ParentId'+ attachment.ParentId);
            
            attachments.add(attachment);
        }
        system.debug('attachments'+attachments);
        insert attachments;
        
        // Display success message or handle errors
    }
    
    public static Blob getAttachmentBody(String attachmentId) {
        String fileBodyString = EncodingUtil.base64Encode(Blob.valueOf('Placeholder')); 
        Blob fileBody = EncodingUtil.base64Decode(fileBodyString);
        return fileBody;
    }
}