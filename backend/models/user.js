'use strict';
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  model.associate = function(models) {
    // associations can be defined here
  };
  return model;
};