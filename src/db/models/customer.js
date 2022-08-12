const mongoose = require("mongoose");
const validator = require("validator");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value, "en-PK")) {
        throw new Error("Invalid Phone Number");
      }
    },
  },
  licenseId: {
    type: String,
    required: true,
    trim: true,
  },
});
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
