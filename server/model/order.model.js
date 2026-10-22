import mongoose,{Schema} from "mongoose";

const orderSchema= new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[
        {
            productID:{
                type: Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            qty:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true  
    },
    address:{
        fullName:{
            type:String,
            required:true},
        street:{
            type:String,
            required:true}, 
        city:{
            type:String,
            required:true},
        postalCode:{
            type:String,
            required:true},
        country:{
            type:String,
            required:true}
    },
    paymentID:{ type:String},
    status:{
        type:String,
        enum:['pending','shipped','delivered'],
        default:'pending'
    },
})


export const order= mongoose.model("order",orderSchema);