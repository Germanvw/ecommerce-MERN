export const paymentOptions = [
  { name: "Cash", value: "Cash" },
  { name: "Credit Card", value: "Credit Card" },
  { name: "Paypal", value: "Paypal" },
  { name: "Bitcoin", value: "Bitcoin" },
];

export const paymentAdressInfo = {
  label: "Receiving Adress",
  placeholder: "Adress",
  type: "text",
  name: "payAdress",
};

export const initErrorsCheckout = {
  payAdress: true,
};
