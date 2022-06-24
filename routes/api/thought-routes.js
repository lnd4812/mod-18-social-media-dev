const router = require('express').Router();
const { addThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thought-controller');

// set up api endpoints for Thought
router.route('/:userId').post(addThought);

router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(deleteThought);

router.route('/:userId/:thoughtId')
    .put(addReaction)
    
router.route('/:userId/:thoughtId/:reactionId').delete(deleteReaction);    

module.exports = router;