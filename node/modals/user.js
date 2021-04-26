const mongoose= require('mongoose');
// const picture= require('./picture');

const userSchema=mongoose.Schema({
    
    firstName:{
        type:String,
        // required:true
    },
    lastName:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pictures:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Picture'
    }]
})
// userSchema.pre('remove',async function(next){
//     await Weather.deleteMany({userId:this._id})
//     next()
// })
module.exports=mongoose.model('User',userSchema) 