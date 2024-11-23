import axios from "axios";

export async function getProducts(search, sortBy, order) {
  const res = await axios.get("https://dummyjson.com/products/search", {
    params: { q: search, sortBy, order, limit: 0 },
  });
  const products = res.data.products.filter((product) => product.id <= 100);
  return { products, total: products.length };
}

export async function getProduct(id) {
  if (id > 100 || id < 1) throw new Error("Product not found");
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
}

export async function getCartProducts(cart) {
  const promises = Object.keys(cart).map((id) =>
    axios.get(`https://dummyjson.com/products/${id}`),
  );
  const res = await Promise.all(promises);
  return res.reduce((acc, { data }) => {
    acc[data.id] = { product: data, qty: cart[data.id] };
    return acc;
  }, {});
}

export async function getAccount(token) {
  const res = await axios.get("https://myeasykart.codeyogi.io/me", {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
}

export async function login(email, password) {
  const res = await axios.post("https://myeasykart.codeyogi.io/login", {
    email,
    password,
  });
  return res.data;
}

export async function signup(fullName, email, password) {
  const res = await axios.post("https://myeasykart.codeyogi.io/signup", {
    fullName,
    email,
    password,
  });
  return res.data;
}

export async function saveCart(cart) {
  const response = await axios.post(
    "https://myeasykart.codeyogi.io/carts",
    { data: cart },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
  );
  return response.data;
}

export async function getCart() {
  const response = await axios.get("https://myeasykart.codeyogi.io/carts", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.data.reduce((acc, { product, quantity }) => {
    acc[product.id] = quantity;
    return acc;
  }, {});
}
