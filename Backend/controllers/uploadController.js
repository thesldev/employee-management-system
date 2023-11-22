import File from "../models/fileSubmitModel.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, path } = req.file;

    const newFile = new File({
      name: originalname,
      img: {
        data: path,
        contentType: "image/png", // Update the contentType as needed
      },
    });

    const savedFile = await newFile.save();
    res.status(201).json({ message: "File uploaded successfully", file: savedFile });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.sendFile(file.img.data);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({ message: "Error retrieving file", error: error.message });
  }
};
