import { FormInput } from "../Forms/FormInput";

interface SearchNav {
  filterInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps: any;
  handleCreate?: () => void;
}

export const SearchNav = ({
  filterInput,
  handleChange,
  inputProps,
  handleCreate,
}: SearchNav) => {
  return (
    <div className="row m-0 pt-4">
      <div className="col-sm-6">
        <FormInput
          value={filterInput}
          handleChange={handleChange}
          {...inputProps}
        />
      </div>
      {handleCreate && (
        <div className="col-sm-6 d-flex align-items-center">
          <button onClick={handleCreate}>Create new</button>
        </div>
      )}
    </div>
  );
};
