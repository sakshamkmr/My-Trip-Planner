import { handler } from "next/dist/build/templates/app-page";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const CreateTripDetail = mutation({
  args: {
    tripId: v.string(),
    uid: v.id('UserTable'),
    tripDetail: v.any(),
  },
  handler: async (ctx, args) => {
    const result= await ctx.db.insert("TripDetailTable", {
      tripId: args.tripId,
      tripDetail: args.tripDetail,
      uid: args.uid,
    });
    return result;
  }
});
export const GetUserTrips = query({
  args: {
    uid: v.id('UserTable')
  },
  handler: async (ctx, args) => {
    const trips = await ctx.db.query("TripDetailTable")
    .filter(q => q.eq(q.field("uid"), args.uid))
    .order("desc")
    .collect();
    return trips;
  }
});
export const GetTripById = query({
  args: {
    tripId: v.string(),
    uid: v.id('UserTable')
  },
  handler: async (ctx, args) => {
    const trips = await ctx.db.query("TripDetailTable")
    .filter(q => q.and(q.eq(q.field("uid"), args.uid), q.eq(q.field("tripId"), args?.tripId)))
    
    .collect();
    return trips[0];
  }
});