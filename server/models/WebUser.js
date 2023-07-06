const { default: mongoose,Schema } = require("mongoose");

const WebUserSchema = new Schema({
  email: String,
  password: String,
  name: String,
  username: String,
  code: String,
  codeExpire: Date,
  forgotPassword: Number,
  isActive: {
    type: Boolean,
    default: false,
  },
  codeCounter: {
    type: Number,
    default: 3,
  },
});

const WebUser = mongoose.model("WebUser", WebUserSchema);

module.exports = {
  WebUser,
};
