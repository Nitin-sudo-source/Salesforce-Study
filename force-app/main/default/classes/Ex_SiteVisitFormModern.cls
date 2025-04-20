/**
 * @description       : 
 * @author            : nitinSFDC@exceller.SFDoc
 * @group             : 
 * @last modified on  : 22-03-2025
 * @last modified by  : nitinSFDC@exceller.SFDoc
**/
public with sharing class Ex_SiteVisitFormModern {
    public Ex_SiteVisitFormModern() {

    }
    @AuraEnabled(cacheable=true)
    public static List<String> getPicklistValues(String fieldName) {
        Schema.DescribeFieldResult fieldResult = Site_Visit__c.SObjectType.getDescribe().fields.getMap().get(fieldName).getDescribe();
        List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();
        List<String> picklistValues = new List<String>();

        for (Schema.PicklistEntry entry : picklistEntries) {
            picklistValues.add(entry.getLabel());
        }
        return picklistValues;
    }


    @AuraEnabled
    public static List<Project__c> getProjectList() {

        List<Project__c> projectList =  [SELECT Id, Name FROM Project__c];
        return projectList;
    }

}