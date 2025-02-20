({
    doInit : function (component, event,helper)
    {
        console.log('Inside doinit:::');
        var action = component.get("c.getUsers");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.users", response.getReturnValue());
                console.log('Inside state:::');
            }
        });
	 $A.enqueueAction(action);

    },
    
    selectChange : function(component, event, helper) {
        console.log('selectChange:::');
        var checkCmp = component.find("chkbox");
        var toggle = checkCmp.get("v.value");
        console.log(toggle);
        component.set("v.toggleValue" , toggle);
        var action = component.get("c.UpdateuserActiveBox");
        action.setParams({ toggle : toggle });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('Result:::'+result);
                if(result == true){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "User Activated!!!",
                        type: 'success'
                    });
                    toastEvent.fire();
                }else if(result == false){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error',
                        message:'User Deactivated!!!',
                        type: 'error'
                    });
                    toastEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }
    
})