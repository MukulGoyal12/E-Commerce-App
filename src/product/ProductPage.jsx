import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../tools/Loading";
import { getProduct } from "../api";
import { IoMdArrowRoundBack } from "react-icons/io";
import ProgressiveImage from "react-progressive-graceful-image";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Stars } from "../product/Product";
import { withCart } from "../providers/withHOC";

const ProductPage = ({ addToCart }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        navigate("/404", { replace: true });
      }
    }
    fetchData();
  }, [id]);
  return (
    <>
      {loading ? (
        <div className="grow flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="grow flex flex-col justify-center items-center text-gray-700 p-5 py-16 sm:p-16 relative">
          <Link
            to="/"
            className="absolute top-3 left-10 sm:left-60 gap-2 flex items-center text-3xl font-semibold"
          >
            <IoMdArrowRoundBack />
            <h1>Back</h1>
          </Link>
          <div className="max-w-5xl p-5 sm:p-16 bg-white flex gap-10 flex-col lg:flex-row">
            <ProgressiveImage src={data.images[0]} placeholder={data.thumbnail}>
              {(src) => (
                <img
                  className="min-w-0 w-full h-full object-contain object-center sm:px-10"
                  src={src}
                  alt={data.title}
                />
              )}
            </ProgressiveImage>
            <div className="w-full overflow-clip">
              <h2 className="text-3xl mb-4 leading-snug font-semibold">
                {data.title}
              </h2>
              <Stars rating={data.rating} />
              <h3 className="text-xl mt-4 mb-3 font-bold">${data.price}</h3>
              <p className="text-sm mb-8 leading-6">{data.description}</p>
              <input
                className="w-16 border border-gray-400 font-bold p-2 m-2"
                type="number"
                value={qty}
                min={1}
                onChange={(e) => setQty(+e.target.value)}
              />
              <button
                onClick={(e) => {
                  addToCart(data.id, qty);
                  setQty(1);
                }}
                className="bg-orange-500 text-white p-2 rounded-md font-bold sm:w-1/2 max-w-xs "
              >
                Add to Cart
              </button>
              <div className="flex justify-between my-10">
                {data.id === 1 ? (
                  <div></div>
                ) : (
                  <Link
                    to={"/product/" + (data.id - 1)}
                    className={clsx(
                      "hover:bg-orange-500 p-1 rounded-md hover:text-white border-2 font-bold border-orange-500 text-orange-500 transition duration-300 ease-in-out max-w-[6rem] w-full block text-center",
                    )}
                  >
                    Previous
                  </Link>
                )}
                {data.id === 100 ? (
                  <div></div>
                ) : (
                  <Link
                    to={"/product/" + (data.id + 1)}
                    className={clsx(
                      "hover:bg-orange-500 p-1 rounded-md hover:text-white border-2 font-bold border-orange-500 text-orange-500 transition duration-300 ease-in-out max-w-[6rem] w-full block text-center",
                    )}
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withCart(ProductPage);
