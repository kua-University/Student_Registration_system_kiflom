import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../apptest';
import userModel from '../../model/user';

describe('User Controller Integration Tests', () => {
    beforeAll(async () => {
        const mongoURI = process.env.MONGODB_TEST_URI as string;
        await mongoose.connect(mongoURI);   
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        await userModel.deleteMany({}); // Clear users before each test
    });

    describe('POST /users/register', () => {
        it('should create a new user successfully', async () => {
            const newUser = {
                userName: 'daniel',
                firstName: 'daniel',
                middleName: 'daniel',
                lastName: 'daniel',
                gender: 'male',
                coursesEnrolled: [],
                email: 'daniel@gmail.com',
                tele: '1234567890',
                password: 'testpass123',
                role: 'student',
                DOB: new Date('1990-01-01'),
                verified: false
            };

            const response = await request(app)
                .post('/users/register')
                .send(newUser);
            expect(response.status).toBe(201);
            expect(response.body).toEqual({successfulRegistration: true});
        });

        it('should not create user with duplicate username', async () => {
            const user = {
                userName: 'daniel',
                firstName: 'daniel',
                middleName: 'daniel',
                lastName: 'daniel',
                gender: 'male',
                email: 'daniel@gmail.com',
                tele: '1234567890',
                password: 'testpass123',
                role: 'student',
                DOB: new Date('1990-01-01'),
                verified: false
            };

            await request(app).post('/users/register').send(user);
            const response = await request(app).post('/users/register').send(user);
            
            expect(response.status).toBe(400);
            expect(response.body).toEqual({userAlreadyExists: true});
        });
    });

    describe('GET /users/all', () => {
        it('should get all users', async () => {
            const response = await request(app).get('/users/all');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('successfullFetching', true);
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBeTruthy();
        });
    });

    describe('GET /users/:userName', () => {
        it('should get a single user by username', async () => {
            const user = {
                userName: 'testuser',
                firstName: 'test',
                middleName: 'middle',
                lastName: 'user',
                gender: 'female',
                email: 'test@gmail.com',
                tele: '1234567890',
                password: 'testpass123',
                role: 'student',
                DOB: new Date('1990-01-01'),
                verified: false
            };

            await request(app).post('/users/register').send(user);
            const response = await request(app).get(`/users/${user.userName}`);
            
            expect(response.status).toBe(200);
            expect(response.body.userFound).toBe(true);
            expect(response.body.data.userName).toBe(user.userName);
        });

        it('should return 404 for non-existent user', async () => {
            const response = await request(app).get('/users/nonexistentuser');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({userFound: false});
        });
    });

    describe('DELETE /users/:userName', () => {
        it('should delete a user successfully', async () => {
            const user = {
                userName: 'deleteuser',
                firstName: 'delete',
                middleName: 'test',
                lastName: 'user',
                gender: 'male',
                email: 'delete@gmail.com',
                tele: '1234567890',
                password: 'testpass123',
                role: 'student',
                DOB: new Date('1990-01-01'),
                verified: false
            };

            await request(app).post('/users/register').send(user);
            const response = await request(app).delete(`/users/${user.userName}`);
            
            expect(response.status).toBe(200);
            expect(response.body.successfullDeletion).toBe(true);
            expect(response.body.data.userName).toBe(user.userName);
        });

        it('should return 404 when deleting non-existent user', async () => {
            const response = await request(app).delete('/users/nonexistentuser');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({successfullDeletion: false});
        });
    });
});
