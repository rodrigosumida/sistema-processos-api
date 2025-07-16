const Cargo = require("../models/cargo.model");

class CargoController {
  async create(req, res) {
    try {
      const cargo = await Cargo.create(req.body);
      if (!cargo) return res.status(406).json({ error: "Error create cargo." });
      return res.status(200).json(cargo);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async list(req, res) {
    try {
      const cargo = await Cargo.find({});
      if (!cargo) return res.status(406).json({ error: "Error list cargo." });
      return res.status(200).json(cargo);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async search(req, res) {
    try {
      const { id } = req.params;
      const data = await Cargo.findById(id);
      if (!data) return res.status(406).json({ error: "Error search cargo." });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      const cargo = await Cargo.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!cargo) return res.status(406).json({ error: "Error update cargo." });
      return res.status(200).json(cargo);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const cargo = await Cargo.findByIdAndRemove(req.params.id);
      if (!cargo) return res.status(406).json({ error: "Error delete cargo." });
      return res.status(200).json(cargo);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async test(req, res) {
    res.send("Test cargo!!!");
  }
}

module.exports = CargoController;
