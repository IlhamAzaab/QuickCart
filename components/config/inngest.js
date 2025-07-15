import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest function to save user data on creation
export const syncUserCreation = inngest.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        // Add logic to save user data
        // Example: await saveUserToDB(event.data);
        const {id,first_name,last_name,email_addresses,image_url
        } = event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+' '+last_name,
            imageUrl:image_url
        }
        await connectDB();
        await Usercreate(userData)
    }
);

// Inngest function to update user data
export const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        // Add logic to update user data
        // Example: await updateUserInDB(event.data);
        const {id,first_name,last_name,email_addresses,image_url
        } = event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+' '+last_name,
            imageUrl:image_url
        }
        
    await connectDB()
    await User.findbyIdAndUpdate(id,userData)
    }
);

// Inngest function to delete user data
export const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-with-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        // Add logic to delete user data
        // Example: await deleteUserFromDB(event.data.id);
        const {id}=event.data;
        await connectDB();
        await User.findByIdAndDelete(id);

    }
);