import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'
import { signupInput,signinInput } from '@hitemup09/blogsite-common';

export const userRouter = new Hono<{
	Bindings: {
	DATABASE_URL: string  // to specify that Database_url is a string;
    JWT_SECRET: string
	}
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    

    const body = await c.req.json();

    const success= signupInput.safeParse(body);

    if(!success){
        c.status(422);
        return c.json({
            "msg": "invalid credentials"
        })
    }
  
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
  
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    console.log(body);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    const success= signinInput.safeParse(body);
    if(!success){
        c.status(422);
        return c.json({
            "msg": "Invalid Credentials"
        })
    }
  
    try{
      const response= await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password
        }
    })
    if(!response){
      c.status(403);
      return c.text("Incorrect credentials")
    }
    c.status(200);
    return c.text("great");
    }catch(e){
      c.status(411);
      return c.text("Invalid credentials");
    }
    
  })

  