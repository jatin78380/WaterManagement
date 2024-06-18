const  mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://jatin8612:Jatin%40rkblbrrk!12@cluster0.nkvwqm9.mongodb.net/water')
const AdminSchema = new mongoose.Schema({
email: String,
password: String,
})

const AdminModel = mongoose.model('admin', AdminSchema);

  module.exports = {AdminModel}