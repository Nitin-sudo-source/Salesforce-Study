trigger EY_AccountTrigger on Account (before insert, before update, after insert, after update) {
    if(trigger.isBefore && trigger.isInsert)
        EY_AccountTriggerHandler.beforeInsert(trigger.new);
    if(trigger.isAfter && trigger.isInsert)
         EY_AccountTriggerHandler.AfterInsert(trigger.new);
    if(trigger.isAfter && trigger.IsUpdate)
        EY_AccountTriggerHandler.AfterUpdate(trigger.oldMap, Trigger.newMap);
}