import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string  // to specify that Database_url is a string;
    JWT_SECRET: string
	}
}>();

app.use('/api/v1/blog/*', async (c, next) => {
  const header= c.req.header("authorization");


  if (!header) {
    // If no authorization header is provided, send an unauthorized response
    c.status(403);
    return c.json({
      error: "unautorized"
    })
  }

  //Bearer token => ["Bearer",token]
  const token = header.split(" ")[1];
 
  const response = await verify(token,c.env.JWT_SECRET);

  if(response.id){
    next();
  }
  else{
    return c.json({error:"unauthorized"});
  }
  
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  console.log(body);

  try{
    const user= await prisma.user.create({
      data:{
        email: body.email,
        password: body.password,
        name: body.name
      }
    })

    const token=await sign({id: user.id},c.env.JWT_SECRET)

    return c.json({
    jwt: token
  })
  }catch(e){
    c.status(403);
    return c.json({
      "msg":"user alrerady exists"
    })
  }
})

app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/bulk',(c)=>{
  return c.text("hello hono");
})

export default app