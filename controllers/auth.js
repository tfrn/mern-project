const AuthSchema = require('../models/auth');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async(req, res)=>{
    try{
        const {username, password, email} = req.body;
        const user = await AuthSchema.findOne({ email: email });;
        if(user){
            return res.status(500).json({msg: "daha önceden bu hesapla kayıt yapılmış!" })
        }
        if(password.length < 6){
            return res.status(500).json({msg: "şifre en az 6 karakter olmalı!"});
        }  
        if (!isEmail(email)) {
            return res.status(500).json({msg: "Email adresi geçerli değildir"});
          }
        const passwordhash = await bcrypt.hash(password, 12); 

        const newUser = await AuthSchema.create({username, email, password: passwordhash});
        
        const token = jwt.sign({id: newUser._id}, "SECRET_KEY", {expiresIn: '1h'})
        res.status(201).json({
            status:"201",
            newUser,
            token
        }) 

    }catch(error){
        return res.status(500).json({msg: error.message})
    }
};

const login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await AuthSchema.findOne({email:email});
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!user){
            return res.status(500).json({msg:"kullanıcı bulunamadı!"});
        };        
        if(!passwordCompare){
            return res.status(500).json({msg:"şifre hatalı!"});
        }
        const token = jwt.sign({id:user._id}, "SECRET_KEY", {expiresIn: '1h'});
        res.status(200).json({
            status:"200",
            user,
            token
        }) 
    }catch(error){
        return res.status(500).json({msg: error.message})
    }
}

function isEmail(emailAdress) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailAdress.match(regex))
    return true;
    else
    return false; 
}

module.exports = {register, login};