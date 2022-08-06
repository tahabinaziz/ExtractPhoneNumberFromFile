const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*Post file*/
router.post("/phonenumbers/upload",controller.uploadFile);

/*Get all phone number */
router.get("/phonenumbers/",controller.phonenumbers);

/*Get phone number by taskId */
router.get("/phonenumbers/:taskId",controller.phonenumbersByTaskId);

/*Delete phone number by taskId */
router.delete("/phonenumbers/:taskId",controller.deletephonenumbersByTaskId);

module.exports = router;