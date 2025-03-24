import { UserDB } from './db';
import { predefinedUsers } from '../data/users';

export async function initializeDatabase() {
  try {
    // Check if test user exists
    const testUser = await UserDB.findByEmail('test@example.com');
    
    if (!testUser) {
      // Initialize predefined users if they don't exist
      for (const user of predefinedUsers) {
        const existingUser = await UserDB.findByEmail(user.email);
        if (!existingUser) {
          await UserDB.create({
            email: user.email,
            password: user.password,
            name: user.name
          });
        }
      }
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}