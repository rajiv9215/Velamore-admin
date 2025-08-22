import React, { useState } from "react";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {
  const [image, setImage] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: [],
    category: "women",
    new_price: "",
    old_price: "",
  });

  const handleAddProduct = async () => {
    let formData = new FormData();
    for (const file of image) {
      formData.append("product", file);
    }
    console.log(formData,image);
    try {
      const uploadRes = await fetch(`${backend_url}/upload`, {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      console.log(uploadData)

      if (uploadData.success) {
        const product = {
          name: productDetails.name,
          description: productDetails.description,
          category: productDetails.category,
          new_price: productDetails.new_price,
          old_price: productDetails.old_price,
          image: uploadData.images,
        };

        const res = await fetch(`${backend_url}/addproduct`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const data = await res.json();
        console.log(data)
        
        if (data.success) {
          alert("Product Added");
        } else {
          alert("Failed to add product");
          console.log("Server response:", data);
        }
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      console.error("Upload/Add Error:", err);
      alert("Something went wrong.");
    }
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-md px-12 py-8 mx-8 my-5 box-border">
      <div className="w-full text-gray-600 text-base mb-4">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
          className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none text-sm text-gray-600"
        />
      </div>

      <div className="w-full text-gray-600 text-base mb-4">
        <p>Product description</p>
        <input
          type="text"
          name="description"
          value={productDetails.description}
          onChange={changeHandler}
          placeholder="Type here"
          className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none text-sm text-gray-600"
        />
      </div>

      <div className="flex gap-10 mb-4">
        <div className="w-full text-gray-600 text-base">
          <p>Price</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Type here"
            className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none text-sm text-gray-600"
          />
        </div>
        <div className="w-full text-gray-600 text-base">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Type here"
            className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none text-sm text-gray-600"
          />
        </div>
      </div>

      <div className="w-full text-gray-600 text-base mb-4">
        <p>Product category</p>
        <select
          value={productDetails.category}
          name="category"
          className="w-28 h-12 px-2 border border-gray-400 rounded-md text-sm text-gray-600"
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="w-full text-gray-600 text-base mb-4">
        <p>Product image</p>
        <label htmlFor="file-input">
          <div className="flex flex-wrap gap-3 mt-2">
            {image.length === 0 ? (
              <img
                className="w-28 h-28 object-contain border border-gray-300 rounded-lg"
                src={upload_area}
                alt=""
              />
            ) : (
              image.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    className="w-28 h-28 object-contain border border-gray-300 rounded-lg"
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                  />
                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setImage(image.filter((_, i) => i !== idx));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded-bl hidden group-hover:block"
                  >
                    ✕
                  </button>
                  {/* Reorder buttons */}
                  <div className="absolute bottom-0 left-0 flex space-x-1 bg-white/80 p-0.5 rounded-tr">
                    {idx > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const newImages = [...image];
                          [newImages[idx - 1], newImages[idx]] = [
                            newImages[idx],
                            newImages[idx - 1],
                          ];
                          setImage(newImages);
                        }}
                        className="text-xs px-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        ←
                      </button>
                    )}
                    {idx < image.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const newImages = [...image];
                          [newImages[idx + 1], newImages[idx]] = [
                            newImages[idx],
                            newImages[idx + 1],
                          ];
                          setImage(newImages);
                        }}
                        className="text-xs px-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        →
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </label>

        <input
          onChange={(e) => setImage([...e.target.files])}
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          multiple
          hidden
        />
      </div>

      <button
        className="mt-10 w-40 h-12 bg-blue-600 text-white text-base font-medium rounded-md"
        onClick={handleAddProduct}
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
