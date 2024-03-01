import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'

export const blogRouter = new Hono<{
	Bindings: {
	DATABASE_URL: string  // to specify that Database_url is a string;
    JWT_SECRET: string
	}
}>();

 blogRouter.post('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
  })
  
 blogRouter.put('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
  })
  
  blogRouter.get('/api/v1/blog/:id', (c) => {
    return c.text('Hello Hono!')
  })
  
  blogRouter.get('/api/v1/blog/bulk',(c)=>{
    return c.text("hello hono");
  })

