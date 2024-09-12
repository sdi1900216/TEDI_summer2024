
import {Client, Account, Databases, Storage, Avatars} from 'appwrite'


export const appwriteConfig = {

    projectID: '66df28f10010998e9b7f',
    url: 'https://cloud.appwrite.io/v1',
    storageID: '66e008e3003c5cb7fcce',
    databaseID: '66e0096b001c4ae718ae',
    user_collectionID: '66e00a82000671657fac',
    post_collectionID: '66e00a0a002e1d76b540'
}

export const client =  new Client(); 
client.setProject(appwriteConfig.projectID);
client.setEndpoint(appwriteConfig.url)

export const account =  new Account(client); 
export const databases =  new Databases(client); 
export const storage =  new Storage(client); 
export const avatars =  new Avatars(client); 