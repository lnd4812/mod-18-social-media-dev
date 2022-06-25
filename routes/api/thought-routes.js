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
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);    
   
router
    .route('/:userId')
    .post(addThought);

// router
//     .post('/:userId/:thoughtId')    
//     .put(updateThought)
//     .delete(deleteThought);

router
 .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(deleteReaction);    

module.exports = router;