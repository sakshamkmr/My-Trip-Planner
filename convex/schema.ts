import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // User Table 【3877.599, type: source】 
  userTable: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    subscription: v.optional(v.string())
      // Optional field 【3951.119, type: source】 
    
  }),

  // Trip Details Table 【8727.52, type: source】 
  TripDetailTable: defineTable({
    tripId: v.string(),
    tripDetail: v.any(),
    uid: v.id('UserTable')
})
