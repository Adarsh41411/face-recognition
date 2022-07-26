const express=require("express");
const router=express.Router();
const employeeController=require('../controllers/employeeController');

router.post('/create',employeeController.create);
router.get("/getAllEmployees",employeeController.getAllEmployees);
router.get("/script",employeeController.runScript);

module.exports=router;