import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
const videoSchema = new mongoose.Schema({

    videoFile: {
        type: String, // cloudnery
        required: true,
        
    },
    thumbnail: {
        type: String, // cloudnery
        required: true,
    },
    title: {
        type: String,
        required: true,
       
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // cloudnery
        required: true
       
    },
    views: {
        type: String,
        default: 0
       
    },
    ispublished: [
        {
            type: Boolean,
            default: true

        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});

videoSchema.plugin(aggregatePaginate)



export const Video = mongoose.model('Video',videoSchema);
