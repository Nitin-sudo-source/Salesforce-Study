({
    init: function(cmp, evt, helper) {
        var myPageRef = cmp.get("v.pageReference");
        var amount = myPageRef.state.c__amount;
        console.log(amount);
        cmp.set("v.amount", amount);
    }
})