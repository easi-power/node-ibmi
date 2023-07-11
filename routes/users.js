const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserRepository = require('../repositories/SequelizeUserRepository.js');
//const UserRepository = require('../repositories/StoredProcRepository.js');

const validations = [
    body('firstname').trim().not().isEmpty().withMessage('The firstname field is required'),
    body('lastname').trim().not().isEmpty().withMessage('The lastname field is required'),
    body('email').trim().not().isEmpty().withMessage('The email field is required'),
    body('phone').trim().not().isEmpty().withMessage('The phone field is required'),
    body('password').trim().not().isEmpty().withMessage('The password field is required'),
];

router.route('/')
    .get(async (req, res) => {
        const user = await UserRepository.get();
        res.status(200).send(user);
    })
    .post(validations, async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }

        let user = await UserRepository.create(req.body)
        res.status(201).send(user);
    });

    router.use('/:user_id', async (req, res, next) => {
        let user = await UserRepository.getOne(req.params.user_id);
        if(user) {
            req.user = user;
            next();
        } else {
            res.status(404).send("user not found");
        }
    });
    
    router.route('/:user_id')
        .get((req, res) => {
            res.status(200).send(req.user);
        })
        .put(validations, async (req, res) => {
            let user = await UserRepository.update(req.user, req.body) 
            res.status(202).send(user);
        })
        .delete((req, res) => {
            UserRepository.destroy(req.user);
            res.status(204).send();
        });

module.exports = router;