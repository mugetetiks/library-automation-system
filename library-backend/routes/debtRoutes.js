const express = require('express');
const router = express.Router();
const { markAsDebt, getOverdueBooks, confirmPayment } = require('../controllers/debtController'); // confirmPayment fonksiyonunu ekleyin
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/mark-as-debt', verifyToken, markAsDebt);
router.get('/overdue-books', verifyToken, getOverdueBooks);
router.delete('/confirm-payment/:reservation_id', verifyToken, confirmPayment); // confirm payment rotasını ekleyin

module.exports = router;
