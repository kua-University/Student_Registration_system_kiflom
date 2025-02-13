// a smaple unit test here 
import { describe, expect, test } from '@jest/globals';
import { RegisterUser } from '../src/register_user';

describe('RegisterUser', () => {
  test('should register a new user successfully', async () => {
    // Arrange
    const registerUser = new RegisterUser();
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    // Act
    const result = await registerUser.execute(userData);

    // Assert
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.user).toMatchObject({
      username: userData.username,
      email: userData.email
    });
  });

  test('should fail when registering with existing email', async () => {
    // Arrange
    const registerUser = new RegisterUser();
    const userData = {
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'password123'
    };

    // Act & Assert
    await expect(registerUser.execute(userData)).rejects.toThrow('Email already exists');
  });
});
