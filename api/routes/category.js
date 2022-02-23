// const {
//   createCategory,
//   showCategories,
// } = require("../controllers/CategoryController");

const Category = require("../models/Category");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const newCategory = await new Category({
      name: req.body.c_name,
    });

    const cat = await newCategory.save();

    res.status(200).json({ data: cat });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
});
// router.get("/", showCategories);

module.exports = router;
