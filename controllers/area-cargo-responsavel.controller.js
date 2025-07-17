const AreaCargoResponsavel = require("../models/area-cargo-responsavel.model");
const Area = require("../models/area.model");

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

  async createFromGrouped(req, res) {
    try {
      const { nome, cargos } = req.body;

      const novaArea = await Area.create({ nome });
      if (!novaArea) {
        return res.status(500).json({ error: "Erro ao criar a área." });
      }

      const registros = await Promise.all(
        cargos.map((item) =>
          AreaCargoResponsavel.create({
            area: novaArea._id,
            cargo: item.cargo._id,
            responsavel: item.responsavel._id,
          })
        )
      );

      return res.status(201).json({
        message: "Área e cargos criados com sucesso!",
        area: novaArea,
        registros,
      });
    } catch (error) {
      console.error("Erro em createFromGrouped:", error);
      return res.status(400).json({ error: "Erro ao criar área e cargos." });
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

  async listGroupArea(req, res) {
    try {
      const data = await AreaCargoResponsavel.find({})
        .populate("area")
        .populate("cargo")
        .populate("responsavel");

      const grouped = {};

      data.forEach((item) => {
        const areaId = item.area._id.toString();
        if (!grouped[areaId]) {
          grouped[areaId] = {
            area: item.area,
            cargos: [],
          };
        }
        grouped[areaId].cargos.push({
          _id: item._id,
          cargo: item.cargo,
          responsavel: item.responsavel,
        });
      });

      const result = Object.values(grouped);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao buscar dados." });
    }
  }

  async listGroupAreaByAreaId(req, res) {
    try {
      const { area } = req.params;

      const data = await AreaCargoResponsavel.find({ area })
        .populate("area")
        .populate("cargo")
        .populate("responsavel");

      if (!data || data.length === 0) {
        return res
          .status(404)
          .json({ error: "Nenhum dado encontrado para esta área." });
      }

      const grouped = {
        area: data[0].area,
        cargos: [],
      };

      data.forEach((item) => {
        grouped.cargos.push({
          _id: item._id,
          cargo: item.cargo,
          responsavel: item.responsavel,
        });
      });

      return res.status(200).json(grouped);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao buscar dados." });
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

  async searchArea(req, res) {
    try {
      const { area } = req.params;
      const data = await AreaCargoResponsavel.find({ area })
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

  async updateGrouped(req, res) {
    try {
      const { _id: areaId, nome, cargos } = req.body;
      console.log(areaId, nome, cargos);

      // 1. Atualiza o nome da área
      const updatedArea = await Area.findByIdAndUpdate(
        areaId,
        { nome },
        { new: true }
      );
      if (!updatedArea) {
        return res.status(404).json({ error: "Área não encontrada." });
      }

      // 2. Busca os cargos atuais vinculados à área
      const registrosAtuais = await AreaCargoResponsavel.find({ area: areaId });

      // Cria mapas para facilitar a comparação
      const entradaMap = new Map(
        cargos.map((item) => [`${item.cargo._id}`, item.responsavel._id])
      );
      const atualMap = new Map(
        registrosAtuais.map((item) => [
          `${item.cargo.toString()}`,
          item.responsavel.toString(),
        ])
      );

      // 3. Determina quais remover, criar ou atualizar
      const aRemover = registrosAtuais.filter(
        (item) => !entradaMap.has(item.cargo.toString())
      );

      const aCriar = cargos.filter((item) => !atualMap.has(item.cargo._id));

      const aAtualizar = registrosAtuais.filter((item) => {
        const novoResp = entradaMap.get(item.cargo.toString());
        return novoResp && novoResp !== item.responsavel.toString();
      });

      // 4. Remove os desnecessários
      await Promise.all(
        aRemover.map((item) => AreaCargoResponsavel.findByIdAndDelete(item._id))
      );

      // 5. Cria os novos
      await Promise.all(
        aCriar.map((item) =>
          AreaCargoResponsavel.create({
            area: areaId,
            cargo: item.cargo._id,
            responsavel: item.responsavel._id,
          })
        )
      );

      // 6. Atualiza os existentes com responsável alterado
      await Promise.all(
        aAtualizar.map((item) => {
          const novoResp = entradaMap.get(item.cargo.toString());
          return AreaCargoResponsavel.findByIdAndUpdate(item._id, {
            responsavel: novoResp,
          });
        })
      );

      return res
        .status(200)
        .json({ message: "Área e cargos atualizados com sucesso!" });
    } catch (error) {
      console.error("Erro em updateGrouped:", error);
      return res
        .status(400)
        .json({ error: "Erro ao atualizar área e cargos." });
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

  async deleteAndReturnGroupedArea(req, res) {
    try {
      const deleted = await AreaCargoResponsavel.findByIdAndRemove(
        req.params.id
      );

      if (!deleted) {
        return res.status(406).json({ error: "Erro ao excluir a instância." });
      }

      const areaId = deleted.area;

      const remaining = await AreaCargoResponsavel.find({ area: areaId })
        .populate("area")
        .populate("cargo")
        .populate("responsavel");

      const grouped = {
        area: remaining[0].area || null,
        cargos: [],
      };

      remaining.forEach((item) => {
        grouped.cargos.push({
          _id: item._id,
          cargo: item.cargo,
          responsavel: item.responsavel,
        });
      });

      return res.status(200).json(grouped);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao excluir e buscar dados." });
    }
  }

  async test(req, res) {
    res.send("Test areaCargoResponsavel!!!");
  }
}

module.exports = AreaCargoResponsavelController;
