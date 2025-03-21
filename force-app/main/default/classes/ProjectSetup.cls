public class ProjectSetup 
{
    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProject()
    {
        List<Project__c> plist=[select Id, Name FROM Project__c];
        return plist;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Tower__c> getTower(String ProjectId)
    {
       // system.debug('Id'+ProjectId);
        List<Tower__c> tlist=[select Id, Name From Tower__c WHERE Project__r.id =: ProjectId];
        //system.debug('after query '+tlist);
        return tlist;
    }
    
   @AuraEnabled(cacheable=true)
    public static map<Decimal ,list<Unit__c>> getUnit(String TowerId){
        Map<Decimal,List<Unit__c>> Fetchdata = new Map<Decimal,List<Unit__c>>();
        list<Unit__c> unitList=[SELECT Id, Name , Floor__c , Tower__c FROM Unit__c  Where Tower__c =: TowerId];
        unitList.sort();
        system.debug(unitList);
        for(Unit__c units :unitList){
            Fetchdata.put(units.Floor__c ,unitList);
            if(Fetchdata.containsKey(units.Floor__c)){
                List<Unit__c> dataList = [select Name,Unit_Status__c,Configuration__c,Floor__c from Unit__c where Tower__c =: TowerId AND Unit__c.Floor__c =: units.Floor__c ];
                Fetchdata.put(units.Floor__c,dataList);
                system.debug('Floor='+units.Floor__c);
            }else {             
                Fetchdata.put(units.Floor__c,unitList);
            }
        }
           return Fetchdata;
      }
    }