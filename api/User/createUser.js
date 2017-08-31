exports.create = (req, res) => {
  req.body.password = Common.encrypt(req.body.password);
    async.waterfall([
        function(callback) {
           User.saveUser(req.body, (err, user) => {
                if (!err) {
                   callback(null, user)
                } else {
                    if(err.name == 'ValidationError'){
                        let error = {}
                        error.statusCode = 409
                        error.message = `please provide another user email`
                        callback(error, null);
                    }
                    else {
                        let error = {}
                        error.statusCode = 500
                        error.message = `Oh uh, something went wrong`
                        callback(error, null);// HTTP 403
                    }
                }
            })
        },
        function(user, callback) {
            let tokenData = {
                username: user.username,
                id: user._id
            }
             Common.sentMailVerificationLink(user, Jwt.sign(tokenData, privateKey), (error, result) => {
                if(!error) callback(error, null)
                else callback(null, 'done')
            });
        },
    ],
    // optional callback
    function(err, results) {
        if(err){
            if(err.statusCode) return res.status(err.statusCode).send(err.message);
            else return res.status(500).send(`Oh uh, something went wrong`);
        }
        else{
            return res.json({message: `Please confirm your email id by clicking on link in email`});
        }
    });
  
}