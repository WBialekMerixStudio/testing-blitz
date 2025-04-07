import React, { Suspense } from "react";
import { Form, FormProps } from "src/app/components/Form";
import { LabeledTextField } from "src/app/components/LabeledTextField";
import { LabeledCheckboxField } from "src/app/components/LabeledCheckboxField";

import { z } from "zod";
export { FORM_ERROR } from "src/app/components/Form";

export function CalendarForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        name="familyCalendar_id"
        label="Family Calendar_id"
        placeholder="Family Calendar_id"
        type="text"
      />
      <LabeledTextField
        name="user_uuid"
        label="User_uuid"
        placeholder="User_uuid"
        type="text"
      />
      <LabeledTextField
        name="name"
        label="Name"
        placeholder="Name"
        type="text"
      />
      <LabeledTextField
        name="test2"
        label="test2"
        placeholder="test2"
        type="text"
      />
      <LabeledCheckboxField
        name="isPrivate"
        label="Is Private"
        placeholder="Is Private"
      />
      <LabeledCheckboxField
        name="test"
        label="Is test"
        placeholder="Is test"
      />

      <LabeledTextField
        name="color"
        label="Color"
        placeholder="Color"
        type="text"
      />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  );
}
