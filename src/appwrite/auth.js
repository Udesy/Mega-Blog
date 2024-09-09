import confi from "../confi/confi";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(confi.appwriteURL)
            .setProject(confi.appwriteProjectId);
 
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                //we will call method
                return this.login({email, password})
            } else {
                return userAccount;
        } 
        }catch (error) {
            return error
    }
}

    async login({email, password}){
        try {
           return await this.account.createEmailPasswordSession(email, password) 
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try{
           return await this.account.get()
        }catch (error){
            console.log("Appwrite server :: getCurrentUser :: error", error);
            
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions()
        }catch (error){
            console.log("Appwrite server :: logout :: error", error);
            
        }
    }
}

const authservice = new AuthService()

export default authservice