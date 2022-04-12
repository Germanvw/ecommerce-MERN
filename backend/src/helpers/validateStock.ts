import { OrdersDocument } from "../Models/Orders";
import Products, { ProductDocument } from "../Models/Products";

export const validateProducts = async (newOrder: OrdersDocument) => {
  const { cart } = newOrder;
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

    if (!product) return false;

    if (product.inStock >= quantity) return true;

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
    // Find product
    const product = await Products.findById(item._id);
    if (product) {
      if (reqType === "create") {
        //Create order = rest stock, sum total sold
        await Products.findByIdAndUpdate(item._id, {
          inStock: product.inStock - item.quantity,
          totalSold: product.totalSold + item.quantity,
        });
      } else {
        //Create order = sum stock, rest total sold
        await Products.findByIdAndUpdate(item._id, {
          inStock: product.inStock + item.quantity,
          totalSold: product.totalSold - item.quantity,
        });
      }
    }
  });
  try {
    return { status: true };
  } catch (err) {
    return false;
  }
};
