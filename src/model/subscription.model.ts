import mongoose from "mongoose";
import type { channel } from "node:diagnostics_channel";

const subscriptionSchema = new mongoose.Schema(
    {
        subscriber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

    },
    {timestamps: true})

export const subscription = mongoose.model('subscription', subscriptionSchema)

