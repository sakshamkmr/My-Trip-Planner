import { EmailAddress } from "@clerk/nextjs/server"
import { mutation } from "./_generated/server"
import {v} from  "convex/values"
export const CreateNewUser = mutation({
  args: {     // Input data 【4051.28, type: source】 
    name: v.string(),
    email: v.string(),
    imageUrl: v.string()
  },
  handler: async (ctx, args) => {  // Logic 【4095.44, type: source】 
    //if user already exists
    const user = await ctx.db.query('userTable')
    .filter((q)=>q.eq(q.field("email"),args.email))
    .collect()
    if(user?.length==0){
        const UserData = {
            name: args.name,
            email: args.email,
            imageUrl:args.imageUrl


    }
    //if nnot then create new user
    const result = await ctx.db.insert('userTable',UserData)
    return UserData
  }
    return user[0]
  }
})
