public class ObjectController {
    /*@AuraEnabled(cacheable=true)
    public static List<String> getObjectNames() {
        List<String> objectNames = new List<String>();
        
        // Query for object names
        for (Schema.SObjectType objType : Schema.getGlobalDescribe().values()) {
            objectNames.add(objType.getDescribe().getName());
        }
        
        return objectNames;
    }*/
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getObjectNamesAndApiNames() {
        Map<String, String> objectNamesAndApiNames = new Map<String, String>();
        
        // Query for object names and API names
        for (Schema.SObjectType objType : Schema.getGlobalDescribe().values()) {
            String objectName = objType.getDescribe().getName();
            String objectApiName = objType.getDescribe().getKeyPrefix();
            objectNamesAndApiNames.put(objectName, objectApiName);
        }
        
        return objectNamesAndApiNames;
    }

    
}