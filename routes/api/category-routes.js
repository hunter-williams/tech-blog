const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', (req, res) => {
    Category.findAll({include:[Product]})
        .then(categoryData => res.json(categoryData))
        .catch(err => res.json(err))
});

// get one category 
router.get('/:id', (req, res) => {
    Category.findOne({ where: { id:req.params.id }, include:[Product]})
        .then(categoryData => res.json(categoryData))
        .catch(err => res.json(err))
});

// create a category
router.post('/', (req, res) => {
    Category.create(req.body)
        .then(categoryData => res.json(categoryData))
        .catch(err => res.json(err))
});

/*  
    {
        "category_name": "TestCategory",
    }
*/

// update a category
router.put('/:id', (req, res) => {
    Category.update(req.body,{ where: { id:req.params.id }} )
        .then(categoryData => res.json(categoryData))
        .catch(err => res.json(err))
});

// delete a category
router.delete('/:id', (req, res) => {
    Category.destroy({ where: { id:req.params.id}} )
        .then(categoryData => res.json(categoryData))
        .catch(err => res.json(err))
});

module.exports = router;
