# Overview of TANF Data Portal USWDS ReactJS Exercise (RAFT)

This document will provide a quick overview of the project with screenshots.

## Main App

This is the main application with the design that matches the [screenshot](https://i.snipboard.io/qwsQz9.jpg) referenced in the exercise requirements based on the USWDS.

![App](app.png)

The contents of the grade dropdown list shows values `1` to `10` as required by the code exercise.

![App](dropdown_list.png)

Open the console window and click on the **Request Access** button will show the values of the three input fields made by the user as required in the exercise. This could just as easily have been sent to a backend API as a JSON payload.

![App](console_output.png)


### Errors

Starting with no valid inputs, we see three errors.

![App](errors_3.png)

After filling in one input field, the errors are reduced to two.

![App](errors_2.png)

After filling in two input fields, the errors are reduced to one.

![App](errors_1.png)

Finally, after filling in all three input fields, there are no more errors.

![App](errors_0.png)


### Test Coverage

The graphical ui version of the code coverage after running `yarn test:cov`.

![App](code_cov_ui.png)

The command line version of the coverage tests.

![App](code_cov_cli.png)

The results of the tests after running `yarn test`.

![App](tests_cli.png)