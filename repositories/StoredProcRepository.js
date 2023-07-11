const { QueryTypes } = require('@sequelize/core');
const { callStoredProc, getOdbcConnection, normalizeOutput } = require('../models/odbc');
const dayjs = require('dayjs');


async function get() {
    let res = await callStoredProc('USER_GETALLUSERS');
    return JSON.parse(res).users;
}

async function create(fields) {
    const request = {
        name: {
            first: fields.firstname,
            last: fields.lastname
        },
        email: fields.email,
        phone: fields.phone,
        password: fields.password,
        email_verified_at: dayjs().format('YYYY-MM-DD-HH.mm.ss.000'),
        remember_token: 'E92l8089Qn'
    }
    await callStoredProc('USER_CREATEUSER', request, '')
    const connection = await getOdbcConnection();
    let user = await connection.query(
        `select * from TOOLSHOP_DEV.Users 
        where email = '${fields.email}'
        order by id desc`);
    user = normalizeOutput(user[0]);
    return user;
}

async function getOne(id) {
    const connection = await getOdbcConnection();
    const res = await connection.query(
        `select * from TOOLSHOP_DEV.Users 
        where id = ${id}`);
    const user = normalizeOutput(res[0]);
    return user;
}

async function update(user, fields) {
    const request = {
        id: user.id,
        name: {
            first: fields.firstname,
            last: fields.lastname
        },
        email: fields.email,
        phone: fields.phone,
        password: fields.password,
        email_verified_at: dayjs().format('YYYY-MM-DD-HH.mm.ss.000'),
        remember_token: 'E92l8089Qn',
        created_at: dayjs(user.created_at, 'YYYY-MM-DD HH:mm:ss.000').format('YYYY-MM-DD-HH.mm.ss.000'),
        updated_at: dayjs(user.updated_at, 'YYYY-MM-DD HH:mm:ss.000').format('YYYY-MM-DD-HH.mm.ss.000'),
    }
    await callStoredProc('USER_UPDATEUSER', request)
    const res = getOne(user.id);
    return res;
}

async function destroy(user) {
    const res = await callStoredProc('USER_DELETEUSER', {id: user.id});
    return res;
}

module.exports = {get, create, getOne, update, destroy}