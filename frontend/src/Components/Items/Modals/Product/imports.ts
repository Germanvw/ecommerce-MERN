import { categoryProps } from "../Category/imports";

export interface productPropsDocument {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
  category: categoryProps;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export const errorProductInit = {
  name: true,
  description: true,
  image: true,
  price: true,
  inStock: true,
};

export const inputProps = {
  placeholder: "Filter by name...",
  type: "text",
  name: "filter",
};

export const customProductStyles = {
  content: {
    top: "25%",
    left: "25%",
    right: "auto",
    bottom: "auto",
  },
};

export const initialProductState: { [index: string]: any } = {
  name: "",
  description: "",
  image: "",
  price: "",
  inStock: "",
  category: "",
  brand: "",
};

export const formProductsImputs = [
  { label: "Name", name: "name", type: "text", placeholder: "Name..." },
  {
    label: "Description",
    name: "description",
    type: "text",
    placeholder: "Description...",
  },
  { label: "Image", name: "image", type: "text", placeholder: "Image..." },
  { label: "Price", name: "price", type: "number", placeholder: "Price..." },
  { label: "Stock", name: "inStock", type: "number", placeholder: "Stock..." },
];

export const formProductsDisplay = [
  { label: "Id", name: "_id", type: "text", placeholder: "Id", active: true },
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Name...",
    active: true,
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    placeholder: "Description...",
    active: true,
  },
  {
    label: "Image",
    name: "image",
    type: "text",
    placeholder: "Image...",
    active: true,
  },
  {
    label: "Price",
    name: "price",
    type: "number",
    placeholder: "Price...",
    active: true,
  },
  {
    label: "Stock",
    name: "inStock",
    type: "number",
    placeholder: "Stock...",
    active: true,
  },
  {
    label: "Sold",
    name: "totalSold",
    type: "number",
    placeholder: "Sold...",
    active: true,
  },
  {
    label: "Review Count",
    name: "totalReview",
    type: "number",
    placeholder: "Reviews...",
    active: true,
  },
  {
    label: "Rating",
    name: "rating",
    type: "number",
    placeholder: "Rating...",
    active: true,
  },
];
