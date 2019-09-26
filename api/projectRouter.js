const express = require('express');
const router = express.Router();
const db = require('../data/helpers/projectModel.js')

router.use(express.json())

//get()
router.get('/', (req, res) => {
    db.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: 'The project information could not be retrieved'})
    })
})

//insret()
router.post('/', validateProject, (req, res) => {
    db.insert({
        name: req.body.name,
        description: req.body.description
    })
    .then(response => {
        res.status(201).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
        .json({errorMessage: 'There was an error while saving the project to the database'})
    })
})
//update()
router.put('/:id', (req, res) => {
    const  id  = req.params.id;
    const  change  = req.body;
    if(!id) {
        res.status(404).json({ errorMessage: 'id not found'})
    } else {
        db.update(id, change)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            res.status(500)
            .json({errorMessage: 'There was an error while saving the project to the database'})
        })
    }
})
//remove()
router.delete('/:id', (req, res) => {
    const id = req.params.id
        db.remove(id) 
        .then(response => {
            if(response && response > 0) {
                res.status(200)
                .json({message: 'the project was deleted.'})
            } else {
                res.status(404)
                .json({ message: 'The item with the specified ID does not exist.' })
            }
        })
        .catch(() => {
            res
            .status(500)
            .json({ errorMessage: 'The project could not be removed' })
        })
})
//getProjectActions()
router.get('/:id/actions', (req, res) => {
    const  id  = req.params.id;
    const project_id = req.body.project_id;
    if(!id){
        res.status(404)
        .json({ message: 'The post comments with the specified ID does not exist.'})
    } else {
        db.getProjectActions(id, project_id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
            res.status(500)
            .json({ errorMessage: 'The actions information could not be retrieved.' });
        })
    }
})

function validateProject(req, res, next) {
    if(!req) res.status(400).json({ message: "missing post data" })
    if(!req.body.name) res.status(400).json({ message: "missing required name field" })
    if(!req.body.description) res.status(400).json({ message: "missing required description field" })
    next()
}

module.exports = router;