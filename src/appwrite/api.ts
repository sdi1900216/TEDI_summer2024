import {ID, Query} from 'appwrite'
import { INewUser } from "../types";
import { account, appwriteConfig, avatars, databases } from "./config";


//προσθέτει ένα καινούργιo account με βάση τα στοιχεία του Sign up, φτιάχνει avatar χρήστη,
//ενώ στην συνέχεια καλεί την saveUserToDB() για να εισάγει τον χρήστη στην βάση

export async function CreateUserAccount(user: INewUser) {
    
    try {
        console.log("Attempting to create user:", user); // Debugging
        const newAccount= await account.create(
            ID.unique(),
            user.email,
            user.password,
            `${user.firstname} ${user.lastname}`
            
        )
        if(!newAccount) { throw Error;}
        const avatarUrl = avatars.getInitials(`${user.firstname} ${user.lastname}`);
        const newUser= await saveUserToDB({
            accountID: newAccount.$id,
            email: newAccount.email,
            name: `${user.firstname} ${user.lastname}`,
            imageURL: avatarUrl
        });
        
        return newUser;
        
    } catch (error) {
        console.log(error);
        return error;
    }

}

export async function saveUserToDB(user: {
    accountID: string;
    email: string;
    name: string;
    imageURL: URL;
}) {
    try {
        const newUser= await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.user_collectionID,
            ID.unique(),
            user
        )
        return newUser;
        
    } catch (error) {
        console.log(error);
    }
}

export async function LoginAccount(user: {email: string, password: string}) {
    try {
        const session= await account.createEmailPasswordSession(user.email, user.password);
        return session;   
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount= await account.get();
        if(!currentAccount) { throw Error}
        const currentUser= await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.user_collectionID,
            [Query.equal('accountID', currentAccount.$id)]
        )
            if(!currentUser) { throw Error}
            return  currentUser.documents[0]
        
    } catch (error) {
        console.log(error);
    }
}

export async function checkActiveSession() {
    try {
        const session = await account.get();
        return session;
    } catch (error) {
        return null; // Δεν υπάρχει ενεργή συνεδρία
    }
}


export async function Logout() {
    try {
        await account.deleteSession('current');  // Αποσυνδέει τον τρέχοντα χρήστη
        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Logout failed:", error);
    }
}
