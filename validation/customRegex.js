exports.validUserName = [

    {
        regex: /[0-9]/g,
        msg:'Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.'
    },
    {
        regex: /(?=.[!@#$_%^&])/g,
        msg:'Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.'
    },
    {
        regex: /[A-Z]/g,
        msg:'Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.'
    },
    {
        regex: /[a-z]/g,
        msg:'Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.'
    }
]