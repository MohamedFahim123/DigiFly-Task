import { CustomInputInterface } from "@/app/utils/interaces";
import React from "react";



const CustomInput = ({
  errors,
  name,
  lableName,
  onChange,
  inputRef,
}: CustomInputInterface) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#1A1A1A]"
      >
        {lableName}
      </label>
      <input
        type="text"
        placeholder={lableName}
        id={name}
        ref={inputRef}
        name={name}
        onChange={onChange}
        className={`mt-1 p-2 w-full border outline-none placeholder:text-[#B3B3B3] placeholder:text-sm placeholder:font-normal ${
          errors[name] ? "border-red-500" : "border-[#E5E5E5]"
        }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs">{errors[name]}</span>
      )}
    </div>
  );
};

export default CustomInput;
