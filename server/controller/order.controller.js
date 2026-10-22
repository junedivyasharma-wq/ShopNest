import {order} from "../model/order.model.js";
import {Product} from "../model/product.model.js";
import sendEmail from "../utils/email.util.js";
const createOrder=async(req,res)=>{
   const {items, address, totalAmount,paymentID}=req.body;
   if(!items || items.length=== 0 || ! address || !totalAmount){
    return res.status(400).json({
        message:"All the fields are required"
    })
   }

   const user= req.user._id;

   const newOrder=  new order({
    user,
    items,
    totalAmount,
    address,
    paymentID
   })
   if(!newOrder){
    return res.status(400).json({
        message:"Order creation failed"
    })
   }
    await newOrder.save();
    const message=`Your order has been placed successfully. Thank you for your purchase. Your Order has been created. Details are as follows: Order ID: ${newOrder._id}, shipping address: ${address.fullName}, ${address.street}, ${address.city}, ${address.postalCode}, ${address.country}. Total Amount: ${totalAmount}. Payment ID: ${paymentID}. Order Status: ${newOrder.status}.`;
    await sendEmail(req.user.email, "Order Confirmation", message);
    return res.status(201).json({
        newOrder,
        message:"Order Created Successfully"
    })

}

const getOrderById=async(req,res)=>{
    const user=req.user;

    const orders=await order.find({
        user:user._id,
    })

    if(!orders || orders.length===0){
        return res.status(404).json({
            message:"Orders not found",
        })
    }

    return res.status(200).json({
        message:"Orders fetched successfully",
        orders
    })
}

const getOrders=async(req,res)=>{
    const orders= await order.find({}).populate("user", "username email").populate("items.productID", "name price");
    if(!orders || orders.length===0){
        return res.status(404).json({
            message:"Orders not found",
        })
    }
    return res.status(200).json({
        message:"Orders fetched successfully",
        orders
    })
    
}

const updateOrderStatus=async(req,res)=>{
    const {id}=req.params;
    const {Status}=req.body;

    const existingOrder= await order.findById({_id:id});
    if(!existingOrder){
        return res.status(404).json({
            message:"Orders not found"
        })
    }
    
    existingOrder.status= Status,
    await existingOrder.save();

    return res.status(200).json({
        message:"Order status updated successfully",
        existingOrder
    })
}

export {createOrder, getOrders, getOrderById, updateOrderStatus};