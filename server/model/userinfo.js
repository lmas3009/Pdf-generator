import mongoose from 'mongoose'

const Userinfo = mongoose.Schema({
    Username: String,
    EmailId: String,
    Phoneno: String,
    Address: String,
    Pincode: String,
    Landmark: String
})
export default mongoose.model("userdetails",Userinfo)
