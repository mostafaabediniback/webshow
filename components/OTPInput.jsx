import React, { useRef } from "react";

const OTPInput = ({ value, onChange }) => {
  const inputsRef = useRef([]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, "");

    if (!val) return;

    const otpArray = value.split("");
    otpArray[index] = val[0];

    const newOtp = otpArray.join("");
    onChange(newOtp);

    if (index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const otpArray = value.split("");

      if (otpArray[index]) {
        otpArray[index] = "";
        onChange(otpArray.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);

    onChange(pastedData);

    const nextIndex = Math.min(pastedData.length, 4);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div
      dir="ltr"
      className="flex justify-center gap-2"
      onPaste={handlePaste}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-gray-50 hover:bg-white"
        />
      ))}
    </div>
  );
};

export default OTPInput;
