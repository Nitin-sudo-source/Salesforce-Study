public class SearchPageLwc {
    @AuraEnabled
    public static Map<String,List<SObject>> searchRecords(String Mobile, String Email){
        Map<String ,List<SObject>> searchMap = new Map<String ,List<SObject>>();
        List<Account> accList  = new List<Account>();
        List<Opportunity> oppList = new List<Opportunity>();
        List<Lead> ldList = new List<Lead>();
        if(Mobile != null){
            accList = [Select Id, Name, PersonMobilePhone, Phone, PersonEmail, Owner.Name from Account 
                       where (PersonMobilePhone =: Mobile OR Phone =: Mobile) AND IsPersonAccount = true];
            system.debug('accList: '+accList);
            if(!accList.isEmpty()) {
                // isAccount = true;
                searchMap.put('Account',accList);
                oppList = [Select Id, Name, Owner.Name from Opportunity
                           where AccountId =: accList[0].Id];
                system.debug('oppList: '+oppList);
                
                if(oppList != null){
                    // isOpp = true;
                    searchMap.put('Opportunity',oppList);
                    // ldList = [Select Id, Name from Lead where (Phone =: Mobile OR Phone =: Mobile)];
                    // system.debug('ldList: '+ldList);
                }
                
            }else{
                if(Email != Null && Email != '') {
                    accList = [Select Id, Name, PersonMobilePhone, Phone, PersonEmail, Owner.Name from Account 
                               where (PersonEmail =: Email /*OR Alternate_Email_Id__c =: Email*/) AND IsPersonAccount = true];
                    system.debug('accList: '+accList);
                    
                    if(!accList.isEmpty()) {
                        // isAccount = true;
                        searchMap.put('Account',accList);
                        oppList = [Select Id, Name, Owner.Name from Opportunity  where AccountId =: accList[0].Id ];
                        system.debug('oppList: '+oppList);
                        
                        if(!oppList.isEmpty()) {
                            // isOpp = true;
                            searchMap.put('Opportunity',oppList);
                        }
                    }
                } 
            }
            if(oppList.isEmpty()) {
                ldList = [Select Id, Name, MobilePhone, Phone, Email,  Owner.Name from Lead 
                          where (MobilePhone =: Mobile OR Phone =: Mobile) AND IsConverted = false];
                system.debug('leadList: '+ldList);
                
                if(!ldList.isEmpty()) {
                    // isLead = true;
                    searchMap.put('Lead',ldList);
                } else {
                    if(Email != Null && Email != '') {
                        ldList = [Select Id, Name, MobilePhone, Phone, Email, Owner.Name from Lead
                                  where (Email =: Email OR Email =: Email) AND IsConverted = false];
                        system.debug('ldList: '+ ldList);
                        
                        if(!ldList.isEmpty()) {
                            // isLead = true;
                            searchMap.put('Lead',ldList);
                        }
                    }
                }
            }
        }
        if(!searchMap.isEmpty() && searchMap != null){
            return searchMap;
        }else{
            return null;
        }
    }
    
    @AuraEnabled
    public static siteVisitWrapper getSv(String leadId, String OppId){
        System.debug('leadId: '+leadId);
        System.debug('OppId: '+OppId);
        siteVisitWrapper s = new siteVisitWrapper();
        if(String.isNotBlank(leadId) && leadId != ''){
            Lead lead = [Select Id, Channel_Partner__c, Master_Source__c from Lead where Id =: leadId];
            if(lead != null){
             s.sv.Master_Source__c = lead.Master_Source__c;
             s.sv.Channel_Partner__c = lead.Channel_Partner__c ;
             return s;
            }else{
                return s;
            }
        }else{
              return s;
        }
    }

    
    public class siteVisitWrapper{
        @AuraEnabled
        public Site_Visit__c sv {get;set;}
        
        public siteVisitWrapper(){
            sv = new Site_Visit__c();
        }
    }
    
     @AuraEnabled
     public static List<Account> getCPAccount(String cpName) {
        Id cpRecordTypeId = Schema.SobjectType.Account.getRecordTypeInfosByName().get('Channel Partner').getRecordTypeId();
        List<Account> cpList = new List<Account>();
        String QueryString =  'Select Id, Name, Phone from Account where (Name LIKE \''+ cpName +'%\' OR Phone LIKE \''+ cpName +'%\' ) AND RecordTypeId =: cpRecordTypeId ';
        cpList = Database.query(QueryString);
        system.debug('cpList: '+cpList);
        
        if(!cpList.isEmpty() && cpList != null){
           return cpList;
        }else{
            return null;
        }
        
    }
    
    @AuraEnabled
    public static void submit(siteVisitWrapper svWrapper, String leadId, String oppId, String accId) {
        System.debug('svWrapper: '+svWrapper);
        System.debug('leadId: '+leadId);
        System.debug('oppId: '+oppId);
        System.debug('accId: '+accId);
        Boolean isAccountFound = false;
        Boolean isLeadFound = false;
        Boolean isOppFound = false;
        String mobile = '';
        List<Account> accList = new List<Account>();
        List<Opportunity> oppList = new List<Opportunity>();
        List<Lead> leadList = new List<Lead>();
        
        if(svWrapper.sv.Mobile__c != Null && !String.isBlank(svWrapper.sv.Mobile__c)) {
            mobile = svWrapper.sv.Mobile__c; 
        }
        
        
        Site_Visit__c sv = new Site_Visit__c();
        sv.Mobile__c = svWrapper.sv.Mobile__c;
        sv.First_Name__c = svWrapper.sv.First_Name__c;
        sv.Project__c = svWrapper.sv.Project__c;
        sv.Last_Name__c = svWrapper.sv.Last_Name__c;
        sv.Country__c = svWrapper.sv.Country__c;
        sv.State__c = svWrapper.sv.State__c;
        sv.City__c = svWrapper.sv.City__c;
        sv.Street__c = svWrapper.sv.Street__c;
        // insert sv;
        // System.debug('sv: '+sv.Id);
        // return leadId;
        if(accId != Null && String.isNotBlank(accId)) {
            accList = [Select Id, Salutation, FirstName, LastName, PersonMobilePhone, Phone, PersonEmail,
                       BillingCity, BillingState, BillingCountry, BillingPostalCode from Account
                       where Id =: accId AND IsPersonAccount = true];
            system.debug('accList: '+accList);
            if(!accList.isEmpty() && accList != null){
                isAccountFound = true;
            }
            oppList = [Select Id, Name, AccountId from Opportunity where AccountId =: accList[0].Id ]; // AND Project__c =: pList[0].Id AND IsActive = true
            system.debug('oppList: '+oppList);
            
            if(!oppList.isEmpty() && oppList != null) {
                isOppFound = true;
            }
        }else{
            if(leadId != Null && String.isNotBlank(leadId)) {
                leadList = [Select Id from Lead where Id =: leadId];
                if(!leadList.isEmpty() && leadList != null){
                    isLeadFound = true;
                }
            }
        }
        
        // main logic start
        if(isAccountFound) {
            if(isOppFound && !isLeadFound) {
                try {
                    //Create Site Visit
                    sv.Opportunity__c = oppList[0].Id;
                    
                    /*if(oppList1[0].Site_Visit_Count__c == Null || oppList1[0].Site_Visit_Count__c == 0) {
sv.Site_Visit_Count__c = 1;
if(oppList1[0].Lead_Source__c != sv.Lead_Source__c) {
sv.Is_Source_Conflict__c = 'Yes';
}
} else {
sv.Site_Visit_Count__c = oppList1[0].Site_Visit_Count__c + 1;
}*/
                    insert sv;
                    
                    //Update Opportunity
                    //  oppList[0].Site_Visit_Count__c = oppList1[0].Site_Visit_Count__c + 1;
                    //  oppList[0].Last_SV_Date__c = system.now();
                    //  update oppList1[0];
                    
                   // List<Site_Visit__c> lstSV = [Select Id, Name from Site_Visit__c where Id =: sv.Id];
                    system.debug('lstSV Message: '+sv.Id);
                    
                } catch(Exception ex) {
                    system.debug('Error: '+ex);
                }
            }else if(!isOppFound && !isLeadFound) {
                try {
                    Opportunity op = new Opportunity();
                    op.AccountId = accList[0].Id;
                    /* if(sv.First_Name__c != Null)
// op.First_Name__c = sv.First_Name__c;
else 
//  op.First_Name__c = '';
if(sv.Last_Name__c != Null)
op.Last_Name__c = sv.Last_Name__c;
else
op.Last_Name__c = '';
// op = sv.Mobile__c;
op.Name = op.First_Name__c +' '+ op.Last_Name__c;
//  op.Email__c = sv.Email__c;
op.Project__c = pList[0].Id;
op.Stage__c = 'In Follow-up';
op.Lead_Source__c = sv.Lead_Source__c;
op.Sub_Source__c = sv.Sub_Source__c;
// op.Sub_Source__c = sv.Sub_Source__c;
if(sv.Lead_Source__c == 'Referral (Nishtha)'){
if(sv.Lead_Source__c == 'Booked Clients Reference')
op.Referrer_Name__c = op.Referrer_Name__c;
}else if(sv.Lead_Source__c == 'Channel Partner'){
op.Channel_Partner__c = op.Channel_Partner__c;
}
op.Budget__c = sv.Budget__c;
op.Buying_Purpose__c = sv.Buying_Purpose__c;
op.Configuration_Required__c = sv.Configuration_Required__c;
op.Possession_Timeframe_Required__c = sv.Possession_Timeframe_Required__c;
op.Current_Residence_Configuration__c= sv.Current_Residence_Configuration__c;
op.Site_Visit_Count__c = 1;
op.Last_SV_Date__c = system.now();*/
                    insert op;
                    
                    sv.Opportunity__c = op.id;
                    //  sv.Site_Visit_Date__c = system.now();
                    //  sv.Site_Visit_Count__c = 1;
                    insert sv;
                    
                   // List<Site_Visit__c> lstSV = [Select Id, Project__c, Name, ownerId from Site_Visit__c where Id =: sv.Id];
                    /* if(flagQR == 'true') {
lstSV[0].ownerId = pList[0].Site_Visit_QR_Assignment__c;
system.debug('SV ownerId: '+ lstSV[0].ownerId);
update lstSV[0];
}*/
                    // isSuccess = true;
                    // message = 'Thank You! Site visit number is '+ lstSV[0].Name;
                    system.debug('lstSV Message: '+sv.Id);
                } catch(Exception ex) {
                    system.debug('Error: '+ex.getMessage());
                    
                }
            }
        }else {
            system.debug('Test');
            if(isLeadFound && !isAccountFound){
                try{
                    System.debug('Inside Lead Found:'+leadList);
                    /* if(leadList[0].Project__c != pList[0].Id)
leadList1[0].Project__c = pList[0].Id;
leadList1[0].Stage__c = 'Visit Done';
update leadList1[0];*/
                    
                    //   Ex_LeadConversionServices.convertLead(leadList1);
                    Database.LeadConvert lc = new Database.LeadConvert();
                    lc.setLeadId(leadList[0].id);
                    LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus where IsConverted = true LIMIT 1];
                    lc.setConvertedStatus(convertStatus.MasterLabel);
                    Database.LeadConvertResult lcr = Database.convertLead(lc);
                    system.debug('Converted Lead: '+lcr);
                    
                    
                    Lead convertedLead = [Select ConvertedAccountId, ConvertedOpportunityId from Lead where Id = :leadList[0].Id ];
                    system.debug('Converted Lead: '+convertedLead);
                    
                    Opportunity convertedOpp = [SELECT Id, Name from Opportunity where Id =: convertedLead.ConvertedOpportunityId];
                    system.debug('Converted Opportunity: '+convertedOpp);
                    
                    //Tag Site Visit Against Opportunity
                    sv.Opportunity__c = convertedOpp.Id;
                    // sv.Site_Visit_Date__c = system.Today(); //PP
                    // sv.Site_Visit_Count__c = 1;
                    insert sv;
                    
                    //Update Opportunity
                    //  convertedOpp.Site_Visit_Count__c = 1;
                    //  convertedOpp.Proposed_Visit_Date__c = system.now();
                    //  convertedOpp.Last_SV_Date__c = system.now(); //PP
                    // convertedOpp.First_Visit_Date__c = system.today();
                    //  update convertedOpp;
                    
                   // List<Site_Visit__c> lstSV = [Select Id, Name from Site_Visit__c where Id =: sv.Id];
                    system.debug('Success Message: '+ sv.Id);
                    
                }catch(Exception ex) {
                    system.debug('Error: '+ex.getMessage());
                }
                
            } else if(!isLeadFound && !isAccountFound) {
                try{
                    Lead l = new Lead();
                    l.FirstName = 'John';
                    l.LastName = 'Doe';
                    l.Company = 'ABC Corp';
                    l.Title = 'Manager';
                    l.Phone = '123-456-7890';
                    l.Email = 'john.doe@example.com';
                    
                    /* l.Sub_Source__c = sv.Sub_Source__c;
if(sv.Lead_Source__c == 'Referral (Nishtha)'){
if(sv.Lead_Source__c == 'Booked Clients Reference')
l.Referrer_Name__c = sv.Referrer_Name__c;
}else if(sv.Lead_Source__c == 'Channel Partner'){
l.Channel_Partner__c = sv.Channel_Partner__c;
}
l.Current_Residence_Configuration__c = sv.Current_Residence_Configuration__c;
l.Configuration_Required__c = sv.Configuration_Required__c;
l.Budget__c = sv.Budget__c;
l.Buying_Purpose__c = sv.Buying_Purpose__c;
l.Possession_Timeframe_Required__c = sv.Possession_Timeframe_Required__c;
l.Stage__c = 'Visit Done';*/
                    l.OwnerId = UserInfo.getUserId();
                    system.debug('UserInfo'+l.OwnerId );
                    insert l;
                    /* if(flagQR == 'true') {
l.OwnerId = pList[0].Site_Visit_QR_Assignment__c;
update l;
}*/
                    
                    List<Lead> lList = new List<Lead>();
                    lList.add(l);
                    //   Ex_LeadConversionServices.convertLead(lList);
                    Database.LeadConvert lc = new Database.LeadConvert();
                    lc.setLeadId(lList[0].id);
                    LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus where IsConverted = true LIMIT 1];
                    lc.setConvertedStatus(convertStatus.MasterLabel);
                    Database.LeadConvertResult lcr = Database.convertLead(lc);
                    system.debug('Converted Lead: '+lcr);
                    
                    
                    Lead convertedLead = [Select ConvertedAccountId, ConvertedOpportunityId from Lead where Id = :lList[0].Id ];
                    system.debug('Converted Lead: '+convertedLead);
                    
                    Opportunity convertedOpp = [SELECT Id, Name from Opportunity where Id =: convertedLead.ConvertedOpportunityId];
                    system.debug('Converted Opportunity: '+convertedOpp);
                    
                    //Tag Site Visit Against Converted Opportunity
                    sv.Opportunity__c = convertedOpp.Id;
                    // sv.Site_Visit_Date__c = system.now();
                    // sv.Site_Visit_Count__c = 1;
                    insert sv;
                    
                    //Update Opportunity
                    // convertedOpp.Site_Visit_Count__c = 1;
                    // convertedOpp.Last_SV_Date__c = system.now();
                    
                  //  update convertedOpp;
                    
                   // List<Site_Visit__c> lstSV = [Select Id, Name, ownerId from Site_Visit__c where Id =: sv.Id];
                    /*if(flagQR == 'true') {
lstSV[0].ownerId = pList[0].Site_Visit_QR_Assignment__c;
system.debug('SV ownerId: '+ lstSV[0].ownerId);
update lstSV[0];
}*/
                    system.debug('Success Message: '+ sv.Id);
                } catch(Exception ex) {
                    system.debug('Exception: '+ex.getMessage());
                }
            }
        }
    }
}

/*
  public void submit() {
        system.debug('InsideSubmit');
       // Account cpAccount = new Account();
        isAccountFound = false;
        isLeadFound = false;
        isOppFound = false;
        isSignatureDone = false;
        
         if(String.isNotBlank(cpName) && cpName != '') {
            List<Account> cpList = new List<Account>();
            Id cpRecordTypeId = Schema.SobjectType.Account.getRecordTypeInfosByName().get('Channel Partner').getRecordTypeId();
            String[] tokens = cpName.split('-');
            Integer tokenCount = tokens.size();
            for (Integer j = 0; j < tokenCount; j++) {
                System.debug('tokens-'+j+': '+tokens[j]);
            }
            cpList = [Select Id, Name, Phone,CP_Code__c, OwnerId from Account where Name =: tokens[0] AND RecordTypeId =: cpRecordTypeId];
            system.debug('cpList: '+cpList);
            
            if(!cpList.isEmpty() && cpList != null) {
                sv.Channel_Partner__c =  cpList[0].Id;
            }
        }
        
      
        
        if(mobile != Null && !String.isBlank(mobile)) {
            accList1 = [Select Id, Salutation, FirstName, LastName, PersonMobilePhone, Phone, PersonEmail, Alternate_Email__c, 
                        House_No__c, Building__c, BillingStreet, Locality__c,Residence_City__c, Office_Location__c, Zone__c, BillingCity, BillingState, BillingCountry, BillingPostalCode,
                        Designation__c,Household_Income__c,Industry,Family_Size__c,Ethnicity__c,Highest_Education__c, Occupation__c, Other_Occupation__c, Company_Name__c ,  Martial_Status__c, Age__c, Gender__c
                        from Account
                        where (PersonMobilePhone =: mobile OR Phone =: mobile) AND IsPersonAccount = true];
            system.debug('accList1: '+accList1);
            
            if(!accList1.isEmpty()) {
                isAccountFound = true;
                isSignatureDone = true;
                
                oppList1 = [Select Id, Name, Project__c, Last_SV_Date__c, Site_Visit_Count__c, Presales_Manager__c,  Referrer_Name__c, Referrer_Name__r.PersonMobilePhone,Referrer_Name__r.Name,Sub_Source_Details__c, Master_Source__c,Source_of_Finance_Source_of_Finance__c,  Channel_Partner__r.CP_Code__c,Last_Source_Changed_By__c,Last_SV_attended_by__c, Is_SourceChanged__c,Locations__c
                            Lead_Source__c, Sub_Source__c,  OwnerId, Source_of_Finance__c,Channel_Partner__r.CP_Code__c,
                            Channel_Partner__c, Channel_Partner__r.Name, Channel_Partner__r.Phone,
                            Channel_Partner__r.Firm_Name__c, Channel_Partner__r.MahaRERA_Registration_No__c,  Project_Type__c, 
                            Management_Name__c,Referrer_Name__c,
                            Current_Residence_Configuration__c, Configuration_Required__c, Budget__c, Buying_Purpose__c, Possession_Timeframe_Required__c,  Comments__c 
                            from Opportunity__c
                            where Account__c =: accList1[0].Id AND Project__c =: pList[0].Id AND Is_Active__c = true];
                system.debug('oppList1: '+oppList1);
                
                if(!oppList1.isEmpty()) {
                    isOppFound = true;
                }
            } else {
                if(email != Null && !String.isBlank(email)) {
                    accList1 = [Select Id, Salutation, FirstName, LastName, PersonMobilePhone, Phone, PersonEmail, Alternate_Email__c, 
                                House_No__c, Building__c, BillingStreet, Locality__c,Residence_City__c, BillingCity, BillingState, BillingCountry, BillingPostalCode,
                                Designation__c,Household_Income__c,Industry,Family_Size__c,Ethnicity__c,Highest_Education__c, Occupation__c, Other_Occupation__c, Company_Name__c ,  Martial_Status__c, Age__c, Gender__c
                                from Account
                                where (PersonEmail =: email OR Alternate_Email__c =: email) AND IsPersonAccount = true];
                    system.debug('accList1: '+accList1);
                    
                    if(!accList1.isEmpty()) {
                        isAccountFound = true;
                        isSignatureDone = true;
                        
                        oppList1 = [Select Id, Name, Project__c, Last_SV_Date__c, Site_Visit_Count__c, Presales_Manager__c,  Referrer_Name__c, Referrer_Name__r.PersonMobilePhone, Referrer_Name__r.Name,Master_Source__c,  Sub_Source_Details__c,Source_of_Finance_Source_of_Finance__c,  Channel_Partner__r.CP_Code__c,Last_Source_Changed_By__c,Last_SV_attended_by__c, Is_SourceChanged__c,Locations__c
                                    Lead_Source__c, Sub_Source__c,  OwnerId, Source_of_Finance__c,Channel_Partner__r.CP_Code__c,
                                    Channel_Partner__c, Channel_Partner__r.Name, Channel_Partner__r.Phone,First_Name__c,Last_Name__c,
                                    Channel_Partner__r.Firm_Name__c, Channel_Partner__r.MahaRERA_Registration_No__c,  Project_Type__c, 
                                    Management_Name__c,Referrer_Name__c,
                                    Current_Residence_Configuration__c, Configuration_Required__c, Budget__c, Buying_Purpose__c, Possession_Timeframe_Required__c,  Comments__c 
                                    from Opportunity__c
                                    where Account__c =: accList1[0].Id AND Project__c =: pList[0].Id AND Is_Active__c = true];
                        system.debug('oppList1: '+oppList1);
                        
                        if(!oppList1.isEmpty()) {
                            isOppFound = true;
                        }
                    }
                }
            }
            
            if(oppList1.isEmpty()) {
                leadList1 = [Select Id, Name, Salutation__c, Campaign_Code__c,First_Name__c, Last_Name__c, Mobile__c, Phone__c, Email__c, Alternate_Email_Id__c, Project__c, Campaign__c,
                             House_No__c, Building__c, Street__c, Locality__c, City__c, Office_Location__c, Zone__c,State__c, Country__c, PostalCode__c, Age__c,Gender__c,Management_Name__c,
                             Designation__c, Occupation__c, Other_Occupation__c, Company_Name__c,Martial_Status__c,Actual_Budget_in_Lakhs__c,Channel_Partner__r.CP_Code__c,
                             Lead_Source__c, Sub_Source__c, Stage__c, Sub_Stage__c, Substage_Reason__c, OwnerId,Highest_Education__c,Ethnicity__c,Industry__c,Family_Size__c, Current_Resident_Status__c,Household_Income__c,
                             Channel_Partner__c, Channel_Partner__r.Name, Channel_Partner__r.Phone, Referrer_Name__c, Referrer_Name__r.PersonMobilePhone,Referrer_Name__r.Name,   Sub_Source_Details__c, Master_Source__c,Channel_Partner__r.CP_Code__c,UTM_Source__c,Name__c,Locations__c
                             Channel_Partner__r.Firm_Name__c, Channel_Partner__r.MahaRERA_Registration_No__c, Presales_Call_Count__c, Presale_Date_of_Visit__c,Presale_Next_Follow_up_Date__c,Last_Presales_Call_Status__c, Presales_Comment_History__c,
                             Last_Presale_Call_Date__c,UTM_Medium__c,  Last_Presale_Call_Comment__c,Referrer_Name__c,
                             Current_Residence_Configuration__c, Configuration_Required__c, Budget__c, Buying_Purpose__c, Possession_Timeframe_Required__c, Comments__c
                             from Lead__c
                             where (Mobile__c =: mobile OR Phone__c =: mobile) AND IsConverted__c = false];
                system.debug('leadList1: '+leadList1);
                
                if(!leadList1.isEmpty()) {
                    isLeadFound = true;
                } else {
                    if(email != Null && !String.isBlank(email)) {
                        leadList1 = [Select Id, Name, Salutation__c, Campaign_Code__c,First_Name__c, Last_Name__c, Mobile__c, Phone__c, Email__c, Alternate_Email_Id__c, Project__c, Campaign__c,
                                     House_No__c, Building__c, Street__c, Locality__c, City__c,Office_Location__c, Zone__c, State__c, Country__c, PostalCode__c, Age__c,Gender__c,Management_Name__c,
                                     Designation__c, Occupation__c, Other_Occupation__c, Company_Name__c,Martial_Status__c,Actual_Budget_in_Lakhs__c,Channel_Partner__r.CP_Code__c,
                                     Lead_Source__c, Sub_Source__c, Stage__c, Sub_Stage__c, Substage_Reason__c, OwnerId,Highest_Education__c,Ethnicity__c,Industry__c,Family_Size__c, Current_Resident_Status__c,Household_Income__c,
                                     Channel_Partner__c, Channel_Partner__r.Name, Channel_Partner__r.Phone,  Referrer_Name__c, Referrer_Name__r.PersonMobilePhone, Referrer_Name__r.Name, Sub_Source_Details__c, Master_Source__c,Channel_Partner__r.CP_Code__c,UTM_Source__c,Name__c,Locations__c
                                     Channel_Partner__r.Firm_Name__c, Channel_Partner__r.MahaRERA_Registration_No__c, Presales_Call_Count__c, Presale_Date_of_Visit__c,Presale_Next_Follow_up_Date__c,Last_Presales_Call_Status__c, Presales_Comment_History__c,
                                     Last_Presale_Call_Date__c,UTM_Medium__c,  Last_Presale_Call_Comment__c,Referrer_Name__c,
                                     Current_Residence_Configuration__c, Configuration_Required__c, Budget__c, Buying_Purpose__c, Possession_Timeframe_Required__c, Comments__c
                                     from Lead__c
                                     where (Email__c =: email OR Alternate_Email_Id__c =: email) AND Project__c =: pList[0].Id AND IsConverted__c = false];
                        system.debug('leadList1: '+leadList1);
                        
                        if(!leadList1.isEmpty()) {
                            isLeadFound = true;
                        }
                    }
                }
            }
        }
        
        if(isAccountFound) {
            if(isOppFound && !isLeadFound) {
                try {
                    //Create Site Visit
                    sv.Opportunity__c = oppList1[0].Id;
                    //sv.Opportunity__r.Last_sv_attended_By__c = UserInfo.getUserId();
                    sv.Site_Visit_Date__c = system.now();
                    
                    if(oppList1[0].Site_Visit_Count__c == Null || oppList1[0].Site_Visit_Count__c == 0) {
                        sv.Site_Visit_Count__c = 1;
                        if(oppList1[0].Lead_Source__c != sv.Lead_Source__c) {
                            sv.Is_Source_Conflict__c = 'Yes';
                        }
                    } else {
                        sv.Site_Visit_Count__c = oppList1[0].Site_Visit_Count__c + 1;
                    }
                    insert sv;
                    
                    //Update Opportunity
                    oppList1[0].Site_Visit_Count__c = oppList1[0].Site_Visit_Count__c + 1;
                    oppList1[0].Last_SV_Date__c = system.now();
                    update oppList1[0];
                    
                    List<Site_Visit__c> lstSV = [Select Id, Name from Site_Visit__c where Id =: sv.Id];
                    isSuccess = true;
                    message = 'Site Visit Number is '+ lstSV[0].Name;
                    system.debug('Success Message: '+message);
                } catch(Exception ex) {
                    system.debug('Error: '+ex);
                    isRunError = true;
                    message = 'Error ' +ex.getMessage(); 
                }
            } else if(!isOppFound && !isLeadFound) {
                try {
                    Opportunity__c op = new Opportunity__c();
                    op.Account__c = accList1[0].Id;
                    
                    if(sv.First_Name__c != Null)
                        op.First_Name__c = sv.First_Name__c;
                    else 
                        op.First_Name__c = '';
                    if(sv.Last_Name__c != Null)
                        op.Last_Name__c = sv.Last_Name__c;
                    else
                        op.Last_Name__c = '';
                   // op = sv.Mobile__c;
                    op.Name = op.First_Name__c +' '+ op.Last_Name__c;
                  //  op.Email__c = sv.Email__c;
                    op.Project__c = pList[0].Id;
                    op.Stage__c = 'In Follow-up';
                    op.Lead_Source__c = sv.Lead_Source__c;
                    op.Sub_Source__c = sv.Sub_Source__c;
                   // op.Sub_Source__c = sv.Sub_Source__c;
                    if(sv.Lead_Source__c == 'Referral (Nishtha)'){
                        if(sv.Lead_Source__c == 'Booked Clients Reference')
                         op.Referrer_Name__c = op.Referrer_Name__c;
                    }else if(sv.Lead_Source__c == 'Channel Partner'){
                         op.Channel_Partner__c = op.Channel_Partner__c;
                    }
                    op.Budget__c = sv.Budget__c;
                    op.Buying_Purpose__c = sv.Buying_Purpose__c;
                    op.Configuration_Required__c = sv.Configuration_Required__c;
                    op.Possession_Timeframe_Required__c = sv.Possession_Timeframe_Required__c;
                    op.Current_Residence_Configuration__c= sv.Current_Residence_Configuration__c;
                    op.Site_Visit_Count__c = 1;
                    op.Last_SV_Date__c = system.now();
                    insert op;
                    
                    sv.Opportunity__c = op.id;
                    sv.Site_Visit_Date__c = system.now();
                    sv.Site_Visit_Count__c = 1;
                    insert sv;
                    
                    List<Site_Visit__c> lstSV = [Select Id, Channel_Partner__c,Project__c, Name, ownerId from Site_Visit__c where Id =: sv.Id];
                    if(flagQR == 'true') {
                        lstSV[0].ownerId = pList[0].Site_Visit_QR_Assignment__c;
                        system.debug('SV ownerId: '+ lstSV[0].ownerId);
                        update lstSV[0];
                    }
                    isSuccess = true;
                    message = 'Thank You! Site visit number is '+ lstSV[0].Name;
                    system.debug('Success Message: '+message);
                } catch(Exception ex) {
                    system.debug('Error: '+ex);
                    isRunError = true;
                    message = 'Error ' +ex.getMessage();  
                }
            }
        } else {
            system.debug('Test');
           if(isLeadFound && !isAccountFound){
               try{
                   System.debug('Inside Lead Found:');
                   if(leadList1[0].Project__c != pList[0].Id)
                        leadList1[0].Project__c = pList[0].Id;
                    leadList1[0].Stage__c = 'Visit Done';
                    update leadList1[0];
                    
                    Ex_LeadConversionServices.convertLead(leadList1);
                   
                    Lead__c convertedLead = [SELECT Account__c, Opportunity__c from Lead__c where Id =: leadList1[0].Id];
                    system.debug('Converted Lead: '+convertedLead);
                   
                    Opportunity__c convertedOpp =  [SELECT Id, Name,Site_Visit_Count__c, Last_SV_Date__c,Lead_Source__c from Opportunity__c where Id =: convertedLead.Opportunity__c];
                    system.debug('Converted Opportunity: '+convertedOpp);
                   
                   //Tag Site Visit Against Opportunity
                    sv.Opportunity__c = convertedOpp.Id;
                    sv.Site_Visit_Date__c = system.Today(); //PP
                    sv.Site_Visit_Count__c = 1;
                    insert sv;
                   
                   //Update Opportunity
                    convertedOpp.Site_Visit_Count__c = 1;
                  //  convertedOpp.Proposed_Visit_Date__c = system.now();
                    convertedOpp.Last_SV_Date__c = system.now(); //PP
                   // convertedOpp.First_Visit_Date__c = system.today();
                    update convertedOpp;
                   
                   List<Site_Visit__c> lstSV = [Select Id, Name from Site_Visit__c where Id =: sv.Id];
                   isSuccess = true;
                   message = 'Thank You! Site visit number is '+ lstSV[0].Name;
                   system.debug('Success Message: '+message);
               }catch(Exception ex) {
                    system.debug('Error: '+ex);
                    isRunError = true;
                    message = 'Error ' +ex.getMessage();  
                }
               
           } else if(!isLeadFound && !isAccountFound) {
                try{
                    Lead__c l = new Lead__c();
                    l.Salutation__c = sv.Salutation__c;
                    l.First_Name__c = sv.First_Name__c;
                    l.Last_Name__c = sv.Last_Name__c;
                   // if (sv.Salutation__c != null || sv.Firm_Name__c != null || sv.Last_Name__c !=null)
                  //  l.Name = sv.Salutation__c+' '+sv.First_Name__c+' '+sv.Last_Name__c;
                    l.Mobile__c = sv.Mobile__c;
                    l.Email__c = sv.Email__c;
                    l.Project__c = pList[0].Id;
                    l.House_No__c = sv.House_No__c;
                    l.Building__c = sv.Building__c;
                    l.Street__c = sv.Street_1__c;
                    l.Locality__c = sv.Locality__c;
                    l.City__c = sv.City__c;
                    l.State__c = sv.State__c;
                    l.Country__c = sv.Country__c;
                    l.PostalCode__c = sv.Pincode__c;
                    l.Occupation__c = sv.Occupation__c;
                    l.Other_Occupation__c = sv.Other_Occupation__c;
                    l.Designation__c = sv.Designation__c;
                    l.Company_Name__c = sv.Company_Name__c;
                    l.Lead_Source__c = sv.Lead_Source__c;
                    l.Sub_Source__c = sv.Sub_Source__c;
                    if(sv.Lead_Source__c == 'Referral (Nishtha)'){
                        if(sv.Lead_Source__c == 'Booked Clients Reference')
                         l.Referrer_Name__c = sv.Referrer_Name__c;
                    }else if(sv.Lead_Source__c == 'Channel Partner'){
                         l.Channel_Partner__c = sv.Channel_Partner__c;
                    }
                    l.Current_Residence_Configuration__c = sv.Current_Residence_Configuration__c;
                    l.Configuration_Required__c = sv.Configuration_Required__c;
                    l.Budget__c = sv.Budget__c;
                    l.Buying_Purpose__c = sv.Buying_Purpose__c;
                    l.Possession_Timeframe_Required__c = sv.Possession_Timeframe_Required__c;
                    l.Stage__c = 'Visit Done';
                    l.OwnerId = UserInfo.getUserId();
                    system.debug('UserInfo'+l.OwnerId );
                    insert l;
                    if(flagQR == 'true') {
                        l.OwnerId = pList[0].Site_Visit_QR_Assignment__c;
                        update l;
                    }
                    
                    List<Lead__c> lList = new List<Lead__c>();
                    lList.add(l);
                    Ex_LeadConversionServices.convertLead(lList);
                    
                    Lead__c convertedLead = [Select ConvertedAccountId__c, ConvertedOpportunityId__c, Account__c,Opportunity__c from Lead__c where Id = :l.Id ];
                    system.debug('Converted Lead: '+convertedLead);
                    
                    Opportunity__c convertedOpp = [SELECT Id, Name, Site_Visit_Count__c,Last_SV_attended_by__c from Opportunity__c where Id =: convertedLead.Opportunity__c];
                    system.debug('Converted Opportunity: '+convertedOpp);
                    
                    //Tag Site Visit Against Converted Opportunity
                    sv.Opportunity__c = convertedOpp.Id;
                    sv.Site_Visit_Date__c = system.now();
                    sv.Site_Visit_Count__c = 1;
                    insert sv;
                    
                    //Update Opportunity
                    convertedOpp.Site_Visit_Count__c = 1;
                    convertedOpp.Last_SV_Date__c = system.now();
                    
                    update convertedOpp;
                    
                    List<Site_Visit__c> lstSV = [Select Id, Name, ownerId from Site_Visit__c where Id =: sv.Id];
                    if(flagQR == 'true') {
                        lstSV[0].ownerId = pList[0].Site_Visit_QR_Assignment__c;
                        system.debug('SV ownerId: '+ lstSV[0].ownerId);
                        update lstSV[0];
                    }
                    isSuccess = true;
                    message = 'Thank You! Site visit number is '+ lstSV[0].Name;
                    system.debug('Success Message: '+message);
                } catch(Exception ex) {
                    system.debug('Exception: '+ex);
                    isRunError = true;
                    message = 'Error ' +ex.getMessage();    
                }
            }
        }
    }
    
  
     @RemoteAction public static List<String> getReferrerName(String refName) {
        List<String> refNameList = new List<String>();
        List<Account> refList = new List<Account>();
        String QueryString =  'Select Id, Name, FirstName, LastName, PersonMobilePhone, Phone from Account where IsPersonAccount = true AND (FirstName LIKE \'' + refName + '%\' OR LastName LIKE \'' + refName + '%\' OR PersonMobilePhone LIKE \'' + refName + '%\' OR Phone LIKE \'' + refName + '%\')';
        refList = Database.query(QueryString);
        system.debug('refList: '+refList);
        
        if(!refList.isEmpty() && refList != null){
            for(Account a : refList){
                refNameList.add(a.Name+'-'+a.PersonMobilePhone);
            }
        }
        return refNameList;
    }
    
    @RemoteAction
    public static List<String> getCPAccount(String cpName) {
        List<String> cpNameList = new List<String>();
        Id cpRecordTypeId = Schema.SobjectType.Account.getRecordTypeInfosByName().get('Channel Partner').getRecordTypeId();
        List<Account> cpList = new List<Account>();
        String QueryString =  'Select Id, Name, Phone,CP_Code__c,MahaRERA_Registration_No__c from Account where (Name LIKE \''+ cpName +'%\' OR Phone LIKE \''+ cpName +'%\' OR CP_Code__c LIKE  \''+ cpName +'%\' ) AND RecordTypeId =: cpRecordTypeId ';
        cpList = Database.query(QueryString);
        system.debug('cpList: '+cpList);
        
        if(!cpList.isEmpty() && cpList != null){
            for(Account cp : cpList){
                cpNameList.add(cp.Name+'-'+cp.Phone+'-'+cp.CP_Code__c);
            }
        }
        return cpNameList;
    }
    
    
    public Pagereference closeFormExit() {
        isSignatureDone = true;
        Pagereference pg = new Pagereference('/'+sv.id);
        pg.setredirect(true);
        return pg;
    }
    
      public PageReference closeForm() {
        isSignatureDone = false;
        system.debug('Redirect to Signature :' +Sv.id);
        PageReference p = new Pagereference('/apex/Ex_SiteSignatureVFPage?id=' + sv.Id);
        p.setRedirect(true);
        return p;
        
    }
*/