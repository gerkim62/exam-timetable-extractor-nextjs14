"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { RiArrowRightSLine } from "react-icons/ri";

type Props = {
  children: string;
};

const SubmitButton = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative"
      disabled={pending}
    >
      {pending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-700"></div>
        </div>
      )}
      <span>{props.children}</span>
      <RiArrowRightSLine className="ml-2" />
    </button>
  );
};

export default SubmitButton;
