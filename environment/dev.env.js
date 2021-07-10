exports.devEnvironment = () => {

    const keys = {
        DB_CONNECTION_API_V1: 'mysql_api_v1',
        DB_HOST_API_V1: 'pharma-db-dev.c2cginigctp9.us-east-2.rds.amazonaws.com',
        DB_PORT_API_V1: 3306,
        DB_DATABASE_API_V1: 'pharma_db_dev_v1',
        DB_USERNAME_API_V1: 'pharma_usr',
        DB_PASSWORD_API_V1: 'Agic3nt!aws.db#654',

        jwt_secret: 'pharma',
        
        AWS_ID : 'AKIA4GSQHATIGJ4JRLRT',
        AWS_SECRET:'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',
        AWS_BUCKET_NAME:'pharma-env-dev',

        PROFILE_PIC_BASEURL:'https://pharma-env-dev.s3.us-east-2.amazonaws.com/profile_pic/',
        BUCKET_URL:'https://pharma-env-dev.s3.us-east-2.amazonaws.com/',
        EMAIL_LOGO_URL:'app_related_images/logo.svg',
        EMAIL_THUMB_URL:'app_related_images/thumbs_up.svg',
        EMAIL_USER: 'agicent.devices@gmail.com',
        EMAIL_PASS: 'zatowsyfxdurhigy'
    }
    return keys
}