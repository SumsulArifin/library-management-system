import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import dotenv from 'dotenv';

dotenv.config(); // Load env variables

let server: Server;

const PORT = process.env.PORT || 5000;

async function main() {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string);
        console.log("Connected to MongoDB Using Mongoose!!");

        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

main();

// import mongoose from 'mongoose';

// import { Server } from 'http';
// import app from './app';


// let server: Server;

// const PORT = 5000;

// async function main() {
//     try {
//         await mongoose.connect('mongodb+srv://imranarifin03:3EE5JugdIJZvp8pE@cluster0.gfp4in3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
//         console.log("Connected to MongoDB Using Mongoose!!");
//         server = app.listen(PORT, () => {
//             console.log(`App is listening on port ${PORT}`);
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// main()