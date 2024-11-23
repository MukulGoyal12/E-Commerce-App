import ProgressiveImage from "react-progressive-graceful-image";
import { Link } from "react-router-dom";
import CrossSVG from "../SVG/CrossSVG";

const CartRow = ({ product, qty, storeToLocalCart, removeFromCart }) => {
  return (
    <div className="lg:h-28 flex flex-col lg:flex-row items-center border py-2 mb-8 lg:m-0">
      <button
        className="h-8 lg:h-1/4 w-20 flex self-end lg:self-center justify-center"
        onClick={() => removeFromCart(product.id)}
      >
        <CrossSVG color="#000000" width="1.5" />
      </button>
      <ProgressiveImage src={product.images[0]} placeholder={product.thumbnail}>
        {(src) => (
          <img
            className="h-28 lg:h-full aspect-square object-cover object-center"
            src={src}
            alt={product.title}
          />
        )}
      </ProgressiveImage>
      <div className="flex justify-between w-full lg:w-auto lg:border-0 p-3 lg:p-0 border-t-2 grow">
        <h1 className="lg:hidden font-bold">Product:</h1>
        <Link
          className="text-orange-500 text-left"
          to={`/product/${product.id}`}
        >
          <h1>{product.title}</h1>
        </Link>
      </div>
      <div className="flex justify-between w-full lg:w-32 lg:border-0 p-3 lg:p-0 border-t-2 ">
        <h1 className="lg:hidden font-bold">Price:</h1>
        <h2 className="">${product.price.toFixed(2)}</h2>
      </div>
      <div className="flex justify-between w-full lg:w-32 lg:border-0 p-3 lg:p-0 border-t-2 ">
        <h1 className="lg:hidden font-bold">Quantity:</h1>
        <input
          type="number"
          className="w-16 h-8 text-center border border-gray-300"
          value={qty}
          onChange={(e) => storeToLocalCart(product.id, +e.target.value)}
          min={1}
        />
      </div>
      <div className="flex justify-between w-full lg:w-32 lg:border-0 p-3 lg:p-0 border-t-2 ">
        <h1 className="lg:hidden font-bold">Subtotal:</h1>
        <h3>${(product.price * qty).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartRow;
