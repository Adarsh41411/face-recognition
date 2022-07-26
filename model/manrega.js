const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName:{
    type:String,
    default:null,
    required:true
  },
  middleName:{
    type:String,
    default:null
  },
  lastName:{
    type:String,
    default:null,
    required:true
  },
  empId:{
    type:String,
    default:null,
    required:true,
    unique:true
  },
  doB:{
    type:String,
    default:null,
    required:true
  },
  aadharNumber:{
    type:String,
    default:null,
    required:true,
    unique:true
  },
  
});

module.exports = mongoose.model("employeeDetails", employeeSchema);
