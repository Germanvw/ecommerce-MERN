import { MainButton } from "../Items/Buttons/MainButton";
import { useNavigate } from "react-router-dom";
import { DisplayTop } from "../Items/Other/DisplayTop";

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <header>
        <div className="row m-0 w-100 h-100">
          <div className="banner">
            <div className="container h-100">
              <div className="col-md-6 col-sm-12 h-100 d-flex align-items-center justify-content-center">
                <div>
                  <h1>Ecommerce</h1>
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </p>
                  <div className="banner-button">
                    <MainButton
                      handleClick={() => navigate("/products")}
                      title="Products"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <DisplayTop />
      </main>
    </div>
  );
};
