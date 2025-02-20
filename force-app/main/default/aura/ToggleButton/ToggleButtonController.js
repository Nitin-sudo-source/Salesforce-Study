({
      doInit: function(component, event, helper) {
        // Fetch the Users list from the Apex controller
        helper.getUserList(component);
      }
})