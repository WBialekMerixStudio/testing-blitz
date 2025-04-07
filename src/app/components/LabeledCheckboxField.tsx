import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export interface LabeledCheckboxFieldProps
  extends PropsWithoutRef<React.JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  outerProps?: PropsWithoutRef<React.JSX.IntrinsicElements["div"]>;
  labelProps?: ComponentPropsWithoutRef<"label">;
}

export const LabeledCheckboxField = forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext();

    return (
      <div {...outerProps}>
        <label {...labelProps} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            disabled={isSubmitting}
            {...register(name)}
            {...props}
            ref={ref}
          />
          {label}
        </label>

        <ErrorMessage
          render={({ message }) => (
            <div role="alert" style={{ color: "red" }}>
              {message}
            </div>
          )}
          errors={errors}
          name={name}
        />
      </div>
    );
  }
);

LabeledCheckboxField.displayName = "LabeledCheckboxField";

export default LabeledCheckboxField;
