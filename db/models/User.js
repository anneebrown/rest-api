// id (Integer, primary key, auto-generated)
// firstName (String)
// lastName (String)
// emailAddress (String)
// password (String)
'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
        msg: 'Please provide a first name',
        }
      },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
          msg: 'Please provide a last name',
          }
        },
      },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide an email address',
        }
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a password',
        }
      },
    }
  }, {
    // paranoid: true, // enable "soft" deletes
    sequelize
  });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'creator',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return User;
};