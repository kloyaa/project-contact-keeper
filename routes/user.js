const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');
const User = require('./../models/User');

// @route POST api/users
// @desc  Register a user
// @access public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Please enter a password with 7 or more characters').isLength({ min: 7 }),
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())  return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) return res.status(400).json({ msg: "Email already exist" })

        //If not exist
        user = new User({ name, email, password })
        
        //Hash password
        const salt = await bcrypt.genSalt(10);
        user.password =  await bcrypt.hash(password, salt);

        //final
        await user.save();

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
        console.error(err.message);
        res.status(5000).send('Server error')
    }
})

module.exports = router;