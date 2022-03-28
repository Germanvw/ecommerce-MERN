interface optionProps {
  value: string;
  name: string;
}

interface dropdownProps {
  options: optionProps[];
  dwName: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown = ({ options, dwName, handleChange }: dropdownProps) => {
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
