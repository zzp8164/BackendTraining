module.exports = {

  attributes: {
    fromUserId: {type: 'string', columnType: 'varchar(32)', allowNull: true},
    toUserId: {type: 'string', columnType: 'varchar(32)', allowNull: true},
    content: {type: 'string', columnType: 'varchar(200)', allowNull: true},
    type: {type: 'integer', columnType: 'number'},
    messageTime: {type: 'ref', columnType: 'datetime', allowNull: false,  autoUpdatedAt: true },
  },

};

