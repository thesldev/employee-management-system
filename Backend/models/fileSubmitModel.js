import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: String,
  data: Buffer, // Store the file data as a Buffer
  contentType: String,
  originalname: String, // Store the original file name
});

const File = mongoose.model('File', fileSchema);

export default File;
