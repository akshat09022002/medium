import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'


const app = new Hono();

app.route("api/v1/user",userRouter);
app.route("api/v1/blog",blogRouter);

// app.use('/api/v1/blog/*', async (c, next) => {
//   const header= c.req.header("authorization");

//   if (!header) {
//     // If no authorization header is provided, send an unauthorized response
//     c.status(403);
//     return c.json({
//       error: "unautorized"
//     })
//   }

//   //Bearer token => ["Bearer",token]
//   const token = header.split(" ")[1];
 
//   const response = await verify(token,c.env.JWT_SECRET);

//   if(response.id){
//     next();
//   }
//   else{
//     return c.json({error:"unauthorized"});
//   }
  
// })

export default app