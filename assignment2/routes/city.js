/**
 * Created by psarode on 3/2/2015.
 * Create a Controller for MVC app to get City details
 */
var router = require('express').Router();
var restify = require('restify');

router.get('/',function(req,res){
    // Creates a JSON client
    var client = restify.createJsonClient({
        url: 'http://api.geonames.org/'
    });
    client.get('/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo', function(err, request, response, obj) {
        console.log("obj "+JSON.stringify(obj));

        if(typeof obj.status.message !='undefined') {
            res.render('city', {city: 'Details Not found'});
        }else{
            var arrayCities = [];
            for (var i in obj.geonames) {
                for (var j in obj.geonames[i]) {
                    objCity = {"name": obj.geonames[i][j].toponymName, "countryCode": obj.geonames[i][j].countrycode}
                    arrayCities.push(objCity);
                }
            };
            res.render('city', {city: JSON.stringify(arrayCities)});
        }
    });
})


module.exports = router;