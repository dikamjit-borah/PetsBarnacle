const express = require('express')
const router = express.Router()
const controllerPet = require('../controllers/controller.pet')
const handleFileUploads = require('../modules/multer/multer.init')

router.post('/add', controllerPet.add)
router.post('/upload', handleFileUploads.single('petFile'), controllerPet.upload)
router.get('/viewAll', controllerPet.viewAll)
router.get('/view/:id', controllerPet.viewPet)
router.patch('/update/:id', controllerPet.updatePet)
router.delete('/delete/:id', controllerPet.deletePet)

module.exports = router