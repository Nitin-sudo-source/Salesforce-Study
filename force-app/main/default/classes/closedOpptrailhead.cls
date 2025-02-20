public class closedOpptrailhead {
    public static void closedOpp(list<opportunity> opplist){
        list<task> tasklist = new list<task>();
            for(opportunity opp : opplist){
            if( opp.StageName == 'Closed Won'){
          		task t = new task();
                t.Subject = 'Follow Up Test Task';
                t.WhatId = opp.Id;
                tasklist.add(t);
            }
        }   
        if(tasklist.size()> 0){
            insert tasklist;
        }
        system.debug('==='+tasklist);
    }
}