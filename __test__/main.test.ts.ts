// Instead of importing from @jest/globals, these are globally available
// when using Jest with TypeScript
import { Calculator } from '../src/calculator'; // Assuming you'll move the Calculator class to its own file
import { UserRegistration } from '../src/user-registration';

describe('Calculator', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('add', () => {
        it('should add two positive numbers correctly', () => {
            expect(calculator.add(2, 3)).toBe(5);
        });

        it('should handle negative numbers', () => {
            expect(calculator.add(-1, -2)).toBe(-3);
        });
    });

    describe('subtract', () => {
        it('should subtract two numbers correctly', () => {
            expect(calculator.subtract(5, 3)).toBe(2);
        });
    });

    describe('multiply', () => {
        it('should multiply two numbers correctly', () => {
            expect(calculator.multiply(4, 3)).toBe(12);
        });

        it('should handle zero', () => {
            expect(calculator.multiply(5, 0)).toBe(0);
        });
    });

    describe('divide', () => {
        it('should divide two numbers correctly', () => {
            expect(calculator.divide(6, 2)).toBe(3);
        });

        it('should throw error when dividing by zero', () => {
            expect(() => calculator.divide(5, 0)).toThrow('Division by zero is not allowed');
        });
    });
});

describe('UserRegistration', () => {
    let userRegistration: UserRegistration;

    beforeEach(() => {
        userRegistration = new UserRegistration();
    });

    describe('registerUser', () => {
        it('should successfully register a valid user', () => {
            const user = {
                username: 'johndoe',
                email: 'john@example.com',
                password: 'Password123!'
            };

            const result = userRegistration.register(user);
            expect(result.success).toBe(true);
            expect(result.user).toMatchObject({
                username: user.username,
                email: user.email
            });
        });

        it('should reject registration with invalid email', () => {
            const user = {
                username: 'johndoe',
                email: 'invalid-email',
                password: 'Password123!'
            };

            expect(() => userRegistration.register(user))
                .toThrow('Invalid email format');
        });

        it('should reject registration with weak password', () => {
            const user = {
                username: 'johndoe',
                email: 'john@example.com',
                password: '123'  // too short
            };

            expect(() => userRegistration.register(user))
                .toThrow('Password must be at least 8 characters');
        });

        it('should not allow duplicate usernames', () => {
            const user1 = {
                username: 'johndoe',
                email: 'john@example.com',
                password: 'Password123!'
            };

            userRegistration.register(user1);

            const user2 = {
                username: 'johndoe',  // same username
                email: 'john2@example.com',
                password: 'Password123!'
            };

            expect(() => userRegistration.register(user2))
                .toThrow('Username already exists');
        });
    });
});
