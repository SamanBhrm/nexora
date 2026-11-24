
import { apiFetch } from "./api";

export const getStoreData = async () => {

  const [
    products,
    categories,
    shopCategories
  ] = await Promise.all([
    apiFetch("/products"),
    apiFetch("/categories"),
    apiFetch("/shopCategories")
  ]);

  return {
    products,
    categories,
    shopCategories
  };
};
