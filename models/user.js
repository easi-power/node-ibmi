const connection = require('./sequelize').connection;
const Sequelize = require('@sequelize/core');
const DataTypes = Sequelize.DataTypes;

const User = connection.define('users2', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING
    }, {
    // Other model options go here
    sequelize: connection, // We need to pass the connection instance
    modelName: 'users', // We need to choose the model name
    timestamps: false,
});

module.exports = User;