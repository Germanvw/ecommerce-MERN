export interface categoryPropsDocument {
  _id: string;
  name: string;
  description: string;
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

export interface categoryProps {
  _id?: string;
  name: string;
  image: string;
  description: string;
}

export const initialCategoryState: { [index: string]: any } = {
  name: "",
  image: "",
  description: "",
};

export const customCategoryStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
  },
};

interface formCategoryProps {
  label: string;
  name: string;
  type: string;
}

export const formCategoryImputs = [
  { label: "Name", name: "name", type: "text", placeholder: "Name..." },
  {
    label: "Description",
    name: "description",
    type: "text",
    placeholder: "Description...",
  },
  { label: "Image", name: "image", type: "text", placeholder: "Image..." },
];
