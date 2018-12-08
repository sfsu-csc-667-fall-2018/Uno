'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('draw_decks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'games',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      cardid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'all_cards',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      index: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('draw_decks');
  }
};