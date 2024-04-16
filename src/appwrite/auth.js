import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite"


class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // Sign Up
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount;
        } catch(error) {
        console.log("Appwrite AuthService :: createAccount() :: Error", error)
    }
}


    // Login
    async login({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.log("Appwrite AuthService :: login() :: Error", error)
    }
}


    // Logout
    async logout() {
    try {
        return await this.account.deleteSessions()
    } catch (error) {
        console.log("Appwrite AuthService :: logout() :: Error", error)
        false;
    }
}


    // Get User Account
    async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite AuthService :: getUser() :: Error", error)
    }
}
}

const authService = new AuthService();

export default authService