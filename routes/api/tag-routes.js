const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// FIND ALL TAGS
router.get("/", (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Tags page not found" });
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// FIND ONE TAG BY ID
router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Tags not found" });
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// CREATE A NEW TAG
router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((data) => res.json(data))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// UPDATE A TAG BY ITS ID
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No tag found with this id" });
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// DELETE A TAG BY ITS ID
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
