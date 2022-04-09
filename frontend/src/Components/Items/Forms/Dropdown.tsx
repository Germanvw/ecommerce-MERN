import { useEffect, useState } from "react";

interface optionProps {
  _id?: string;
  value?: string;
  name: string;
}

interface dropdownProps {
  options: optionProps[];
  dwName: string;
  selected?: string;
  index?: optionProps;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface DropdownPagination {
  options: number[];
  dwName: string;
  handleChange: ({ target }: any) => void;
  setPerPage: (perPage: number) => void;
}

export const Dropdown = ({
  dwName,
  options,
  selected,
  handleChange,
}: dropdownProps) => {
  return (
    <div className="simple-dropdown">
      <label>{dwName}</label>
      <select name={dwName} onChange={handleChange} defaultValue={selected}>
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
  dwName,
  options,
  selected,
  index,
  handleChange,
}: dropdownProps) => {
  return (
    <div className="simple-dropdown">
      <label className="m-0">{dwName}</label>
      <select name={dwName} onChange={handleChange} value={selected}>
        {index && (
          <option key={index._id} value={index.value}>
            {index.name}
          </option>
        )}
        {options.map(({ _id, name }: any) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const DropdownPagination = ({
  options,
  dwName,
  setPerPage,
  handleChange,
}: DropdownPagination) => {
  useEffect(() => {
    setPerPage(options[0]!);
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
