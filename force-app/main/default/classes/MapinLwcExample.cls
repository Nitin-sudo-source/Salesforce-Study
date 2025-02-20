public with sharing class MapinLwcExample {
    @AuraEnabled
    public static Map<string,string> fetchSimpleMap (){
        try {
            Map<string,string> simpleMap = new Map<string,string>();
            simpleMap.put('Fruits','Apple');
            simpleMap.put('Alchol','B7');
            return simpleMap;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Map<string,string>> fetchlistMap(){
        try {
            List<Map<string,string>> listMap = new List<Map<string,string>>();
            Map<string,string> simplemap1 = new Map<string,string>();
            simplemap1.put('Fruits','Apple');
            simplemap1.put('Alchol','B7');
            listMap.add(simplemap1);
            Map<string,string> simplemap2 = new Map<string,string>();
            simplemap2.put('Fruits','Mango');
            simplemap2.put('Alchol','RS');
            listMap.add(simplemap2);
            return listMap;            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Map<string,Map<string,string>> fetchnestedMap(){
        try {
            Map<string,Map<string,string>> nestedMap = new Map<string,Map<string,string>>();
            Map<String,String> simplemap1 = new Map<String,String>();
            simplemap1.put('Fruits','Apple');
            simplemap1.put('Alchol','B7');
            nestedMap.put('Map',simplemap1);
            return nestedMap;           
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    
}