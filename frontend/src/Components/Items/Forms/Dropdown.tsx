import { useEffect } from "react";

interface optionProps {
  _id?: string;
  value?: string;
  name: string;
}

interface dropdownProps {
  options: optionProps[];
  dwName: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selected?: string;
}

export const Dropdown = ({ options, dwName, handleChange }: dropdownProps) => {
  return (
    <div className="simple-dropdown">
      <label>{dwName}</label>
      <select name={dwName} onChange={handleChange}>
        {options.map(({ value, name }: optionProps) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const DropdownCategory = ({
  options,
  dwName,
  handleChange,
  selected,
}: dropdownProps) => {
  return (
    <select name={dwName} onChange={handleChange}>
      {options.map(({ _id, name }: any) => {
        if (selected === _id) {
          return (
            <option key={_id} value={_id} selected>
              {name}
            </option>
          );
        } else {
          return (
            <option key={_id} value={_id}>
              {name}
            </option>
          );
        }
      })}
    </select>
  );
};

export const DropdownPagination = ({
  options,
  dwName,
  handleChange,
  setPerPage,
}: {
  options: number[];
  dwName: string;
  handleChange: ({ target }: any) => void;
  setPerPage: any;
}) => {
  useEffect(() => {
    setPerPage(options[0]);
  }, [options[0]]);

  return (
    <select name={dwName} onChange={handleChange}>
      {options.map((value: number) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
