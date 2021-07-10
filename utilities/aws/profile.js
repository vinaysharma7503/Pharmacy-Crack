const multer = require('multer');



const storageOptions =  multer.diskStorage({
    
        filename:(req,file,cb)=>{
        cb(null,file.originalname)
        
        }
    });



exports.multerS = multer({storage: storageOptions})
