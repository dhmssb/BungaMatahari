const router = require ('express').Router()

const customers = require('../controllers/controller')

router.post('/customers/create', customers.create)
router.get('/customers/all', customers.getAll)
router.get('/customers/byid/:id', customers.getCustomerById)
router.put('/customers/update/:id', customers.updateById)
router.delete('/customers/delete/:id', customers.deleteById)

module.exports = router