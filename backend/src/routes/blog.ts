import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'
import { UpdateBlogInput,CreateBlogInput, createBlogInput, updateBlogInput } from '@hitemup09/blogsite-common'

export const blogRouter = new Hono<{
	Bindings: {
	DATABASE_URL: string  // to specify that Database_url is a string;
    JWT_SECRET: string
	},
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*",async (c,next)=>{
    const token=c.req.header("authorization") || "";
    const  user= await verify(token,c.env.JWT_SECRET)
    if(user){
        c.set("userId",user.id);
        await next();
    }else{
        c.status(403);
        return c.json({
            message: "you are not logged in"
        })
    }
})

 blogRouter.post('/',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body=await c.req.json();

      const success= createBlogInput.safeParse(body);
      if(!success){
        c.status(422);
        console.log("Invalid Credentials");
      }

      const authorId= c.get("userId");


    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })

  }) 
   
 blogRouter.put('/',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
    const body=await c.req.json();

    const success= updateBlogInput.safeParse(body);
    if(!success){
        c.status(422);
        console.log("Invalid Credentials");
    }

   const blog= await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        "msg": blog.id
    })
    
  })
  
  blogRouter.get('/get/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
    const id= c.req.param("id");

   try{
    const blog= await prisma.post.findFirst({
        where:{
            id: id
        }
       })
    
        return c.json({
            blog
        })
   } catch(e){
    c.status(411);
    return c.json({
        message: 'Error while fetching blog post'
    })
   }

});
  
// Todo add: pagination --> to get some todos and get others as user scroll down
  blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blog= await prisma.post.findMany();
      console.log(blog);

      return c.json({
        blog
      })
  })


//   jwt--> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhkZjc3YTBmLTU1ZDgtNDZjMy1hOGVkLWNiNjI3NzY0MTBlNSJ9.ZFO3aY3DR5G1jc2wiNVicE9GGF6pF7ogcM-8j2g9ImA"
// id--->  "id": "70accab5-496b-4f4a-bc64-c0e7bd401f06"
