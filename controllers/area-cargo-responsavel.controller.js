const AreaCargoResponsavel = require("../models/area-cargo-responsavel.model");

class AreaCargoResponsavelController {
  async create(req, res) {
    try {
      const areaCargoResponsavel = await AreaCargoResponsavel.create(req.body);
      if (!areaCargoResponsavel)
        return res
          .status(406)
          .json({ error: "Error create areaCargoResponsavel." });
      return res.status(200).json(areaCargoResponsavel);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async list(req, res) {
    try {
      const areaCargoResponsavel = await AreaCargoResponsavel.find({})
        .populate("area")
        .populate("cargo")
        .populate("responsavel");
      if (!areaCargoResponsavel)
        return res
          .status(406)
          .json({ error: "Error list areaCargoResponsavel." });
      return res.status(200).json(areaCargoResponsavel);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async search(req, res) {
    try {
      const { id } = req.params;
      const data = await AreaCargoResponsavel.findById(id)
        .populate("area")
        .populate("cargo")
        .populate("responsavel");
      if (!data)
        return res
          .status(406)
          .json({ error: "Error search areaCargoResponsavel." });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      const areaCargoResponsavel = await AreaCargoResponsavel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        }
      );
      if (!areaCargoResponsavel)
        return res
          .status(406)
          .json({ error: "Error update areaCargoResponsavel." });
      return res.status(200).json(areaCargoResponsavel);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const areaCargoResponsavel = await AreaCargoResponsavel.findByIdAndRemove(
        req.params.id
      );
      if (!areaCargoResponsavel)
        return res
          .status(406)
          .json({ error: "Error delete areaCargoResponsavel." });
      return res.status(200).json(areaCargoResponsavel);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async test(req, res) {
    res.send("Test areaCargoResponsavel!!!");
  }
}

module.exports = AreaCargoResponsavelController;
