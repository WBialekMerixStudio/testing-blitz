import { z } from "zod";

export const CreateFamilyCalendarSchema = z.object({
  name: z.string(),
  superAdmin: z.string(),
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateFamilyCalendarSchema = CreateFamilyCalendarSchema.merge(
  z.object({
    id: z.number(),
  })
);

export const DeleteFamilyCalendarSchema = z.object({
  id: z.number(),
});
