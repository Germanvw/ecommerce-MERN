import { IProductCart } from "../../../redux/actions/OrderActions";
import ReviewModalItem from "./ReviewModalItem";

export const ReviewModalList = ({
  list,
  orderId,
}: {
  list: [];
  orderId: string;
}) => {
  return (
    <div className="row m-0 w-100 text-center">
      {list.map((cartItem: IProductCart) => (
        <ReviewModalItem
          orderId={orderId}
          cartItem={cartItem}
          key={cartItem._id!}
        />
      ))}
    </div>
  );
};
