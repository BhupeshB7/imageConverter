import { Client, Account, ID } from "appwrite";
import {
  APPWRITE_COLLECTION_ID,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
} from "./appwritekey.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name, phone }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
        phone
      );
      try {
        console.log("Phone number", phone);
        console.log("User ID", userAccount.$id);
        const encodedPhone = encodeURIComponent(phone);
        console.log("Encoded Phone", encodedPhone);
        await this.account.updatePhone(userAccount.$id, encodedPhone);
      } catch (error) {
        console.log("Error", error);
      }

      await this.account.createVerification(
        "http://localhost:3000/verify-email"
      );

      // res.status(StatusCodes.OK).json(userAccount);
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(userId, secret) {
    try {
      const verificationResponse = await this.account.updateVerification(
        userId,
        secret
      );
      return verificationResponse;
    } catch (error) {
      throw error;
    }
  }
 async deleteCurrentSession() {
   try {
     await this.account.deleteSessions();
   } catch (error) {
     console.log("Appwrite service :: deleteCurrentSession :: error", error);
   }
 }
  async login({ email, password }) {
    try {
      console.log("Email", email);
      console.log("Password", password);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async loginWithGoogle() {
    try {
      const response = await this.account.createOAuth2Session(
        "google",
        // "http://192.168.142.16:3000/",
        "http://localhost:3000",
        // "http://localhost:3000/google-loginFail"
      );
      console.log("Google Login Response", response);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log("User fetched successfully:", user);
      return user;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
  //
}

const authService = new AuthService();
export default authService;
