const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    if (req.cookies && req.cookies.myCookie) 
    {
        jwt.verify(req.cookies.myCookie, process.env.KEY, (err, data)=>{
            if(err) {
                console.log(err);
                res.status(401).send('Invalid token !');
            }
            else
            {
                req.cookieData = data;
                req.username = data.usename;
                next();
            }

        });
    }
    else
        res.status(401).send('Unauthorized');
};

module.exports = authenticate;