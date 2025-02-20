({
    getmyProjects : function(cmp) {
        // Load all contact data
        var action = cmp.get("c.getProject");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.plist", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    getmyTowers : function(component) 
    {
       // alert('test: '+component.get("v.selectedProjectId"));
        var pId = component.get("v.selectedProjectId");
        var action=component.get("c.getTower");
        action.setParams({"ProjectId" : pId});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.tlist", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
     getmyunits : function(component)
    {
        //alert('test unit'+component.get("v.SelectedTowerId"));
        var tId=component.get("v.SelectedTowerId");
        var action=component.get("c.getUnit");
        action.setParams({"TowerId" : tId});
        //alert('test Tower id'+tId);
        action.setCallback(this, function(response)
         {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                component.set('v.floorMap',response.getReturnValue());
                var custs = [];
				var result = response.getReturnValue();
				for (var key in result)
            	{
                  custs.push({ key:key ,value:result[key]});
                  custs.sort(function(a, b){return a.key - b.key}).reverse();
				}
                    component.set("v.floorMap",custs);
                	
			}
                    console.log(custs);
        });
        $A.enqueueAction(action);
    }
 })