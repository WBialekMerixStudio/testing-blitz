import { z } from "zod";

export const CreateCalendarSchema = z.object({
  familyCalendar_id: z.string(),
  user_uuid: z.string(),
  name: z.string(),
  isPrivate: z.boolean(),
  test2: z.string(),
  color: z.string(),
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateCalendarSchema = CreateCalendarSchema.merge(
  z.object({
    id: z.number(),
  })
);

export const DeleteCalendarSchema = z.object({
  id: z.number(),
});
