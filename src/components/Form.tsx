import { useMemo, useState } from "react";
import Field from "./Field";

type UnaryCondition = {
  type: "empty" | "not_empty";
};

type BinaryCondition = {
  type: "equals" | "not_equals" | "contains" | "not_contains";
  value: string;
};

type Condition = UnaryCondition | BinaryCondition;

export type ConditionSet = {
  action: "show" | "hide" | "disable" | "enable";
  against: string;
  operator: "and" | "or";
  conditions: Condition[];
};

export interface Field<T = object> {
  type: string;
  name: string;
  label: string;
  options: T;
  conditions?: ConditionSet[];
}

export type Page = {
  title: string;
  description: string;
  fields: Field[];
};

function useFormProcess(config: FormConfig) {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState({});

  const shouldRender = (_field: Field) => Math.random() > 0.5; // TEMP HACK

  const currentPageObj = useMemo(
    () => config.pages[currentPage],
    [config, currentPage]
  );

  const visibleFields = useMemo<Field[]>(() => {
    return currentPageObj?.fields.filter((field) => shouldRender(field)) || [];
  }, [currentPageObj]);

  return {
    page: currentPageObj,
    nextPage: () => setCurrentPage(currentPage + 1),
    isLastPage: currentPage === config.pages.length - 1,
    onFieldChange: (name: string, value: string) => {
      console.log("onFieldChange", name, value);
      setData({ ...data, [name]: value });
    },
    formData: data,
    visibleFields,
  };
}

export type FormConfig = {
  title: string;
  description: string;
  pages: Page[];
};

export default function Form({ config }: Readonly<{ config: FormConfig }>) {
  const { page, visibleFields, onFieldChange, formData } =
    useFormProcess(config);
  const { title } = config;

  return (
    <div>
      <h2>{title}</h2>
      {page && (
        <div>
          <h3>{page.title}</h3>
          <p>{page.description}</p>
          {visibleFields.map((field) => (
            <div key={field.name}>
              <label>{field.label}</label>
              {field && (
                <Field
                  {...field}
                  onchange={(value) => onFieldChange(field.name, value)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
