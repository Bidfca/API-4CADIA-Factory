const Transaction = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    description: DataTypes.STRING,
    value: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
  },
  {
    updatedAt: false,
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Transaction;
};

module.exports = Transaction;