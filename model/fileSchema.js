const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    image:{
            type: String,
            required: true
        },
    uid:{
      type:String,
      required: true
    }
})

const FileModel = mongoose.model('fileUpload',dataSchema)

module.exports = FileModel