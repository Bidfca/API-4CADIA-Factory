const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.FLOAT,
  }, 
  {
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Transaction, { foreignKey: 'userId', as: 'extracts' });
  };

  return User;
};

module.exports = User;