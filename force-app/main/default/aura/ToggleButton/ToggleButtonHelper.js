({
// Fetch the User from the Apex controller
      getUserList: function(component) {
        var action = component.get('c.getUsers');
        action.setParams({
            "aid": component.get("v.recordId")
        });
        // Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
         component.set('v.users', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
      }
})