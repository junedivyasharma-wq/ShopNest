import {Router} from "express";
import {createdOrder, verifyPayment} from "../controller/payment.controller.js";

const router= Router();

router.post('/order',createdOrder);
router.post('/verify',verifyPayment);

export default router;