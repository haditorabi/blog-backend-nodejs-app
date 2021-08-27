const request = require('supertest');
const axios = require('axios');

jest.mock('axios');

let server;

describe('/posts', () => {
  beforeEach(() => { 
      server = require('../server'); 
    })
  afterEach(async () => { 
    server.close(); 
  });

  describe('GET /', () => {
    it('should send back status 400 without tags', async () => {
      const res = await request(server).get('/posts');
      expect(res.status).toBe(400);
      const error = '{"error":"Tags parameter is required."}'
      expect(JSON.stringify(res.body)).toBe(error)
    });

    it('should send back status 400 with empty tags', async () => {
      const res = await request(server).get('/posts?tags=');
      expect(res.status).toBe(400);
      const error = '{"error":"Tags parameter is required."}'
      expect(JSON.stringify(res.body)).toBe(error)
    });

    it('should send back status 400 with invalid sortBy', async () => {
      const res = await request(server).get('/posts?tags=tech&sortBy=invalid');
      expect(res.status).toBe(400);
      const error = '{"error":"sortBy parameter is invalid."}'
      expect(JSON.stringify(res.body)).toBe(error)
    });
    
    it('should send back status 400 with invalid direction', async () => {
      const res = await request(server).get('/posts?tags=tech&direction=invalid');
      expect(res.status).toBe(400);
      const error = '{"error":"sortBy parameter is invalid."}'
      expect(JSON.stringify(res.body)).toBe(error)
    });
    
    it('should send back status 200 with valid tags & sort & direction', async () => {

        const response = { posts : [
            {
            author: 'Zackery Turner',
            authorId: 12,
            id: 2,
            likes: 469,
            popularity: 0.68,
            reads: 90406,
            tags: [ 'startups', 'tech', 'history' ]
            }]
        };
        axios.get.mockImplementation(async () =>
            await Promise.resolve({ data: response })
        );

        const res = await request(server).get('/posts?tags=tech&sortBy=id&direction=asc');
        expect(res.body).toBe(200);
        expect(axios).toHaveBeenCalled();
    });
  });
});