const router = require('express').Router();
const { 
    getAllUser, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend,
   } = require('../../controllers/user-controller');

// set up api routes
router
    .route('/')
    .get(getAllUser)
    .post(createUser);
    
// set up api routes specific to "id"
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
 
// add routes for friends array
router
    .route('/:userId/friends')
    .post(addFriend);
    
router
    .route('/:userId/friends/:friendId')
    .delete(deleteFriend); 
    
module.exports = router;