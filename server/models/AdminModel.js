const  mongoose = require ('mongoose');
mongoose.connect('mongodburlofmine')
const AdminSchema = new mongoose.Schema({
email: String,
password: String,
})

const AdminModel = mongoose.model('admin', AdminSchema);

  module.exports = {AdminModel}