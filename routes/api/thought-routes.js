const router = require('express').Router();
const { 
    getAllThought, 
    getThoughtById, 
    addThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    deleteReaction
 } = require('../../controllers/thought-controller');

// set up api endpoints for Thought
router
    .route('/')
    .get(getAllThought);

router
    .route('/:thoughtId')
    .get(getThoughtById);    
  
router
    .route('/:userId')
    .post(addThought);

router
    .route('/:userId/:thoughtId')    
    .post(addReaction)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(deleteReaction);    

module.exports = router;