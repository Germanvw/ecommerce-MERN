interface ButtonProps {
  handleClick: () => void;
}

export const MainButton = ({ handleClick }: ButtonProps) => {
  return (
    <button type="submit" onClick={handleClick} className="w-100 btn-main">
      LOGIN
    </button>
  );
};
