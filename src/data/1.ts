import { type FormConfig } from "../components/Form";

const formConfig: FormConfig = {
  title: "Very cool form",
  description: "This is a very cool form",
  pages: [
    {
      title: "Personal Details",
      description: "Please enter your personal details",
      fields: [
        {
          type: "input",
          name: "f_1",
          label: "Name",
          options: {
            placeholder: "Enter your name",
          },
        },
        {
          type: "input",
          name: "f_2",
          label: "Email",
          options: {
            placeholder: "Enter your email",
          },
        },
        {
          type: "radio",
          name: "f_3",
          label: "Gender",
          options: {
            choices: [
              { label: "Female", value: "f" },
              { label: "Male", value: "m" },
            ],
          },
        },
        {
          type: "radio",
          name: "f_4",
          label: "Is Pregnant?",
          options: {
            choices: [
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ],
          },
          conditions: [
            {
              action: "show",
              operator: "and",
              against: "f_3",
              conditions: [
                {
                  type: "equals",
                  value: "f",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default formConfig;
