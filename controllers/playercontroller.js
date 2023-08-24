const Player = require('../models/playerModel');

const leaderBoard = async (req, res) => {
    try 
    {
        var allplayers = await Player.find().select('playername level');
        console.log('Data request successful!'),
        res.status(200).json(allplayers);

    } catch (err) {
        res.status(500).json({message: err})
    }
} 


module.exports = {leaderBoard}