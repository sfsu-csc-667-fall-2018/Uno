'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('discardDecks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'games',
          key: 'id'
        }
      },
      cardid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'allCards',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('discardDecks');
  }
};