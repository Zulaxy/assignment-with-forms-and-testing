This project was built on React and tailwindcss

To start it, download the code, cd into the folder and npm install the dependencies.

After that, npm start to preview it in the local host.

Alternatively, you can check the final result deployed on vercel here: https://assignment-with-forms-and-testing.vercel.app/

Long story short, the app is built around a form that carries validation of its fields.
Upon inputting the correct values, the users will be able to submit the data from the fields to firebase via a post request in JSON format.

During the request, you should get a loading spinner and when the data is posted, you will get a success message with a link to preview the submitted data.

There are a couple of unit tests, one of which will intentionally fail, but the reason behind it is explained in SubmitForm.test.js as a comment.

To run the tests, cd in the folder and npm test

---
