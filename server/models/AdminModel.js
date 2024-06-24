const  mongoose = require ('mongoose');
mongoose.connect('mongodburl')
const AdminSchema = new mongoose.Schema({
email: String,
password: Number,
})

const AdminModel = mongoose.model('admin', AdminSchema);

  module.exports = {AdminModel}