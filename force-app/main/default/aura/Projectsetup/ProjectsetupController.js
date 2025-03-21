({
    doInit : function(component, event, helper) 
    {
        // Retrieve Projects during component initialization
       helper.getmyProjects(component);
    },

    onSelectTower :function(component, event, helper){
        var selected = component.find("opt").get("v.value");
        component.set("v.selectedProjectId", selected);
        //alert('selected: '+component.get("v.selectedProjectId"));
        helper.getmyTowers(component);
    },
    
    onSelectUnit :function(component,event,helper){
    	var selected = component.find("opt2").get("v.value");
    	component.set("v.SelectedTowerId", selected);
    	//alert('selected: '+component.get("v.SelectedTowerId"));
    	helper.getmyunits(component);
	}  

})