interface optionProps {
  _id?: string;
  value?: string;
  name: string;
}

interface dropdownProps {
  options: optionProps[];
  dwName: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown = ({ options, dwName, handleChange }: dropdownProps) => {
  console.log(options);
  return (
    <select name={dwName} onChange={handleChange}>
      {options.map(({ value, name }: optionProps) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export const DropdownCategory = ({
  options,
  dwName,
  handleChange,
}: dropdownProps) => {
  return (
    <select name={dwName} onChange={handleChange}>
      {options.map(({ _id, name }: any) => (
        <option key={_id} value={_id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export const DropdownPagination = ({
  options,
  dwName,
  handleChange,
}: {
  options: number[];
  dwName: string;
  handleChange: ({ target }: any) => void;
}) => {
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
