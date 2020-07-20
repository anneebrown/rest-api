const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a title for your course',
        }
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a short description for your course',
        }
      },
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true,
      }
  }, {
    // paranoid: true, // enable "soft" deletes
    sequelize
  });

//   Course.associate = (models) => {
//     Course.belongsTo(models.User, {
//       as: 'creator',
//       foreignKey: {
//         fieldName: 'creatorUserId',
//         allowNull: false,
//       },
//     });
//   };

  return Course;
};