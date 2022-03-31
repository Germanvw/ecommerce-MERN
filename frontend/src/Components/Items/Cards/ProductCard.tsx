import "./index.scss";

export const ProductCard = ({ product }: any) => {
  const { name, image } = product;

  return (
    <div className="product-card">
      <div className="product-img">
        <img src={image} alt={image} />
      </div>
      <div className="product-info">
        <div className="info-title">
          <h3>{name}</h3>
        </div>
        <div className="info-price">
          <h3>{`$ ${product.price}`}</h3>
        </div>
      </div>
      <div className="product-buttons">
        <button>See Details</button>
        <button>Add to Card</button>
      </div>
    </div>
  );
};
