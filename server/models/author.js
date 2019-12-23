'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {});
  Author.associate = function(models) {
    Author.belongsToMany(models.Book, {through: models.Author_Books});
  };
  return Author;
};
