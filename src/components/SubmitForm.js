import React, { useRef, useState } from "react";

import LoadingSpinner from "./LoadingSpinner";
import FormSubmitted from "./FormSubmitted";

const SubmitForm = () => {
  const [range, setRange] = useState(5);
  const [formSent, setFormSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef("");
  const textRef = useRef("");
  const emailRef = useRef("");
  const passRef = useRef("");
  const radioRef = useRef("");
  const rangeRef = useRef("");
  const digitRef = useRef("");

  // I added this as a handler to onclick to the button, but we setIsLoading to true in the submitHandler, so it was not necessary
  // const isLoadingHandler = () => {
  //   setIsLoading(true);
  // };

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const submitData = {
      name: nameRef.current.value,
      text: textRef.current.value,
      email: emailRef.current.value,
      pass: passRef.current.value,
      radio: radioRef.current.value,
      range: rangeRef.current.value,
      digit: digitRef.current.value,
    };

    const response = await fetch(
      "https://assignment-16792-default-rtdb.europe-west1.firebasedatabase.app/submits.json",
      {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      setFormSent(true);
      setIsLoading(false);
      e.target.reset();
    });
    // const data = await response.json();
    // console.log(data);
  };

  const changeRange = (event) => {
    setRange(event.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-sky-700 pb-10 h-full">
      <div className="py-3 my-10 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-semibold text-white py-3">
          Please fill my form
        </h1>
        <h2 className="text-2xl font-light text-white">
          If you fill the data successfully, you will be able to submit.
        </h2>
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <form
          data-testid="form_test_id"
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="name"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Your Name
              </label>
              <input
                data-testid="name_input_test"
                className="peer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
                required
                minLength="3"
                maxLength="15"
                placeholder="Name"
                ref={nameRef}
              ></input>
              <p
                data-testid="name_validation_test"
                class="invisible peer-invalid:visible text-red-700 font-light"
              >
                Name must be 3-15 characters
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="email"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Your Email
              </label>
              <input
                data-testid="email_input_test"
                className="peer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                required
                minLength="3"
                maxLength="40"
                placeholder="Please enter an email"
                ref={emailRef}
              ></input>
              <p class="invisible peer-invalid:visible text-red-700 font-light">
                Must be a valid mail
              </p>
            </div>
          </div>
          <div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Enter Some Password
              </label>
              <input
                data-testid="password_input_test"
                className="peer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                // minLength="3"
                // maxLength="15"
                placeholder="Please entern a password"
                ref={passRef}
              ></input>
              <p class="invisible peer-invalid:visible text-red-700 font-light">
                Atleast one number, one uppercase and lowercase. 8+ characters.
              </p>
            </div>
            {/* <label htmlFor="color">Please pick a color</label>
        <input type="color" id="color" required></input> */}

            <div>
              <label
                htmlFor="volume"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                How are you feeling today from 1-5?
              </label>
              <input
                data-testid="range_input_test"
                className="peer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="range"
                id="volume"
                name="volume"
                min={1}
                max={10}
                step={1}
                ref={radioRef}
                required
                onChange={changeRange}
              />
              <h4>{`I am Feeling like... ${range}`}</h4>
              <p class="invisible peer-invalid:visible text-red-700 font-light">
                Between 1-10
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="digit"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Pick your favourite digit (0-9):
              </label>
              <input
                data-testid="number_input_test"
                className="peer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                id="digit"
                name="digit"
                min="0"
                max="9"
                ref={digitRef}
                required
                placeholder="pick a number"
              ></input>
              <p class="invisible peer-invalid:visible text-red-700 font-light">
                Between 0-9
              </p>
            </div>
            <div>
              <label
                htmlFor="text"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Your Text
              </label>
              <textarea
                data-testid="text_area_input_test"
                className="peer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={textRef}
                id="text"
                required
                minLength="10"
                maxLength="100"
                rows="8"
                placeholder="Your Text Goes Here"
              ></textarea>
              <p class="invisible peer-invalid:visible text-red-700 font-light">
                You should enter a message 10-100 characters.
              </p>
            </div>
            {/* input dropdown from list */}

            <div class="flex items-center my-5">
              <input
                data-testid="checkbox_input_test"
                id="bordered-checkbox-1"
                type="checkbox"
                name="bordered-checkbox"
                required
                class="peerw-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-1"
                class="w-full py-4 ml-2 text-sm font-medium text-gray-900"
              >
                You Need to check this box to proceed
              </label>
              <p class="invisible peer-invalid:visible text-red-700 font-light">
                You should enter a message 10-100 characters.
              </p>
            </div>

            {/* <label
              htmlFor="checkbox"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              You need to select this to proceed
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="checkbox"
              id="checkbox"
              required
              ref={radioRef}
            ></input> */}
            <div className="flex items-center justify-start">
              <button
                // onClick={isLoadingHandler}
                data-testid="submit_button_input_test"
                type="submit"
                className="bg-sky-700 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded active:scale-90 transition duration-150"
              >
                Submit the Data
              </button>
              {isLoading && <LoadingSpinner />}
            </div>
            <p className="my-5 text-gray-700 text-m font-semibold">
              Upon Clickling the Submit button, the data will be posted in JSON
              format.
            </p>
            {formSent && (
              <FormSubmitted  />
            )}
            {isLoading && "Sending your data"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;
