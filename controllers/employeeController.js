const Employee=require("../model/manrega");
const exec=require("child_process").exec;
const path=require('path');
module.exports={
    create:async function(req,res){
        try {
            console.log("Create employee");
            const {aadharNumber,firstName,middleName,lastName,empId,doB}=req.body;
            const employeeExists=await Employee.findOne({
                empId
            })

            if(employeeExists){
                return res.send({
                    success:false,
                    message:"Employee already exists"
                })
            }
            await Employee.create({
                aadharNumber,firstName,middleName,lastName,empId,doB
            })
            console.log(employeeExists)
            res.send({
                success:true,
                message:"employee created"
            })
        } catch (error) {
            console.log(error)
            res.send({
                success:false,
                message:"Error in creating employee"
            })
        }
    },
    getAllEmployees:async function(req,res){
        try {
            const employees=await Employee.find();
            return res.send({
                success:true,
                message:"List of all employees",
                data:employees
            })
            
        } catch (error) {
            res.send({
                success:false,
                message:"Error in getting employees"
            })
        }
    },
    runScript:async function(req,res){
        try {
            const scriptFile=path.join(__dirname,"../helper/script.py")
            new Promise(function(resolve,reject){
               const process= exec(`py script.py`, (err, stdout, stderr) => {  
                    if (err) {  
                        reject(err)
                    }  
                    console.log({stdout})
                    resolve(stdout.trim())
                
                  });

                  process.stdout.on('data',function(data){
                    console.log(data)
                })

            });

 

            res.send({
                success:true,
                message:"Running py script"
            })
            
        } catch (error) {
            console.log(error)
            res.send({
                success:false,
                message:"Error in running script"
            })
        }
    }
}