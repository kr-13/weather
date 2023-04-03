public with sharing class Weather {

// the api key and url 
    private static final String API_KEY = '7183527cb739960f3f2299a031584883';
    private static final String ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';


    // this function can return the weather informations by adding the city in parametre
           @AuraEnabled(cacheable=true)
           public static Map<String, Object> getWeatherForCity(String cityName) {
               Map<String, Object> result = new Map<String, Object>();
        
               HttpRequest req = new HttpRequest();
               req.setEndpoint(ENDPOINT + '?q=' + EncodingUtil.urlEncode(cityName, 'UTF-8') + '&appid=' + API_KEY);
               req.setMethod('GET');
               Http http = new Http();
               HttpResponse res = http.send(req);
        
               if (res.getStatusCode() == 200) {
                   Map<String, Object> weatherData = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
                   result.put('temperature', ((Map<String, Object>) weatherData.get('main')).get('temp'));
                   result.put('humidity', ((Map<String, Object>) weatherData.get('main')).get('humidity'));
                   result.put('description', ((Map<String, Object>) ((List<Object>) weatherData.get('weather')).get(0)).get('description'));
               }
        
               return result;
           }



//function that can get only the temperature i did it to test only

 @AuraEnabled(cacheable=true)
 public static Decimal gettemperature(String city){
        
Http http = new Http();
HttpRequest request = new HttpRequest();
request.setEndpoint('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=7183527cb739960f3f2299a031584883&units=metric');
request.setMethod('GET');
HttpResponse response = http.send(request);
    
    Decimal temperature= 0.0;
      
// If the request is successful, parse the JSON response.
if(response.getStatusCode() == 200) {
    // Deserialize the JSON string into collections of primitive data types.
    Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
    // Cast the value in the temperature
    Map<String, Object> nMap = (Map<String, Object>) results.get('main');
   temperature= (Decimal)nMap.get('temp');
   
    
    
    }
        return temperature;
    }

       }
    
    
