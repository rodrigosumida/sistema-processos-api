const Processo = require("../models/processo.model");

class ProcessoController {
  async create(req, res) {
    try {
      const processo = await Processo.create(req.body);
      if (!processo)
        return res.status(406).json({ error: "Error create processo." });
      return res.status(200).json(processo);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async list(req, res) {
    try {
      const processo = await Processo.find({})
        .populate("estruturaCargos")
        .populate("area");
      if (!processo)
        return res.status(406).json({ error: "Error list processo." });
      return res.status(200).json(processo);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async search(req, res) {
    try {
      const { id } = req.params;
      const data = await Processo.findById(id).populate("estruturaCargos");
      if (!data)
        return res.status(406).json({ error: "Error search processo." });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      const processo = await Processo.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!processo)
        return res.status(406).json({ error: "Error update processo." });
      return res.status(200).json(processo);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const processo = await Processo.findByIdAndRemove(req.params.id);
      if (!processo)
        return res.status(406).json({ error: "Error delete processo." });
      return res.status(200).json(processo);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async test(req, res) {
    res.send("Test processo!!!");
  }
}

module.exports = ProcessoController;
