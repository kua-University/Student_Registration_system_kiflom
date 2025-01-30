import request from 'supertest';
import  app from '../../app'; // Assuming you have an Express app instance exported from app.ts
import userModel from '../../model/user';
import axios from 'axios';

jest.mock('../../model/user');

describe('User Controllers', () => {
    describe('createUser', () => {
        it('should create a new user', async () => { 
            userModel.prototype.save = jest.fn().mockResolvedValue({});

            const res = await request(app)
                .post('/users')
                .send({ userName: 'testuser', password: 'password123' });

            expect(res.status).toBe(201);
            expect(res.body.successfulRegistration).toBe(true);
        });

        it('should return 400 if user already exists', async () => { 

            const res = await request(app)
                .post('/users')
                .send({ userName: 'testuser', password: 'password123' });

            expect(res.status).toBe(400);
            expect(res.body.userAlreadyExists).toBe(true);
        });
    });

    describe('getUsers', () => {
        it('should return a list of users', async () => { 
            const res = await request(app).get('/users');

            expect(res.status).toBe(200);
            expect(res.body.successfullFetching).toBe(true);
            expect(res.body.data).toEqual([{ userName: 'testuser' }]);
        });
    });

    describe('getSingleUser', () => {
        it('should return a single user', async () => { 

            const res = await request(app).get('/users/testuser');

            expect(res.status).toBe(200);
            expect(res.body.userFound).toBe(true);
            expect(res.body.data).toEqual({ userName: 'testuser' });
        });

        it('should return 404 if user not found', async () => { 

            const res = await request(app).get('/users/nonexistentuser');

            expect(res.status).toBe(404);
            expect(res.body.userFound).toBe(false);
        });
    });

    describe('deleteSingleUser', () => {
        it('should delete a user', async () => { 

            const res = await request(app).delete('/users/testuser');

            expect(res.status).toBe(200);
            expect(res.body.successfullDeletion).toBe(true);
            expect(res.body.data).toEqual({ userName: 'testuser' });
        });

        it('should return 404 if user not found', async () => { 

            const res = await request(app).delete('/users/nonexistentuser');

            expect(res.status).toBe(404);
            expect(res.body.successfullDeletion).toBe(false);
        });
    });

    describe('updateUserByID', () => {
        it('should update a user', async () => { 
            const res = await request(app)
                .put('/users/123')
                .send({ userName: 'updateduser' });

            expect(res.status).toBe(200);
            expect(res.body.successfullUpdate).toBe(true);
            expect(res.body.data).toEqual({ userName: 'updateduser' });
        });

        it('should return 404 if user not found', async () => { 

            const res = await request(app)
                .put('/users/123')
                .send({ userName: 'updateduser' });

            expect(res.status).toBe(404);
            expect(res.body.successfulUpdate).toBe(false);
        });
    });

    describe('initPayment', () => {
        it('should initialize payment', async () => {
            axios.post = jest.fn().mockResolvedValue({
                data: {
                    status: 'success',
                    data: { checkout_url: 'http://payment.url' },
                },
            });

            const res = await request(app)
                .post('/payment')
                .send({
                    amount: '100',
                    email: 'test@example.com',
                    first_name: 'Test',
                    last_name: 'User',
                    phone_number: '1234567890',
                    tx_ref: 'tx123',
                    currency: 'USD',
                });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Payment initialized successfully');
            expect(res.body.payment_url).toBe('http://payment.url');
        });

        it('should return 500 if payment initialization fails', async () => {
            axios.post = jest.fn().mockRejectedValue(new Error('API error'));

            const res = await request(app)
                .post('/payment')
                .send({
                    amount: '100',
                    email: 'test@example.com',
                    first_name: 'Test',
                    last_name: 'User',
                    phone_number: '1234567890',
                    tx_ref: 'tx123',
                    currency: 'USD',
                });

            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Error communicating with Chapa API');
        });
    });
});