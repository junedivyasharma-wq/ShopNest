import {Router} from "express";
import {verify} from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import {createOrder, getOrders, getOrderById, updateOrderStatus} from "../controller/order.controller.js";  
 
const router =Router();
router.route('/').post(verify, createOrder).get(verify, admin, getOrders);
router.route('/myorders').get(verify, getOrderById);
router.route('/:id/Status').put(verify, admin, updateOrderStatus);

export default router;

