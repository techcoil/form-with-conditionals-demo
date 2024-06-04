import { Fragment } from "react/jsx-runtime";

import { FieldProps } from "../Field";

type RadioOptions = {
  choices: { label: string; value: string }[];
};

type RadioFieldProps = FieldProps<RadioOptions>;

export default function Radio({
  name,
  options,
  onchange,
}: Readonly<RadioFieldProps>) {
  return (
    <div>
      {options.choices.map((choice) => (
        <Fragment key={`${name}__${choice.value}`}>
          <label htmlFor={`${name}__${choice.value}`}>{choice.label}</label>
          <input
            id={`${name}__${choice.value}`}
            name={name}
            type="radio"
            value={choice.value}
            onChange={(e) => onchange(e.target.value)}
          />
        </Fragment>
      ))}
    </div>
  );
}
