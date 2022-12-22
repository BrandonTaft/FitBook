'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Chat.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
              })
        }
    };
    Chat.init({
        body: DataTypes.TEXT,
        senderId: DataTypes.STRING,
        name: DataTypes.STRING,
        pic: DataTypes.STRING,
        description: DataTypes.TEXT,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                field: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Things',
                field: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
    }, {
        sequelize,
        modelName: 'Chat',
    });
    return Chat;
};