import "./index.scss";

export const OrderTableUserDetails = ({ order }: any) => {
  const header = ["Id", "Img", "Name", "Price", "Quantity", "Total"];

  return (
    <div className="table">
      <table className="table-order-user-details">
        <thead>
          <tr>
            {header.map((item: string) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {order.cart.length > 0 &&
            order.cart.map((product: any) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <img
                    className="img-cart"
                    src={product.image}
                    alt={product.image}
                  />
                </td>
                <td>{product.name}</td>
                <td>{`$ ${product.price}`}</td>
                <td>{product.quantity}</td>
                <td>{`$ ${product.price * product.quantity}`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
