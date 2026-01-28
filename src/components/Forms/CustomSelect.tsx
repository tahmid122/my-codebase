"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

type TSelectOption = {
  label: string;
  value: string;
};

type TCustomSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options: TSelectOption[];
  className?: string;
};

const CustomSelect = ({
  name,
  label,
  placeholder = "Select an option",
  required,
  disabled,
  options,
  className,
}: TCustomSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field }) => (
          <div className={`${className || ""}`}>
            {label && (
              <label htmlFor={name} className="text-lg font-semibold">
                {label}
              </label>
            )}

            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors?.[name] && (
              <small style={{ color: "red" }}>
                {errors?.[name]?.message as string}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default CustomSelect;
