import { OrdersDocument } from "../Models/Orders";
import Products, { ProductDocument } from "../Models/Products";

export const validateProducts = async (newOrder: OrdersDocument) => {
  const { cart } = newOrder;
  console.log(cart);
  // Validate avalability of products
  try {
    for (let i = 0; i < cart.length; i++) {
      const avalability = await validateStock(cart[i]._id, cart[i].quantity);
      if (!avalability) {
        return {
          status: false,
          msg: `Product ${cart[i].name} is out of stock`,
        };
      }
    }

    return { status: true };
  } catch (err) {
    return { status: false, msg: err };
  }
};

const validateStock = async (_id: any, quantity: number) => {
  try {
    const product = await Products.findById(_id);
    if (!product) {
      return false;
    }

    if (product.inStock >= quantity) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const handleStock = async (
  newOrder: OrdersDocument,
  reqType: "create" | "cancel"
) => {
  const { cart } = newOrder;

  cart.forEach(async (item: any) => {
    const productFetched = await Products.findById(item._id);
    if (productFetched) {
      if (reqType === "create") {
        await Products.findByIdAndUpdate(item._id, {
          inStock: productFetched.inStock - item.quantity,
        });
      } else {
        const currentProduct = await Products.findById(item._id);
        if (currentProduct) {
          await Products.findByIdAndUpdate(item._id, {
            inStock: productFetched.inStock + item.quantity,
          });
        }
      }
    }
  });
  // Validate avalability of products
  try {
    return { status: true };
  } catch (err) {
    return false;
  }
};
