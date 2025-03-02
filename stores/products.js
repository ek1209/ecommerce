import axios from "axios";
import { defineStore } from 'pinia';

export const useProductsStore = defineStore("products", () => {
  const products = ref(null);
  const categories = ref(null)
  const productDetails = ref(null)


  async function getProductList(limit, skip, sortBy, order, search) {
    console.log(limit, sortBy, order)
    try {
      const response = await axios.get(
        'https://dummyjson.com/products', {
          params: {
            limit: limit,
            skip: skip,
            sortBy: sortBy,
            order: order,
            search: search
          }
        }
      )
      products.value = response.data;
    } catch (err) {
      error.value = err.message;
    }
  }

  async function getProductSearch(query) {
    console.log("getProductSearch called with:", { query });
    try {
      const response = await axios.get('https://dummyjson.com/products/search', {
        params: {
          q: query,
          select: 'title,price,thumbnail,category,rating,stock', // Select needed fields
        },
      });

      if (!response.data || !response.data.products) {
        throw new Error('Invalid response data: products field missing');
      }

      products.value = response.data;
      console.log("getProductSearch successful, data:", products.value);
      return products.value;
    } catch (err) {
      console.error("Error in getProductSearch:", err.message, err.stack);
      products.value = null;
      throw err;
    }
  }

  async function getCategories() {
         await axios.get(
          "https://dummyjson.com/products/categories"
        ).then((response) => {
            categories.value = response.data
        }).catch((e) => {
            console.log("error", e);
            
            return e
        });
       
  }

  async function getProductDetails(id) {
    await axios.get(
     `https://dummyjson.com/products/${id}`
   ).then((response) => {
       productDetails.value = response.data
   }).catch((e) => {
       console.log("error", e);
       
       return e
   });
  }

  return {
    products,
    getProductList,
    categories,
    getCategories,
    productDetails,
    getProductDetails,
    getProductSearch
  };
});
