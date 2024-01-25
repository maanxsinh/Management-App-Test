import axios from "axios";
import { getProduct } from "./productSlice";

const editProduct = async (dataEditProduct, productId, dispatch) => {
  let res = await axios.post(
    `${process.env.REACT_APP_PORT_API}/api/v1/product/edit`,
    {
      dataEditProduct,
      productId,
    }
  );
  console.log("edit product:", res);
  return res;
};

const getProductList = async (userId, dispatch) => {
  let res = await axios.get(
    `${process.env.REACT_APP_PORT_API}/api/v1/product/list`,
    {
      params: { userId },
    }
  );
  dispatch(getProduct(res));
  console.log("edit product:", res);
  return res;
};

export { editProduct, getProductList };
