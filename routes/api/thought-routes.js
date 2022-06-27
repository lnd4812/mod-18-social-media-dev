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

// set up api endpoints for Thought model
router
    .route('/')
    .get(getAllThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought); 
  
router
    .route('/:userId')
    .post(addThought);

router
    .route('/:thoughtId/reactions')    
    .post(addReaction);
 
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);    

module.exports = router;