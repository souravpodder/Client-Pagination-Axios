import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  // console.log(totalPage);
  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);


  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:5000/products?limit=${limit}&pageNumber=${pageNumber}`);
      console.log(data);

      if (!data.success) {
        setProducts([]);
        return toast.error(data.error);
      }

      setProducts(data.data);
      setTotalPage(Math.ceil(data.count / limit));

    })();
  }, [limit, pageNumber])
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-screen mx-1">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Serial Number
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Product image
            </th>

            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => {
              return <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {product.index}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {product.name}
                </th>
                <td className="px-6 py-4">
                  {product.price}
                </td>
                <td className="px-6 py-4">
                  <img className='w-20 rounded-lg' src={product.image} alt="" />
                </td>

                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            })

          }
        </tbody>
      </table>

      <div className='flex my-3 justify-end'>
        {
          [...Array(totalPage).keys()].map(number => <div className={`border-2 cursor-pointer border-black mx-3 px-3 py-2 ${number === pageNumber ? 'bg-black text-white' : ''}`}
            onClick={() => setPageNumber(number)}
          >{number + 1}</div>)
        }
        <select defaultValue={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default AllProducts;