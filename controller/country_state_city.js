const country_state_city = require('country-state-city');

exports.country_state_city = (req,res, next) =>{
    const hasCountry = Boolean(req.query.countryId)
    const hasState = Boolean(req.query.stateId)
    const cscInstance = country_state_city.default;
     if(hasCountry && hasState){
        res.status(200).json({cities:cscInstance.getCitiesOfState(req.query.countryId,req.query.stateId)});
     }else if(hasCountry) {
        res.status(200).json({states:cscInstance.getStatesOfCountry(req.query.countryId)});
     }else{
        res.status(200).json({countries:cscInstance.getAllCountries()});
     }
}