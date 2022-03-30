export const handleFilter = (list: [], filterInput: string) => {
  if (filterInput === "") {
    return list;
  } else {
    return list.filter((prod: any) =>
      prod.name.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase())
    );
  }
};
