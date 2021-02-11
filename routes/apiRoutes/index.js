const router= require('express').Router();
const {jsonToCap} =require('../../controllers/capController');


router.route("/cap")
.post(jsonToCap);

module.exports =router;