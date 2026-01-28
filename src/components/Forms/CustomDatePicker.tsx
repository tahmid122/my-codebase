"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Controller, useFormContext } from "react-hook-form";

interface CustomDatePickerProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  label,
  required,
  className,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [open, setOpen] = React.useState(false);

  return (
    <div className={className || ""}>
      {label && (
        <label htmlFor={name} className="text-lg font-semibold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        rules={{ required: required ? "This field is required" : false }}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !field.value && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value
                  ? format(new Date(field.value), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false); //  off calendar after date select
                }}
                captionLayout="dropdown"
                startMonth={new Date(2000, 0)}
                endMonth={new Date(2050, 11)}
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {errors?.[name] && (
        <small className="text-red-500">
          {errors?.[name]?.message as string}
        </small>
      )}
    </div>
  );
};

export default CustomDatePicker;
