import "dotenv/config"
import razorpay from "razorpay";
import crypto from "crypto";


const createdOrder= async(req,res)=>{
    try{
        const instance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const options={
            amount:req.body.amount*100,
            currency:"INR", 
            receipt:crypto.randomBytes(10).toString("hex"),
        }
        const myOrder= await instance.orders.create(options);
        return res.status(200).json({
            message:"Order created successfully",
            myOrder
        })
    }catch(error){
            console.error("Create order error:", error);
            return res.status(500).json({
                message:"Order creation failed",
                error:error.message
    })}
}

const verifyPayment=async(req,res)=>{
    try{
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        const generated_signature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id+"|"+razorpay_payment_id)
        .digest("hex");

        if(generated_signature===razorpay_signature){
            return res.status(200).json({
                message:"Payment verified successfully",
                success:true
            })
        }
        else{
            return res.status(400).json({
                message:"Payment verification failed",
                success:false
            })
        }
    }catch(error){
        console.error("Verify payment error:", error);
        return res.status(500).json({
            message:"Payment verification failed",
            error:error.message
        })
    }
}

export {createdOrder,verifyPayment}