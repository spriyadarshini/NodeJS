/**
 * Created by psarode on 3/2/2015.
 * Create a Controller for MVC app to get City details
 */
var router = require('express').Router();
var restify = require('restify');
var _ = require('lodash');

router.get('/',function(req,res){
    // Creates a JSON client
    var client = restify.createJsonClient({
        url: 'http://api.geonames.org/'
    });
    client.get('/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo', function(err, request, response, obj) {

        if(typeof obj.status !='undefined') {
            res.render('city', {city: obj.status.message});
        }else{
            var arrayCities = [];
            for (var i in obj.geonames) {
                for (var j in obj.geonames[i]) {
                    console.log ("obj.geonames[i] "+obj.geonames[i])
                    objCity = {"name": obj.geonames[i].toponymName, "countryCode": obj.geonames[i].countrycode}
                    arrayCities.push(objCity);
                }
            };
            var newCityList = _.pluck(_.uniq(arrayCities, 'name'),'name');
            res.render('city', {city: JSON.stringify(newCityList)});
        }
    });
})


module.exports = router;