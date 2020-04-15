/**
 * @jest-environment node
 */

import app from '../../src/server/app';
import request from 'supertest';
import nock from 'nock';
import {validRestaurantsAPIResponse1, validRestaurantsResponse1} from "./__mocks__/restaurants";


describe('App', () => {

    beforeEach(() => {
        jest.resetModules();
        nock.cleanAll();
        process.env.CLIENT_BASE_URL = 'http://test-api.pedidosya.com/';
        process.env.CLIENT_ID = 'testClient';
        process.env.CLIENT_SECRET = 'testSecret';
    });

    afterEach(() => {
    });

    describe('Authorization', () => {

        it('should return 404 when the endpoint does not exist', async () => {
            await request(app)
                .get('/login/')
                .expect(404);
        });

        it('should return 400 when the body is not valid', async () => {
            await request(app)
                .post('/api/login/')
                .expect(400);
        });

        it('should return 403 when the client app credentials are not valid', async () => {
            nock(process.env.CLIENT_BASE_URL)
                .get('/tokens/?clientId=testClient&clientSecret=testSecret')
                .reply(403, {"messages": ["[security.invalidCredentials]"], "code": "INVALID_TOKEN"});
            await request(app)
                .post('/api/login/')
                .send({
                    "userName": "test@test.com",
                    "password": "test_password"
                })
                .expect(403);
        });

        it('should return 403 when the client app credentials are not valid', async () => {
            nock(process.env.CLIENT_BASE_URL)
                .get('/tokens/?clientId=testClient&clientSecret=testSecret')
                .reply(200, {"access_token": "test_app_token"});
            nock(process.env.CLIENT_BASE_URL)
                .get('/tokens/?userName=wrong@test.com&password=wrong_password')
                .reply(403, {"messages": ["[security.invalidCredentials]"], "code": "USR_INVALID_CREDENTIALS"});

            await request(app)
                .post('/api/login/')
                .send({
                    "userName": "wrong@test.com",
                    "password": "wrong_password"
                })
                .expect(401);
        });

        it('should return a user token when the user credentials are valid', async (done) => {
            nock(process.env.CLIENT_BASE_URL)
                .get('/tokens/?clientId=testClient&clientSecret=testSecret')
                .reply(200, {"access_token": "test_app_token"});
            nock(process.env.CLIENT_BASE_URL)
                .matchHeader('Authorization', 'test_app_token')
                .get('/tokens/?userName=test@test.com&password=test_password')
                .reply(200, {"access_token": "test_user_token"});
            nock(process.env.CLIENT_BASE_URL)
                .matchHeader('Authorization', 'test_user_token')
                .get('/myAccount')
                .reply(200, {"id": 3797223, "lastName": "Automation", "name": "Test", "country": {"id": 1}});

            await request(app)
                .post('/api/login/')
                .send({
                    "userName": "test@test.com",
                    "password": "test_password"
                })
                .expect(200)
                .then(res => {
                    expect(res.text).toEqual('test_user_token');
                    done();
                });
        });

    });

    describe('MyAccount', () => {


        it('should return the logged in account when the user credentials are valid', async (done) => {
            nock(process.env.CLIENT_BASE_URL)
                .matchHeader('Authorization', 'test_user_token')
                .get('/myAccount')
                .reply(200, {"id": 3797223, "lastName": "Automation", "name": "Test", "country": {"id": 1}});

            await request(app)
                .get('/api/myAccount/')
                .set('Authorization', `test_user_token`)
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual({
                        "id": 3797223,
                        "lastName": "Automation",
                        "name": "Test",
                        "country": {"id": 1}
                    });
                    done();
                });
        });

        it('should return 403 when the user credentials are not valid', async () => {
            nock(process.env.CLIENT_BASE_URL)
                .get('/myAccount')
                .reply(403, {"messages": ["security.forbidden"], "code": "INVALID_TOKEN"});

            await request(app)
                .get('/api/myAccount/')
                .set('Authorization', `test_user_token`)
                .expect(403);
        });
    });

    describe('Restaurants', () => {

        it('should return 403 when the user credentials are not valid', async (done) => {
            nock(process.env.CLIENT_BASE_URL)
                .matchHeader('Authorization', 'test_user_token')
                .get('/search/restaurants?point=-34.90818970423305,-56.16440444969547&offset=0&country=1&fields=id, name, topCategories, rating, logo, deliveryTimeMaxMinutes, link, coordinates, opened')
                .reply(200, validRestaurantsAPIResponse1);

            await request(app)
                .get('/api/restaurants?point=-34.90818970423305,-56.16440444969547&offset=0&max=20&country=1&sortBy=BEST_RANKING&onlyOpen=true')
                .set('Authorization', `test_user_token`)
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual(validRestaurantsResponse1);
                    done();
                });
        });
    });


});

