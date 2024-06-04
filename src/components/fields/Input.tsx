import { FieldProps } from "../Field";

export default function Input({
  onchange,
  ...props
}: Readonly<FieldProps<unknown>>) {
  return <input {...props} onChange={(e) => onchange(e.target.value)} />;
}
