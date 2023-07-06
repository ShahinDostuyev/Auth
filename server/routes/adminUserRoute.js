const expres = require('express');
const { adminUserController } = require('../controllers/adminUserController');


const adminUserRoutes = expres.Router();



adminUserRoutes.post('/', adminUserController.add)
adminUserRoutes.get('/', adminUserController.getAll)
adminUserRoutes.delete('/:id', adminUserController.delete)




module.exports = {
    adminUserRoutes
}