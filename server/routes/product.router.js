import {Router} from "express";
import {verify} from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../controller/product.controller.js";
import { upload} from "../middleware/multer.middleware.js";
const router=Router();

router.route('/').get(getProducts).post(verify, admin, upload.single("image"), createProduct);

router.route('/:id').get(getProductById).put(verify, admin, upload.single("image"), updateProduct).delete(verify, admin, deleteProduct);




export default router;