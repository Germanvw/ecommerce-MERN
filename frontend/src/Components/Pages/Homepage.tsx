import { MainButton } from "../Items/Buttons/MainButton";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <header>
        <div className="banner">
          <div className="container">
            <div className="col-md-3 col-sm-12">
              <h1>Ecommerce</h1>
              <div className="banner-button">
                <MainButton
                  handleClick={() => navigate("/products")}
                  title="Products"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="products-new">
          <h3>New</h3>
        </div>
      </main>
    </div>
  );
};
