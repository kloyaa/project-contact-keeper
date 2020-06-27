const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('./../models/User');


// @route    GET api/auth
// @desc     GET Login user
// @access   Private
router.get('/', auth, async (req, res) => {
   try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user)
   } catch (error) {
        res.status(500).json({ msg: 'Something went wrong'})
   }
})

// @route    POST api/auth
// @desc     POST Login user
// @access   Public
router.post('/', [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(!user) return res.status(400).json({ msg: 'Account does not exist'});

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) return res.status(400).json({ msg: 'Password is incorrect'});

        const payload = {
            user: { id: user.id }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if(err) throw err;
            res.json({ token })
        })
        
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Something went wrong.')
    }
    
})

module.exports = router;