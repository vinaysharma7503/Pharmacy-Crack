const PlayFab = require('../node_modules/playfab-sdk/Scripts/PlayFab/PlayFab');
const PlayFabClient = require('../node_modules/playfab-sdk/Scripts/PlayFab/PlayFabClient');


function LoginWithCustomEmailID(){
    PlayFab.settings.titleId = "your title Id";
    var loginRequest = {
        TitleId: PlayFab.settings.titleId,
        CustomId: "your player's custom id",  
        CreateAccount: true
    };
    PlayFabClient.LoginWithCustomID(loginRequest, LoginCallback);
}

function LoginCallback(error, result) {
    if (result !== null) {
        console.log("Now Get User Data:");
        var getUserDataRequest ={
           Keys: ["name of the key(s) stored for the player"]
        };
 
 
        PlayFabClient.GetUserData(getUserDataRequest,GetUserDataCallback);
 
 
 
 
    } else if (error !== null) {
        console.log("Something went wrong with your first API call.");
        console.log("Here's some debug information:");
        console.log(CompileErrorReport(error));
    }
}

function GetUserDataCallback(error, result){
    if (result !== null) {
        console.log("The response is: "+ JSON.stringify(result));
 
 
    } else if (error !== null) {
        console.log("Something went wrong with your first API call.");
        console.log("Here's some debug information:");
        console.log(CompileErrorReport(error));
    }
}

function CompileErrorReport(error) {
    if (error == null)
        return "";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
        for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
}

LoginWithCustomEmailID();