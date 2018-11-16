'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});
      user.associate = function(models) {
        // associations can be defined here
    };
    return user;
};

module.exports.createUser = (newUser, callback)=>{
    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            newUser.password= hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUserName = (username, callback)=>{
    let query = {username: username};

};