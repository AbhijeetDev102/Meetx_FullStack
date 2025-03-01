const express = require('express');
const { callAI } = require('../controller/CallAi');
const { createToken } = require('../controller/Token');
const { generatePdf } = require('../controller/generate-pdf');

const router = express.Router();

// router.get('/endCall', callAI)
router.post('/createToken', createToken)
router.get('/generate-pdf', generatePdf)

module.exports = router;