import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
let router = express.Router();

router.post('/', (req, res) => {
    User.findOne({
        email: req.body.email,
    }).then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign({
                    id: user._id,
                    username: user.username
                }, config.jwtSecret);
                res.json({token: token});
            }
            else {
                res.status(401).json({success: false, error: 'Invalid Credentials'});
            }
        }
        else {
            res.status(401).json({success: false, error: 'Invalid Credentials'});
        }
    }).catch(err => {
        res.status(500).json({error: err});
    });

    /*// const { identifier, password } = req.body;

    User.query({
        where: {username: identifier},
        orWhere: {email: identifier}
    }).fetch().then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.get('password_digest'))) {
                const token = jwt.sign({
                    id: user.get('id'),
                    username: user.get('username')
                }, config.jwtSecret);
                res.json({token});
            } else {
                res.status(401).json({errors: {form: 'Invalid Credentials'}});
            }
        } else {
            res.status(401).json({errors: {form: 'Invalid Credentials'}});
        }
    });*/
});

export default router;
