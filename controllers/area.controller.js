const Area = require("../models/area.model");

class AreaController {
  async create(req, res) {
    try {
      const area = await Area.create(req.body);
      if (!area) return res.status(406).json({ error: "Error create area." });
      return res.status(200).json(area);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async list(req, res) {
    try {
      const area = await Area.find({});
      if (!area) return res.status(406).json({ error: "Error list area." });
      return res.status(200).json(area);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async search(req, res) {
    try {
      const { id } = req.params;
      const data = await Area.findById(id);
      if (!data) return res.status(406).json({ error: "Error search area." });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      const area = await Area.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!area) return res.status(406).json({ error: "Error update area." });
      return res.status(200).json(area);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const area = await Area.findByIdAndRemove(req.params.id);
      if (!area) return res.status(406).json({ error: "Error delete area." });
      return res.status(200).json(area);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async test(req, res) {
    res.send("Test area!!!");
  }
}

module.exports = AreaController;
