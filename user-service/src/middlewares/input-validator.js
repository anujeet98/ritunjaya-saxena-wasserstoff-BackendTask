

exports.validate = (req, res, next) => {
    try{
        const {email, password} = req.body;
        var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

        if (!email || !email.match(validEmailRegex))
            return res.status(422).json({error: "Invalid email received", messge: 'Email must be of the format abc@example.com'});

        if(!password || !password.length>6)
            return res.status(422).json({error: "Invalid password received", message: 'password must be of atleast 6 characters long'});

        next();
    }
    catch(err){
        console.log("User-service :: Input-validation error :: ", err);
        res.status(500).json({error: 'Internal server error while authentication'});
    }
};

