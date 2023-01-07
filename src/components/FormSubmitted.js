import React from "react";

const FormSubmitted = () => {
  return (
    <div
      className="flex items-center justify-start"
      data-testid="form_submitted_input_test"
    >
      <p className="text-m text-green-900">Thank you for sending the data!</p>
      <a
        target="_blank"
        className="bg-sky-700 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ml-5 active:scale-90 transition duration-150"
        href="https://assignment-16792-default-rtdb.europe-west1.firebasedatabase.app/submits.json"
      >
        Click here to preview the data.
      </a>
    </div>
  );
};

export default FormSubmitted;
