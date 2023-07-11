const odbc = require("odbc");
const connectionString = require('./sequelize').connectionString;

let odbcPool;
//The number of seconds to wait for a request on the connection to complete before returning to the application
const timeout = 5;

async function setOdbcPool() {
    if(odbcPool?.isOpen) await odbcPool.close();
    odbcPool = await createOdbcPool();
}

async function createOdbcPool() {
    return await odbc.pool({
        connectionString,
        connectionTimeout: timeout,
        loginTimeout: timeout,
        reuseConnections: true,
    })
}

async function getOdbcConnection() {
    if(odbcPool === undefined) {
        throw new Error('ODBC pool undefined. Did you forget to initialise it?')
    }
    return await odbcPool.connect();
}

async function callStoredProc(action, request = '', response = '', lib = null) {
    const connection = await getOdbcConnection();
    console.log(`Calling ${action} with: \n` + JSON.stringify(request));
    let res = await connection.callProcedure(null, lib, 'LIBL_POCCRUD_EXECUTEACTION', [
        action, // action (in)
        JSON.stringify(request), // request (in)
        response // response (inout/out)
    ]);
    return res.parameters[2];
}

function normalizeOutput(objIn) {
    let objOut = {};
    Object.keys(objIn).forEach((key) => {
        objOut[key.toLowerCase()] = objIn[key];
    });
    // bigInt to normal number since we cannot parse this to JSON
    objOut.id = Number(objOut.id);
    return objOut; 
}

module.exports = {createOdbcPool, odbcPool, getOdbcConnection, setOdbcPool, callStoredProc, normalizeOutput}