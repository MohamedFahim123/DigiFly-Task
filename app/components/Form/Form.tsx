"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import {
  setEmail,
  setFirstName,
  setLastName,
  setPhone,
  submitForm,
} from "@/app/store/slices/formSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { CustomInputInterface } from "@/app/utils/interaces";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../CustomInput/CustomInput";

const Form = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formState = useSelector((state: RootState) => state.form);
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "FirstName":
        dispatch(setFirstName(value));
        break;
      case "LastName":
        dispatch(setLastName(value));
        break;
      case "Phone":
        dispatch(setPhone(value));
        break;
      case "Email":
        dispatch(setEmail(value));
        break;
      default:
        break;
    }
    validateForm();
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const NameInputsArr: CustomInputInterface[] = [
    {
      errors,
      name: "FirstName",
      lableName: t("formData.firstName"),
      onChange: handleChange,
      inputRef: (el: HTMLInputElement) => (inputRefs.current["FirstName"] = el),
    },
    {
      errors,
      name: "LastName",
      lableName: t("formData.lastName"),
      onChange: handleChange,
      inputRef: (el: HTMLInputElement) => (inputRefs.current["LastName"] = el),
    },
  ];

  const inputsArr: CustomInputInterface[] = [
    {
      errors,
      name: "Phone",
      lableName: t("formData.phone"),
      onChange: handleChange,
      inputRef: (el: HTMLInputElement) => (inputRefs.current["Phone"] = el),
    },
    {
      errors,
      name: "Email",
      lableName: t("formData.email"),
      onChange: handleChange,
      inputRef: (el: HTMLInputElement) => (inputRefs.current["Email"] = el),
    },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formState.FirstName) {
      newErrors.FirstName = lang === "en" ? "Required" : "مطلوب";
    } else if (formState.FirstName.length < 3) {
      newErrors.FirstName =
        lang === "en"
          ? "First Name must be more than 3 characters"
          : "اسم الأول يجب أن يكون أكثر من 3 أحرف";
    }

    if (!formState.LastName) {
      newErrors.LastName = lang === "en" ? "Required" : "مطلوب";
    } else if (formState.LastName.length < 3) {
      newErrors.LastName =
        lang === "en"
          ? "Last Name must be more than 3 characters"
          : "اسم العائلة يجب أن يكون أكثر من 3 أحرف";
    }

    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!formState.Phone) {
      newErrors.Phone = lang === "en" ? "Required" : "مطلوب";
    } else if (!phoneRegex.test(formState.Phone)) {
      newErrors.Phone =
        lang === "en" ? "Invalid phone number" : "رقم الهاتف غير صالح";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formState.Email) {
      newErrors.Email = lang === "en" ? "Required" : "مطلوب";
    } else if (!emailRegex.test(formState.Email)) {
      newErrors.Email =
        lang === "en"
          ? "Invalid email address"
          : "عنوان البريد الإلكتروني غير صالح";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(submitForm(formState))
        .then(() => {
          if (formRef.current) {
            formRef.current.reset();
          }

          Object.keys(inputRefs.current).forEach((key) => {
            const input = inputRefs.current[key];
            if (input) input.value = "";
          });
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="mt-5 flex flex-col gap-6 w-full"
    >
      <div className="flex justify-between gap-6 content-center">
        {NameInputsArr.map((input, idx) => (
          <CustomInput {...input} key={idx} />
        ))}
      </div>
      {inputsArr.map((input, idx) => (
        <CustomInput {...input} key={idx} />
      ))}
      <button
        type="submit"
        title={t("submit")}
        className="w-full mt-4 p-2 bg-[#49BD88] text-[#FFFFFF]"
      >
        {t("submit")}
      </button>
    </form>
  );
};

export default Form;
