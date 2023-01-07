import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmitForm from "./SubmitForm";

test("renders the form", () => {
  render(<SubmitForm />);

  const formItem = screen.getByTestId("form_test_id");
  expect(formItem).toBeInTheDocument();
});

// test if email contains @

test("if input name has the correct attribute and is present", () => {
  render(<SubmitForm />);

  const nameValidation = screen.getByTestId("name_input_test");
  expect(nameValidation).toBeInTheDocument();
  expect(nameValidation).toHaveAttribute("type", "text");
});

test("check if we insert valid name, the error message is not visible", () => {
  render(<SubmitForm />);

  const inputEl = screen.getByTestId("name_input_test");
  userEvent.type(inputEl, "John Smith");

  expect(screen.getByTestId("name_input_test")).toHaveValue("John Smith");
  expect(screen.getByTestId("name_validation_test")).not.toBeVisible();
  // this test won't pass due to a restriction with tailwind as the style is set as invisible
  // there was a discussion in github https://github.com/testing-library/jest-dom/issues/209 but i am including the comment as it was interesting
});

test("if all forms are valid, and we click submit, we get the success message", async () => {
  render(<SubmitForm />);

  const nameEl = screen.getByTestId("name_input_test");
  userEvent.type(nameEl, "John Smith");

  const emailEl = screen.getByTestId("email_input_test");
  userEvent.type(emailEl, "test@testi.com");

  const passEl = screen.getByTestId("password_input_test");
  userEvent.type(passEl, "ThisisATest123s");

  const rangeEl = screen.getByTestId("range_input_test");
  userEvent.type(rangeEl, "3");

  const numberEl = screen.getByTestId("number_input_test");
  userEvent.type(numberEl, "5");

  const textareaEl = screen.getByTestId("text_area_input_test");
  userEvent.type(
    textareaEl,
    "Lorem ipsum dolor sit amet and I don't know the rest of the text"
  );

  const checkboxEl = screen.getByTestId("checkbox_input_test");
  userEvent.click(checkboxEl);

  const submitEl = screen.getByTestId("submit_button_input_test");
  userEvent.click(submitEl);

  const finalRes = await screen.findByTestId("form_submitted_input_test");
  expect(finalRes).toBeInTheDocument();
});
