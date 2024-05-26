import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
    domainUrl: {
        type: String,
        required: true,
        unique:true
    },
    recordType: {
        type: String,
        required:true,
    },
    name: {
        type: String,
        required:true
    },
    value: {
        type: String,
        required:true
    }
})

const Record = mongoose.model('Record', RecordSchema)
export default Record;