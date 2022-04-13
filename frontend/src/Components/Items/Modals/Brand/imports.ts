export interface brandPropsDocument {
  _id: string;
  name: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export const inputProps = {
  placeholder: "Filter by name...",
  type: "text",
  name: "filter",
};

export const initialBrandState: { [index: string]: any } = {
  name: "",
  image: "",
};

export const errorBrandInit = {
  name: true,
  image: true,
};

export const formBrandImputs = [
  { label: "Name", name: "name", type: "text", placeholder: "Name..." },
  { label: "Image", name: "image", type: "text", placeholder: "Image..." },
  {
    label: "Active",
    placeholder: "Active",
    type: "text",
    name: "active",
    active: true,
  },
];
