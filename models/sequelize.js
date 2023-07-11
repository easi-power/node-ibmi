const Sequelize = require('@sequelize/core');

let connectionString = `DRIVER=IBM i Access ODBC driver;UID=${process.env.DB_USERNAME};PWD=${process.env.DB_PASSWORD};SYSTEM=${process.env.DB_HOST};DBQ=${process.env.DB_SCHEMA},XONKVHU,KVHUTSTLIB,ABWLIBKVHU;`;

//const connectionString = `DSN=DAS;`
let sequelize = new Sequelize({
    dialect: 'ibmi',
    dialectOptions: {
        odbcConnectionString: connectionString,
    },
    protocol: 'TCP/IP',
    operatorsAliases: 0,
    //quoteIdentifiers: false,
    pool: {
        max: 20,
        min: 5,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.options.define.freezeTableName = true;
sequelize.options.define.underscored = true;
sequelize.options.define.underscoredAll = true;

module.exports.connection = sequelize;
module.exports.connectionString = connectionString;