const Edificio = require("../models/Edificio");
const Sequelize = require("sequelize");
module.exports = {
  async index(req, res) {
    const { nome } = req.headers;
    console.log("hos");
    const Op = Sequelize.Op; // biblioteca de operadores
    var query = `${nome}%`; // string de consulta

    const edificio = await Edificio.findAll({
      where: { nome: { [Op.iLike]: query } }
    });

    return res.json(edificio);
  },

  async store(req, res) {
    const { nome, latitude, longitude, descricao, imagem } = req.body;
    const edificio = await Edificio.create({
      nome,
      imagem,
      latitude,
      longitude,
      descricao
    });

    return res.json(edificio);
  }
};
