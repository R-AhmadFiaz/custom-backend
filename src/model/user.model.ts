import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken'
import type {SignOptions} from 'jsonwebtoken'


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    fullname: {
        type: String,
        required: true,
        unique: true,
       
    },
    avatar: {
        type: String, //cloudinery
        required: true,
    },
    coverImage: {
        type: String, // cloudnery
       
    },
    password: {
        type: String,
        required: true,
        unique: true,
       
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    resfreshToken: {
        type: String
    }
},{timestamps: true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return 
    this.password = await bcrypt.hash(this.password,10)
    
}
)

userSchema.methods.isPasswordCorrect = async function(password: string) {
    return await bcrypt.compare(password, this.password)
}

const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY as SignOptions['expiresIn']

if (!accessTokenExpiry) {
    throw new Error('cant find refresh token')
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.username
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {expiresIn: accessTokenExpiry}

)
}

const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY as SignOptions['expiresIn']

if (!refreshTokenExpiry) {
    throw new Error('cant find refresh token')
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {expiresIn: refreshTokenExpiry}

)
}

export const User = mongoose.model('User',userSchema);