import Input from "./fields/Input";
import Radio from "./fields/Radio";
import { type Field as FieldData } from "./Form";

export type FieldProps<T> = Omit<
  FieldData<T> & {
    onchange: (value: string) => void;
  },
  "type"
>;

export default function Field({
  type,
  name,
  label,
  options,
  onchange,
}: Readonly<FieldProps<unknown> & { type: string }>) {
  if (type === "input") {
    return (
      <Input name={name} label={label} options={options} onchange={onchange} />
    );
  }

  if (type === "radio") {
    return (
      <Radio name={name} label={label} options={options} onchange={onchange} />
    );
  }

  return null;
}
