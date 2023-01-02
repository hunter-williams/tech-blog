const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', (req, res) => {
    Tag.findAll({ include: [{ model:Product, through:ProductTag }] })
        .then(tagData => res.json(tagData))
        .catch(err => res.json(err))
  });
  
// get one tag
router.get('/:id', (req, res) => {
    Tag.findOne({ include: [{ model:Product, through:ProductTag }], where:{ id:req.params.id }})
        .then(tagData => res.json(tagData))
        .catch(err => res.json(err))
});

// create a tag
router.post('/', (req, res) => {
    Tag.create(req.body)
        .then(tagData => res.json(tagData))
        .catch(err => res.json(err))
});

/*  
    {
        "tag_name": "TestTag",
    }
*/

// upadte a tag
router.put('/:id', (req, res) => {
    Tag.update(req.body, { where: { id:req.params.id }} )
        .then(tagData => res.json(tagData))
        .catch(err => res.json(err))
});

// delete a tag
router.delete('/:id', (req, res) => {
    Tag.destroy({ where: { id: req.params.id }} )
        .then(tagData => res.json(tagData))
        .catch(err => res.json(err))
});

module.exports = router;
