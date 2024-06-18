const  mongoose = require ('mongoose');
mongoose.connect('mymongourl')
const AdminSchema = new mongoose.Schema({
email: String,
password: String,
})

const AdminModel = mongoose.model('admin', AdminSchema);

  module.exports = {AdminModel}