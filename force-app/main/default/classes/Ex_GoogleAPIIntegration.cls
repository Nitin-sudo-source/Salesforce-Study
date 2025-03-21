public class Ex_GoogleAPIIntegration {
    //API Secret Key
    private static string key = '587408516117-u3fja1moo9mdi3bb6d1eoqc6rcf1uqh2.apps.googleusercontent.com';
    //API Secret
    private Static string secert = '**********************';
    //API Redirect. Use your Lightning Tab or Lightning community URL
    private Static string redirect_uri = 'https://munnac798-dev-ed.lightning.force.com/lightning/n/';
    private static string authUrl='https://accounts.google.com/o/oauth2/v2/auth';
    private static string scope='https://www.googleapis.com/auth/fitness.activity.read';
    private static string tokenUrl='https://accounts.google.com/o/oauth2/token';
    
    @AuraEnabled
    public static String createAuthURL() {
        String key = EncodingUtil.urlEncode(key,'UTF-8');
        String uri = EncodingUtil.urlEncode(redirect_uri,'UTF-8');
        String authuri = '';
        authuri = authUrl+'?'+'client_id='+key+ '&response_type=code'+ '&scope='+scope+'&redirect_uri='+uri+ '&access_type=offline';
        System.debug('authuri: '+authuri);
        return authuri;
    }
    
        @AuraEnabled
    public static boolean getAccessToken(String code)
    {
        //Getting access token from google
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setEndpoint(tokenUrl);
        req.setHeader('content-type', 'application/x-www-form-urlencoded');
        
        String messageBody ='code='+code+'&client_id='+key+
            '&client_secret='+secert+
            '&redirect_uri='+redirect_uri+
            '&grant_type=authorization_code';
        req.setHeader('Content-length', String.valueOf(messageBody.length()));
        req.setBody(messageBody);
        req.setTimeout(60*1000);
       	system.debug('messageBody:'+messageBody);
        
        Http callout = new Http();
        String responseText;
        HttpResponse response = callout.send(req);
        responseText = response.getBody();
        system.debug('responseText:'+responseText);
        Map<String,object> responseMap =(Map<String,object>)JSON.deserializeUntyped(responseText) ;  
        String token =  String.valueOf(responseMap.get('access_token'));
        system.debug('token:'+token);
        
        //Update token in custom metadata 
        MetadataService.UpdateCustomMetadata(token);
        return true;
    }


}