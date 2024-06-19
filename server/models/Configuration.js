const  mongoose = require ('mongoose');
mongoose.connect('mongodburlofmine')
const ConfigurationSchema= new mongoose.Schema({
tankname: String,
tankcapacity: Number,
location: String,
threshold: Number,
})

const ConfigurationModel = mongoose.model('configuration', ConfigurationSchema);

  module.exports = {ConfigurationModel}