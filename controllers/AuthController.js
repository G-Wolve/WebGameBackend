const Player = require('../models/playerModel');
const bcrypt = require('bcryptjs');
const { json } = require('express');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10 , function(err, hashedpass) {
        if (err) {
            res,json({error: err})
        }

        let newPlayer = new Player(
            {
                playername : req.body.playername,
                password : hashedpass,
                email : req.body.email
            }
        )
        newPlayer.save()
        .then(newPlayer => {
            res.status(200).json(newPlayer);
        })
    })
}

const login = (req, res, next) => {
    var playername = req.body.playername
    var password = req.body.password
    console.log(playername+':'+password)

    Player.findOne({$or: [{playername:playername},{email:playername}]})
    .then(player => {
        if(player)
        {
            bcrypt.compare(password, player.password, function(err, result)
            {
                if(err)
                {
                    res.json({error:err})
                }
                if(result)
                {
                    let token = jwt.sign({playername: player.name}, 'yourMom', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful',
                        playername,
                        token
                    })
                    console.log('Login Successful!')
                } else{
                    res.json({message: 'Login Error!'})
                }
            })
        }else{
            res.json({message: 'User Login Error!'})
        }
    })
}

module.exports = {register,login};
