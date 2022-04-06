interface ButtonProps {
  handleClick: () => void;
  title: string;
}

export const MainButton = ({ handleClick, title }: ButtonProps) => {
  return (
    <button type="submit" onClick={handleClick} className="w-100 btn-main">
      {title}
    </button>
  );
};
