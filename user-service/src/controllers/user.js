const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');

const User = require('../models/user');
const tokenGenereator = require('../utils/jwt-token-generator');

module.exports.signup = async(req,res) => {
    try{
        const {email, password} = req.body;

        //check for user existance
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({message: "Email ID already registered"});
        }

        //encrypt password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email:email, password:hashedPassword});
        await newUser.save();

        return res.status(201).json({message: "User account created."});
    }catch(err){
        console.log("User-service :: Sign-up error :: ", err);
        res.status(500).json({error: 'Internal server error while signup'});
    }
}

module.exports.signin = async(req,res) => {
    try{
        const {email, password} = req.body;

        const existingUser = await User.findOne({email: email});
        if(existingUser){
            //user email exists => verify password
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if(passwordMatch){
                const cryptr = new Cryptr(process.env.CRYPT_SECRET);
                const encryptedUserData = cryptr.encrypt(JSON.stringify(existingUser));
                const expirationTimeInSeconds = 3600;
                const tokenExpiry = Math.floor(Date.now() / 1000) + expirationTimeInSeconds;
                const jwtToken = tokenGenereator({user: encryptedUserData, exp: tokenExpiry});
                return res.status(201).json({token: jwtToken, message: "User login success."});
            }
            else{
                return res.status(401).json({error: "Incorrect user password."});
            }
        }
        else{
            //user email doesn't exist
            return res.status(404).json({error: "Email not found."});
        }
    }
    catch(err){
        console.log('User-service :: Sign-in error :: ',err);
        res.status(500).json({error: 'Internal server error while signin'});
    }
}


// exports.getUserInfo = async(req, res, next) => {
//     try{
//         let timelinecode = req.query.timelinecode;
//         if(!timelinecode)
//             return res.status(200).json({username: req.user.username, email: req.user.email});

//         let total_expense = 0;
//         const currentDate = new Date();
//         const firstDateOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0));
//         const firstDateOfYear = new Date(Date.UTC(currentDate.getFullYear(), 0, 1, 0, 0, 0, 0));

//         if(timelinecode == 0)
//             total_expense = req.user.total_expense;
//         else if(timelinecode==1){
//             const yearExpense = await Expense.find({userId: req.user._id, date: {$gt: firstDateOfYear}}).select('amount -_id').lean();
//             total_expense = yearExpense.reduce((sum, expense)=> sum+expense.amount,0);
//         }
            
//         else if(timelinecode == 2){
//             const monthExpense = await Expense.find({userId: req.user._id, date: {$gt: firstDateOfMonth}}).select('amount -_id').lean();
//             total_expense = monthExpense.reduce((sum, expense)=> sum+expense.amount,0);
//         }
//         res.status(200).json({username: req.user.username, email: req.user.email, filtered_expense: total_expense});
//     }
//     catch(err){
//         console.log('getUserInfo error: ',err);
//         res.status(500).json({error: 'Internal server error while signin'});
//     }
// }

