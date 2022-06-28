const express = require('express');
const router = express.Router();
const { Admin } = require('../models');
const {createToken, validateToken} = require('../services/JWT');



router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    
    const user = await Admin.findOne({ where: {username: username}});

    if(!user) res.json({error: "User does not exist!"});

    try{
        if(user.password === password){
            const accessToken = createToken(user);
            
            //30 days
            res.cookie("token", accessToken, {
                maxAge: 2592000000,
            })
            .json({user: {username: user.username, id: user.id}});
        }
        else{
            res.json({error: "Wrong username and password combination!"});
        }
    }
    catch(error) {
        res.status(400).json({error: error});
    }



    bcrypt.compare(password, user.password).then((match) => {
        if(!match) {
            res.json({error: "Wrong username and password combination!"});
        }
        else {
            const accessToken = createToken(user);
            
            //30 days
            res.cookie("token", accessToken, {
                maxAge: 2592000000,
                httpOnly: true
            })
            .json({user: {username: user.username, id: user.id}});
        }
    });
});



module.exports = router;