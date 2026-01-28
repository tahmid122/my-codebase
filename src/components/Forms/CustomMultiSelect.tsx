"use client";

import Select, { MultiValue } from "react-select";
import { Controller, useFormContext } from "react-hook-form";

type TSelectOption = {
  label: string;
  value: string;
};

type TCustomMultiSelectProps = {
  name: string;
  label?: string;
  options: TSelectOption[];
  required?: boolean;
  className?: string;
};

const CustomMultiSelect = ({
  name,
  label,
  options,
  required = false,
  className,
}: TCustomMultiSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ [key: string]: string[] }>(); // value is always string[]

  return (
    <div className={className}>
      {label && (
        <label className="text-lg font-semibold block mb-1">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={options}
            className="react-select-container z-50"
            classNamePrefix="react-select"
            onChange={(val: MultiValue<TSelectOption>) =>
              field.onChange(val.map((v) => v.value))
            }
            value={options.filter((opt) => field.value?.includes(opt.value))}
          />
        )}
      />

      {errors[name] && (
        <small className="text-red-500">{errors[name]?.message}</small>
      )}
    </div>
  );
};

export default CustomMultiSelect;
