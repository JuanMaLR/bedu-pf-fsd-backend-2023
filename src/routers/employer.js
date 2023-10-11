const express = require('express');
const router = express.Router();
const {
  getEmployers,
  getEmployer,
  createEmployer,
  updateEmployer,
  deleteEmployer,
} = require('../controllers/employer');

router.get('/employer', getEmployers);
router.get('/employer/:id', getEmployer);
router.post('/employer', createEmployer);
router.put('/employer/:id', updateEmployer);
router.delete('/employer/:id', deleteEmployer);

module.exports = router;
