import mongoose from 'mongoose'

const Billing = mongoose.Schema({
    Username: String,
    Itemname: String,
    Itemimg: String,
    Quantity: String,
    Price: String,
    Checkout: Boolean

})

export default mongoose.model("billing",Billing)
