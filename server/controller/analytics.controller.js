import { order } from "../model/order.model.js";
import {User} from "../model/user.model.js";
import {Product} from "../model/product.model.js";



const getadminStats=async(req,res)=>{
    try{
        const totalusers= await User.countDocuments({role:'user'});
        const totalorders= await order.countDocuments({});
        const totalproducts= await Product.countDocuments({});

        const  orders= await order.find({});
        const totalRevenueData= orders.reduce((acc,curr)=>{
            return acc+curr.totalAmount;
        },0);

        return res.status(200).json({
            totalusers,
            totalorders,
            totalproducts,
            totalRevenue:totalRevenueData
        })
    }catch(error){
        throw new Error(error);
    }
}
export {getadminStats};