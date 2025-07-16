const Responsavel = require("../models/responsavel.model");

class ResponsavelController {
  async create(req, res) {
    try {
      const responsavel = await Responsavel.create(req.body);
      if (!responsavel)
        return res.status(406).json({ error: "Error create responsavel." });
      return res.status(200).json(responsavel);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async list(req, res) {
    try {
      const responsavel = await Responsavel.find({});
      if (!responsavel)
        return res.status(406).json({ error: "Error list responsavel." });
      return res.status(200).json(responsavel);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async search(req, res) {
    try {
      const { id } = req.params;
      const data = await Responsavel.findById(id);
      if (!data)
        return res.status(406).json({ error: "Error search responsavel." });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      const responsavel = await Responsavel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!responsavel)
        return res.status(406).json({ error: "Error update responsavel." });
      return res.status(200).json(responsavel);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const responsavel = await Responsavel.findByIdAndRemove(req.params.id);
      if (!responsavel)
        return res.status(406).json({ error: "Error delete responsavel." });
      return res.status(200).json(responsavel);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async test(req, res) {
    res.send("Test responsavel!!!");
  }
}

module.exports = ResponsavelController;
