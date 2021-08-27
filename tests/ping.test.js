const request = require('supertest')

let server

describe('/ping', () => {
  beforeEach(() => { server = require('../server') })
  afterEach(async () => { 
    server.close() 
  })

  describe('GET /', () => {
    it('should send back status 200 for successful API request', async () => {
      const res = await request(server).get('/ping')
      expect(res.status).toBe(200)
    })
    
    it('should send back successful body', async () => {
      const res = await request(server).get('/ping')
      const success = '{"success":true}'
      expect(JSON.stringify(res.body)).toBe(success)
    })

    it('should send back status 404 for no defined route requests', async () => {
      const res = await request(server).get('/noping')
      expect(res.status).toBe(404)
    })
  })
})