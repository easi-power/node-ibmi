const User = require("../models/user");
//const connection = require('../models/sequelize').connection;

// async function get() {
//     let output = '';
//     let response = await connection.query(`CALL XONKVHU.POCCRUD_ExecuteAction('USER_GETALLUSERS', '', '');`, 
//         {type: QueryTypes.SELECT});
//     console.log(response);
//     console.log(output);
//     return response;
// }

async function get() {
    let user = await User.findAll();
    return user;
}

async function create(fields) {
        /*let user = new User();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.password = req.body.password;

        user = await user.save();*/

    let user = await User.create({
        firstname: fields.firstname,
        lastname: fields.lastname,
        email: fields.email,
        phone: fields.phone,
        password: fields.password,
    });
    return user;
}

async function getOne(id) {
    let user = await User.findByPk(id);
    return user;
}

async function update(user, fields) {
    if(user) {
        Object.keys(fields).forEach((key) => {
            // Skip the empty fields
            if(fields[key]) {
                user[key] = fields[key];
            }
        });
        await user.save();
    }
    return user;
}

async function destroy(user) {
    return await user.destroy();
}

module.exports = {get, create, getOne, update, destroy}