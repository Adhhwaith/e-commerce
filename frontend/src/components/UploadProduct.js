import React, { useEffect, useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { MdDelete } from "react-icons/md";
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import {toast} from 'react-toastify'

const UploadProduct = ({
    onClose,
    fetchData
}) => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  }

  const handleAddImage = async () => {
    if (!imageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }

    try {
      // Validate URL format
      new URL(imageUrl);
      
      // Check if image exists and is accessible
      const response = await fetch(imageUrl, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Image URL is not accessible');
      }
      
      // Check if content type is an image
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error('URL does not point to a valid image');
      }

      // Add image URL to product images
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, imageUrl]
      }));
      
      // Clear the input
      setImageUrl("");
      toast.success("Image added successfully");
    } catch (error) {
      toast.error(error.message || "Invalid image URL");
    }
  }

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage]
    }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (data.productImage.length === 0) {
      toast.error("Please add at least one product image");
      return;
    }

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  }

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose/>
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name :</label>
          <input 
            type='text' 
            id='productName' 
            placeholder='enter product name' 
            name='productName'
            value={data.productName} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input 
            type='text' 
            id='brandName' 
            placeholder='enter brand name' 
            value={data.brandName} 
            name='brandName'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='category' className='mt-3'>Category :</label>
          <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
            <option value={""}>Select Category</option>
            {
              productCategory.map((el,index) => {
                return(
                  <option value={el.value} key={el.value+index}>{el.label}</option>
                )
              })
            }
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
          <div className='flex gap-2'>
            <input 
              type='text' 
              placeholder='Enter image URL' 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className='p-2 bg-slate-100 border rounded flex-1'
            />
            <button 
              type='button'
              onClick={handleAddImage}
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Add Image
            </button>
          </div>

          <div className='flex flex-wrap gap-2 mt-2'>
            {data.productImage.map((imageUrl, index) => (
              <div key={index} className='relative group'>
                <img 
                  src={imageUrl} 
                  alt={`Product ${index + 1}`} 
                  width={80} 
                  height={80}  
                  className='bg-slate-100 border cursor-pointer'  
                  onClick={() => {
                    setOpenFullScreenImage(true);
                    setFullScreenImage(imageUrl);
                  }}
                />
                <div 
                  className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' 
                  onClick={() => handleDeleteProductImage(index)}
                >
                  <MdDelete/>  
                </div>
              </div>
            ))}
          </div>

          {data.productImage.length === 0 && (
            <p className='text-red-600 text-xs'>*Please add at least one product image</p>
          )}

          <label htmlFor='price' className='mt-3'>Price :</label>
          <input 
            type='number' 
            id='price' 
            placeholder='enter price' 
            value={data.price} 
            name='price'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
          <input 
            type='number' 
            id='sellingPrice' 
            placeholder='enter selling price' 
            value={data.sellingPrice} 
            name='sellingPrice'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea 
            className='h-28 bg-slate-100 border resize-none p-1' 
            placeholder='enter product description' 
            rows={3} 
            onChange={handleOnChange} 
            name='description'
            value={data.description}
            required
          />

          <button 
            type='submit'
            className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'
          >
            Upload Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
      )}
    </div>
  )
}

export default UploadProduct