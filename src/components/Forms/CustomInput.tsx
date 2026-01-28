"use client";
import { Input } from "@/components/ui/input"; // Assuming you are using ShadCN's Input component
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
};

const CustomInput = ({
  type,
  name,
  label,
  disabled,
  required,
  placeholder,
  className,
  icon,
}: TInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const typeToShow = showPassword ? "text" : "password";
  const {
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (type === "number") {
      const inputElement = document.getElementById(name);
      if (inputElement) {
        inputElement.addEventListener("wheel", (e) => e.preventDefault(), {
          passive: false,
        });
      }
    }
  }, [name, type]);

  return (
    <div>
      <Controller
        name={name}
        rules={{ required: required ? "This field is required" : false }}
        control={control}
        render={({ field }) => (
          <div className={`relative ${className || ""}`}>
            {label && (
              <label htmlFor={name} className="text-lg font-semibold">
                {label}
              </label>
            )}

            {/* Use value from field */}
            <div className="relative">
              {icon && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {icon}
                </span>
              )}
              <Input
                {...field}
                type={type === "password" ? typeToShow : type}
                id={name}
                className={`w-full ${icon ? "pl-10" : ""}`} // Ensure w-full is applied here
                placeholder={placeholder}
                disabled={disabled}
                min={type === "number" ? 0 : undefined}
                step={type === "number" ? 0.01 : undefined} // Allow decimal points
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
            {errors && (
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

export default CustomInput;
