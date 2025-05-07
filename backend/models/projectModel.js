const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://codeide:321@cluster0.skl3cvq.mongodb.net/codeIDE?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
const projectSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  date: {
    type: Date,
    default: Date.now,
  },
  htmlCode: {
    type: String,
    default: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
            </head>
            <body>
            
            </body>
            </html>`,
  },
  cssCode: {
    type: String,
    default: `*{
                margin:0;
                padding:0;
                box-sizing:border-box;
            }`,
  },
  jsCode: {
    type: String,
    default: `console.log("Hello World")`,
  },
});
module.exports = mongoose.model("Project", projectSchema);
