const router = require('express').Router();
const { getAllUser, getUserById, createUser, updateUser, deleteUser } = require('../../controllers/user-controller');

// set up api routes
router
    .route('/')
    .get(getAllUser)
    .post(createUser);
    
// set up api routes specific to "id"
router
    .route('./:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

    module.exports = router;