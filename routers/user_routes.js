const express = require("express");
const med_routes = express.Router();
const user_controller = require('../controller/user_controller');
const master_controller = require('../controller/master_controller');
const match_history_controller = require('../controller/match_history_controller');
const game_result_controller = require('../controller/game_result_controller');
const contact_queries_controller = require('../controller/contact_queries_controller');
const question_controller = require('../controller/question_controller');
const user_drug_controller = require('../controller/user_drug_controller');
const dashboard_controller = require("../controller/dashboard_controller");
const quiz_controller = require("../controller/quiz_controller");
const score_controller = require("../controller/user_score_controller");
const leadershipboard_quiz = require("../controller/leadershipboard_quiz_controller");
const country_state_city = require("../controller/country_state_city");
const user_subscription_controller = require("../controller/user_subscription_controller");
const user_status_controller = require('../controller/status_controller');
const drug_iq_map_controller = require('../controller/drug_iq_map_controller');
const user_validation = require('../validation/user_validation')
const global_middleware = require('../global_middlewares/global_middleware')
const PlayFab = require("playfab-sdk");
const aws_profile = require('../utilities/aws/profile');

(function initilization() {
    getRoutes();
    postRoutes();
})();

// initilization();

function getRoutes() {
    //Register Api's
    med_routes.get("/user/countrystatecity", country_state_city.country_state_city);//country state city api route
    med_routes.get("/masterClassification",global_middleware.ractifyError, master_controller.getclassification);//master classification api route
    med_routes.get("/masterSpeciality",global_middleware.ractifyError, master_controller.getspeciality);// master speciality api route

    //Master Api's
    med_routes.get("/masterBonus",global_middleware.ractifyError, master_controller.getbonus);//master bonus api rote
    med_routes.get("/masterCategory",global_middleware.ractifyError, global_middleware.authenticate, master_controller.getcategory);//master
    med_routes.get("/masterDrug", global_middleware.authenticate,global_middleware.ractifyError, master_controller.getdrug);//master drug api route
    med_routes.get("/masterPoints", global_middleware.authenticate,global_middleware.ractifyError, master_controller.getpoints);//master points api route
    med_routes.get("/masterRewards", global_middleware.authenticate,global_middleware.ractifyError, master_controller.getrewards);//master rewards api route
    med_routes.get("/user/score",global_middleware.authenticate,global_middleware.ractifyError,score_controller.getscore);//user total score api route



    //Contact Api's
    //med_routes.get("/user/contactQueries", global_middleware.authenticate,global_middleware.ractifyError, contact_queries_controller.getcontact);//contact queries api



    //Question Api
    med_routes.get("/user/question", global_middleware.authenticate,global_middleware.ractifyError, question_controller.getquestion);//Question Api route
    med_routes.get("/user/findQuestion",global_middleware.authenticate,global_middleware.ractifyError,question_controller.findquestion);//Find Question Api route
    //User_drug_store Api
    med_routes.get("/user/userDrugStore", global_middleware.authenticate,global_middleware.ractifyError, user_drug_controller.getdrug);//User_Drug_Store Api Route

    //Dashboard Api
    med_routes.get("/dashboard", global_middleware.authenticate, dashboard_controller.getdashboard);//Dashboard Api Route
    //Double & Single Player Quiz Api's
    med_routes.get("/user/doublePlayerQuiz", global_middleware.authenticate,global_middleware.ractifyError, quiz_controller.getDoublePlayerQuiz);//Double Player Quiz Api
    med_routes.get("/user/doublePlayerQuizLifelines", global_middleware.authenticate,global_middleware.ractifyError, quiz_controller.getDoublePlayerQuizLifelines);//Double Player Quiz Life Api
    med_routes.get("/user/singlePlayerQuiz", global_middleware.authenticate,global_middleware.ractifyError, quiz_controller.getSinglePlayerQuiz);//Single Player Quiz Api
    med_routes.get("/user/singlePlayerQuizLifelines", global_middleware.authenticate,global_middleware.ractifyError, quiz_controller.getSinglePlayerQuizLifelines);//Single Player Quiz Life Api
    med_routes.get("/user/matchHistory", global_middleware.authenticate,global_middleware.ractifyError, match_history_controller.matchHistory)
    med_routes.get("/user/gameResult",global_middleware.ractifyError, game_result_controller.matchResult);

    //Category Status Api
    med_routes.get("/user/status",global_middleware.authenticate,global_middleware.ractifyError,user_status_controller.status);//Category Complete Status Api Route

    //Leadership Board Api
    med_routes.get("/user/leadershipBoardWeekly_Quiz",global_middleware.authenticate,global_middleware.ractifyError,leadershipboard_quiz.getLeadershipBoard_quiz);//Leadership Quiz Api with Weekly Max Quiz Route
    med_routes.get("/user/leadershipBoardMontly_Quiz",global_middleware.authenticate,global_middleware.ractifyError,leadershipboard_quiz.getLeadershipBoard_month_quiz);//Leadership Quiz Api with Montly Max Quiz Route
    med_routes.get("/user/leaderBoardUser",global_middleware.authenticate,global_middleware.ractifyError,leadershipboard_quiz.getLeaderBoardUser);
    med_routes.get("/user/leaderBoardUserMonth",global_middleware.authenticate,global_middleware.ractifyError,leadershipboard_quiz.getLeaderBoardUserMonth);

    //DRUG IQ MAP API
    med_routes.get("/user/iqMap",global_middleware.authenticate,global_middleware.ractifyError,drug_iq_map_controller.getIQ);

}


function postRoutes() {
    //Login & Register Api's
    med_routes.post("/user/login", user_validation.user_login(), global_middleware.ractifyError, user_controller.login);//Login Route Api
    med_routes.post("/user/register", user_validation.user_register(), global_middleware.ractifyError, user_controller.signup);//Register Route Api
    med_routes.post("/user/socialLogin", user_validation.SocialLogin(), global_middleware.ractifyError, user_controller.SocialLogin);//Social Login Register Route Api
    med_routes.post("/user/socialRegister", user_validation.SocialRegister(), global_middleware.ractifyError, user_controller.SocialRegister);//Social Register Register Route Api
    med_routes.post("/user/deleteAccount",global_middleware.authenticate,global_middleware.ractifyError,user_controller.deleteAccount);//User Delete

    //Contact Api
    med_routes.post("/user/contactQueries", global_middleware.authenticate, contact_queries_controller.postcontact);//contact api route

    //Questions Api's
    med_routes.post("/user/question", global_middleware.authenticate, question_controller.postquestion);//Question api route
    med_routes.post("/user/reportQuestion", global_middleware.authenticate, global_middleware.ractifyError, question_controller.postReportQuestion);//Report Question Api route

    //Drug Subscription
    med_routes.post("/user/subscription",global_middleware.authenticate,global_middleware.ractifyError,user_subscription_controller.postUserSubscription);//User Subscription Api Route

    //User Drug Store 
    med_routes.post("/userDrugStore", global_middleware.authenticate, user_drug_controller.postdrug);//User Drug Store Api Route

    //Dashboard Api 
    med_routes.post("/dashboard", global_middleware.authenticate, dashboard_controller.postdashboard);//User Dashboard Api Route

    //Quiz Api
    med_routes.post("/user/doublePlayerQuiz", global_middleware.authenticate, quiz_controller.postDoublePlayerQuiz);//Double Player Quiz Api Route
    med_routes.post("/user/doublePlayerQuizLifelines", global_middleware.authenticate, quiz_controller.postDoublePlayerQuizLifelines);//Double Player Quiz Lifeline Api Route
    med_routes.post("/user/singlePlayerQuiz", global_middleware.authenticate, quiz_controller.postSinglePlayerQuiz);//Single Player Quiz Api Route
    med_routes.post("/user/singlePlayerQuizLifelines", global_middleware.authenticate, quiz_controller.postSinglePlayerQuizLifelines);//Single Player Lifeline Quiz Api Route 
    med_routes.post("https://titleId.playfabapi.com/Client/LoginWithEmailAddress");

    //Forgot Password Api's
    med_routes.post("/user/forgotPassword", user_validation.forgotpasswordsmail(), global_middleware.ractifyError, user_controller.forgotpassword);//User Forgot Password Api Route
    med_routes.post("/user/checkResetCode", user_validation.forgotpasswordscode(), global_middleware.ractifyError, user_controller.resetcode);//Verify Reset Code Api Route
    med_routes.post("/user/setNewPassword", user_validation.newpassword(), global_middleware.ractifyError, user_controller.newpassword);//Set New Password Api Route

    //Profile Api
    //med_routes.post("/user/profile",global_middleware.authenticate, aws_profile.multerS.single('profile_pic'), global_middleware.ractifyError, user_controller.Profile);
    //med_routes.post("/user/setNewUsername",global_middleware.authenticate,user_validation.set_newUsername(),global_middleware.ractifyError,user_controller.setNewUserName);
    med_routes.post("/user/profile",global_middleware.authenticate,aws_profile.multerS.single('profile_pic'),user_validation.set_newUsername(),global_middleware.ractifyError,user_controller.ChangeProfile);//User Profile Api Route 
    
    //DRUG IQ MAP API
    med_routes.post("/user/iqMap",global_middleware.authenticate,global_middleware.ractifyError,drug_iq_map_controller.postIQ);

}






























module.exports = med_routes;