import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../apptest'; 

describe('User Controller Integration Tests', () => {
    beforeAll(async () => {
        const mongoURI = process.env.MONGODB_TEST_URI as string;
        await mongoose.connect(mongoURI);   
    });

    afterAll(async () => {
        await mongoose.disconnect();
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
        });
    });
});
