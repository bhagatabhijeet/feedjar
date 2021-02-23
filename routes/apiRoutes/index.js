const router= require('express').Router();
// const {jsonToCap} =require('../../controllers/capController');
const {postMockFemaWebDisaster,deleteSingleMockFemaWebDisasterRecord} =require('../../controllers');
const bodyparser = require('body-parser');


// router.route("/cap")
// .post(jsonToCap);


router.route("/femajson")
.post(postMockFemaWebDisaster);


router.route("/femajson/:autoid")
.delete(deleteSingleMockFemaWebDisasterRecord);


module.exports =router;