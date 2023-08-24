const mongoose = require('mongoose');

const playerSchema = mongoose.Schema(
    {
        playername: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        level: [
            {
                levelid: {
                    type: Number,
                    required: false
                },
                score: {
                    type: Number,
                    required: false
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Player = mongoose.model('player', playerSchema);

module.exports = Player;