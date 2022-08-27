const express = require('express')
const router = express.Router()
const controllerPet = require('../controllers/controller.pet')

router.post('/add', controllerPet.add)
router.get('/viewAll', controllerPet.viewAll)
router.get('/view/:id', controllerPet.viewPet)
router.patch('/update/:id', controllerPet.updatePet)
router.delete('/delete/:id', controllerPet.deletePet)

module.exports = router