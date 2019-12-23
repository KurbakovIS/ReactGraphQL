'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author_Books = sequelize.define('Author_Books', {
  }, {});
  Author_Books.associate = function(models) {
    // associations can be defined here
  };
  return Author_Books;
};
