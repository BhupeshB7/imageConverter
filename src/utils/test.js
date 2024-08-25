import authService from "./appwriteConfig.js";

async function testPhoneNumberUpdate() {
    try {
      // Step 1: Create the user account
      const userAccount = await authService.createAccount({
        email: "test@example.com",
        password: "password123",
        name: "TestUser",
      });
      console.log("User Account Created:", userAccount);
  
      // Step 2: Log in the user to authenticate
      const session = await authService.account.createSession("test@example.com", "password123");
      console.log("User Logged In:", session);
  
      // Step 3: Update the phone number (requires authenticated user and password)
      const updatedPhone = await authService.account.updatePhone(userAccount.$id, "+918585858585", "password123");
      console.log("Phone Number Updated:", updatedPhone);
  
    } catch (error) {
      console.error("Error during phone number update:", error);
    }
  }
  
  testPhoneNumberUpdate();
  
  