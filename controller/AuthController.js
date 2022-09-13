const Auth = require("../model/Auth")

module.exports = {
    login: async (req, res)=>{
        try{
            const results = await Auth.login(req, res)
            return res.status(201).send(results)
        }catch (error){
            return res.status(400).send(error)
        }
    },
    register: async (req, res)=>{
        try{
            const results = await Auth.register(req, res)
            return res.status(201).send(results)
        }catch(error){
            return res.status(400).send(error)
        }
    }
}

