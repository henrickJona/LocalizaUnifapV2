const { Model, DataTypes } = require("sequelize");

class Edificio extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        imagem: DataTypes.STRING,
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        descricao: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }
}

module.exports = Edificio;
