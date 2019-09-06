const express = require('express');
const router = express.Router();
const db = require('../data/helpers/actionModel.js')

router.use(express.json())

//get()
router.get('/', (req, res) => {
    db.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'The action information could not be retrieved'})
    })
    
})

//insert()
router.post('/', validateAction, (req, res) => {
    db.insert({
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes,
    })
    .then(response => {
        res.status(201).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
        .json({errorMessage: 'There was an error while saving the action to the database'})
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
            .json({errorMessage: 'There was an error while saving the action to the database'})
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
                .json({message: 'the action was deleted.'})
            } else {
                res.status(404)
                .json({ message: 'The item with the specified ID does not exist.' })
            }
        })
        .catch(() => {
            res
            .status(500)
            .json({ errorMessage: 'The action could not be removed' })
        })
})


function validateAction(req, res, next) {
    if(!req) res.status(400).json({ message: "missing post data" })
    if(!req.body.project_id) res.status(400).json({ message: "missing required project_id field" })
    if(!req.body.description) res.status(400).json({ message: "missing required description field" })
    if(!req.body.notes) res.status(400).json({ message: "missing required notes field" })
    next()
}

module.exports = router;