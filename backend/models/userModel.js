const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://codeide:321@cluster0.skl3cvq.mongodb.net/codeIDE?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isblocked: {
    type: Boolean,
    default: false,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
