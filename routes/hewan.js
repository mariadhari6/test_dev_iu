var express = require('express');
const { getHewan, addHewan, updateHewan } = require('../controllers/hewanController');
var router = express.Router();

router.get('/', getHewan);
router.post('/add', addHewan)
router.put('/update', updateHewan);

module.exports = router;