const db = require ('../config/dbconfig')
const Customer = db.Customer

//===============================POST==================================
exports.create = (req,res) => {
    let customer = {}
    try{
        //manggil dari request body
        customer.firstname = req.body.firstname
        customer.lastname = req.body.lastname
        customer.age = req.body.age
                //{firstname,lastname,age} = req.body terserah
                //harusnya await


        //save ke database
        Customer.create(customer).then(result => {
            res.status(200).json({
                message: `succesfully create a customer with ID = `+ result.id,
                customer: result
            })
        })
    }catch(error){
        res.status(500).json({
            message : 'fail',
            error : error.message
        })
    }

}
//===============================GET==================================
exports.getAll = (req,res) => {
    Customer.findAll()
    .then(customerinfos => {
        res.status(200).json({
            message: 'Get all customers info',
            customers : customerinfos
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message : 'error',
            error: error
        })
    })
}
exports.getCustomerById = (req,res) => {
   // let customerId = req.params.id
    const {id} = req.params

    Customer.findOne({where: {id : id}})
    //Customer.findByPk(customerId) terserah make yg mana
    .then(customer => {
        res.status(200).json({
            message : `Succesfully get customer with ID = ${id}`, //+ customerId,
            customers: customer 
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'error',
            error: error
        })
    })
    
}
//==============================UPDATE================================
exports.updateById = async(req,res) => {
    let updateObj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
           } 
    
    try{
    const customerId = req.params.id
    const cust = await Customer.findByPk(customerId)
    
    // kalo IDnya gk ketemu
    if(!cust){ //kalo tidak ketemu
        res.status(404).json({
            message: `Cannot Find ID = ${customerId}`,
            customer: '',
            error: '404'
        })
    }else{      
        let result = await Customer.update(updateObj, {where: {id : customerId}})
    //cuma status berhasil update apa nggak
    if(!result)
        { //gagal update
        res.status(500).json({
            message : `Cant Update customer with ID= ${req.params.id}`,
            error: 'Cant Update'
        })
        }
    }
    res.status(200).json({
        message:`Update Succesfully with ID = ${customerId}`,
        customer: updateObj
    })

}catch(error){
    res.status(500).json({
        message: `Cannot Update customer with ID = ${req.params.id}`,
        error: error.message
    })
}
    
}
//==============================DELETE================================
exports.deleteById = async(req,res) => {
try{
    const customerId = req.params.id
    const customer = await Customer.findByPk(customerId)
    if(!customer){
        res.status(404).json({
            message: `Customer with ID =${customerId} doesnt exist`,
            error: '404'
        })
    }else{
        await customer.destroy()
            res.status(200).json({
                message:`Delete succes with id = ${customerId}`,
                customer : customer
            })
        }
}catch(error){
    res.status(500).json({
        message: `Cannot Delete Customer with id = ${req.params.id}`,
        error: error.message
    })

}
    
}