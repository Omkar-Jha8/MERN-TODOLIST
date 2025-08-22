import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("error connecting to MongoDB",error);
        process.exit(1) // Exit with failure
    }
}