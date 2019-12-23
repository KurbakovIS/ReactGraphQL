'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    release_date:DataTypes.DATE
  }, {});
  Book.associate = function(models) {
    Book.belongsToMany(models.Author, {through: models.Author_Books});
    Book.hasMany(models.Comment)
  };
  return Book;
};
