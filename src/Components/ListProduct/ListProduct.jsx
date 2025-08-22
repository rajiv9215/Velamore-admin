import React, { useEffect, useState } from "react";
import cross_icon from '../Assets/cross_icon.png';
import { backend_url, currency } from "../../App";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (_id) => {
    await fetch(`${backend_url}/removeproduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({_id}),
    });
    fetchInfo();
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] px-[50px] py-[10px] m-[30px] rounded-md bg-white max-[800px]:w-[95%] max-[800px]:m-[20px_auto] max-[800px]:p-[10px_30px]">
      <h1 className="text-xl font-bold">All Products List</h1>

      {/* Header Row */}
      <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-2 w-full py-5 text-[#454545] text-[15px] font-semibold max-[800px]:text-[12px] max-[800px]:py-[15px]">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      {/* Product List */}
      <div className="w-full overflow-y-auto no-scrollbar">
        <hr />
        {allproducts.map((e, index) => (
          <div key={index}>
            <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-2 w-full items-center font-medium text-sm py-4">
              <img
                className="h-20 max-[800px]:h-[60px]"
                src={e.image[0].url}
                alt=""
              />
              <p className="truncate">{e.name}</p>
              <p>{currency}{e.old_price}</p>
              <p>{currency}{e.new_price}</p>
              <p>{e.category}</p>
              <img
                className="cursor-pointer mx-auto w-5 h-5"
                onClick={() => removeProduct(e._id)}
                src={cross_icon}
                alt=""
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
