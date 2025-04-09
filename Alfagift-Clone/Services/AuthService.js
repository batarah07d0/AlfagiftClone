// Simple authentication service

// Demo user credentials
const DEMO_USER = {
  phone: "081234567890",
  password: "password123",
  name: "User Demo",
  email: "user@example.com",
};

// Mock user database - in a real app, this would be stored on a server
const users = [DEMO_USER];

/**
 * Authenticate a user with phone and password
 * @param {string} phone User's phone number
 * @param {string} password User's password
 * @returns {Object} Result with success status and user data or error message
 */
export const login = (phone, password) => {
  // Check if user exists and password is correct
  const user = users.find(
    (user) => user.phone === phone && user.password === password
  );

  if (user) {
    // In a real app, this would save a token in AsyncStorage
    console.log("Login successful");
    return {
      success: true,
      user: {
        phone: user.phone,
        name: user.name,
        email: user.email,
      },
    };
  }

  return {
    success: false,
    message: "Nomor HP atau password salah",
  };
};

/**
 * Register a new user with phone number
 * @param {string} phone User's phone number
 * @returns {Object} Result with success status and message
 */
export const register = (phone) => {
  // Check if phone number is already registered
  const exists = users.some((user) => user.phone === phone);

  if (exists) {
    return {
      success: false,
      message: "Nomor HP sudah terdaftar",
    };
  }

  // In a real app, this would send an OTP and create a pending registration
  console.log("Registration started for phone", phone);

  // Add new user to array (for demo purposes)
  users.push({
    phone,
    password: "newuser123", // Default password for demo
    name: "New User",
    email: "",
  });

  return {
    success: true,
    message: "Kode OTP telah dikirim",
  };
};

/**
 * Log out the current user
 * @returns {Object} Result with success status
 */
export const logout = () => {
  // In a real app, this would remove token from AsyncStorage
  console.log("Logout successful");
  return {
    success: true,
  };
};

// Export demo user for easy access
export const DEMO = {
  PHONE: DEMO_USER.phone,
  PASSWORD: DEMO_USER.password,
};
