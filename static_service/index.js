const express = require('express');
const router = express.Router();

router.use(express.static(path.join(__dirname, './public/')));

router.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

module.exports = router;