import { handler } from "next/dist/build/templates/app-page";
import { mutation } from "./_generated/server";
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