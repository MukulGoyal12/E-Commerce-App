import clsx from "clsx";
import Product from "./product/Product";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "./tools/Loading";
import { getProducts } from "./api";

const Home = () => {
  const [data, setData] = useState();
  const products = data?.products || [];
  const lastPage = Math.ceil(products.length / 9);

  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = +searchParams.get("page") || 1;
  const sortBy = searchParams.get("sortBy") || "default";
  const order = searchParams.get("order") || "asc";
  const search = searchParams.get("search") || "";

  const buttonData = [
    { hide: page === 1, text: "<", go: -1 },
    { hide: page === 0, text: page, go: 0 },
    {
      hide: page === lastPage,
      text: page + 1,
      go: 1,
    },
    {
      hide: page >= lastPage - 1,
      text: page + 2,
      go: 2,
    },
    {
      hide: page === lastPage,
      text: ">",
      go: 1,
    },
  ];
  useEffect(() => {
    const timeout = setTimeout(() => {
      async function fetchData() {
        try {
          setLoading(true);
          const data = await getProducts(search, sortBy, order);
          setData(data);
          setLoading(false);
        } catch (error) {
          console.error(error.message);
          navigate("/404", { replace: true });
        }
      }
      fetchData();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, sortBy, order]);

  if (lastPage !== 0 && page > lastPage) {
    return <Navigate to="/404" replace />;
  }
  return (
    <div className="grow p-5 sm:p-16">
      <section className=" max-w-7xl p-5 sm:p-16 mx-auto bg-white ">
        <div className="flex justify-end flex-wrap gap-4 flex-col sm:flex-row">
          <input
            type="text"
            className="p-2 max-w-full sm:max-w-xs grow bg-gray-50 border border-gray-300"
            value={search}
            placeholder="Search products"
            onChange={(e) =>
              setSearchParams((prev) => {
                prev.set("search", e.target.value);
                prev.set("page", 1);
                return prev;
              })
            }
          />
          <select
            value={sortBy + " " + order}
            className="p-2 max-w-full sm:max-w-xs grow bg-gray-50 border border-gray-300 "
            onChange={(e) =>
              setSearchParams((prev) => {
                const [sortBy, order] = e.target.value.split(" ");
                prev.set("sortBy", sortBy);
                prev.set("order", order);
                return prev;
              })
            }
          >
            <option value="default asc">Default Sort</option>
            <option value="title asc">Sort by title</option>
            <option value="price asc">Sort by price: low to high</option>
            <option value="price desc">Sort by price: high to low</option>
          </select>
        </div>
        {loading ? (
          <div className="m-20">
            <Loading />
          </div>
        ) : products.length === 0 ? (
          <div className="p-20 text-3xl font-bold text-center">
            No products found.
          </div>
        ) : (
          <>
            <div
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
              className="sm:grid gap-2 overflow-scroll"
            >
              {
                //only show 9 products
                products.slice(page * 9 - 9, page * 9).map((product) => (
                  <Product key={product.id} {...product} />
                ))
              }
            </div>
            <div className="flex flex-wrap gap-2 my-8 text-orange-500">
              {buttonData.map((data, i) => (
                <button
                  key={i}
                  className={clsx(
                    "hover:bg-orange-500 border-2 border-orange-500 hover:text-white px-4 py-2 transition duration-300 ease-in-out",
                    (data.hide || lastPage === 0) && "hidden",
                    data.go === 0 && "bg-orange-500 text-white",
                  )}
                  onClick={() => {
                    setSearchParams((prev) => {
                      prev.set("page", page + data.go);
                      return prev;
                    });
                  }}
                >
                  {data.text}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
