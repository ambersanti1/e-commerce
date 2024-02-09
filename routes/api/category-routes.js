const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// GET ALL CATEGORIES
router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Categories page not found" });
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// GET ONE CATEGORY
router.get("/:id", (req, res) => {
  Category.findOne({
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
        res.status(404).json({ message: "Categories page not found" });
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// CREATE NEW CATEGORY
  /* req.body should look like this...
    {
      category_name: "Sports",
    }
  */
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((data) => res.json(data))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

//UPDATE A CATEGORY BY ID VALUE
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No category with this id" });
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

//DELETE CATEGORY BY ID VALUE
router.delete("/:id", (req, res) => {
  Category.destroy({
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
