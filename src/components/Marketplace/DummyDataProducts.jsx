import React from 'react'
import { useGetAllProductsQuery } from '../../app/Slices/dummyApiDataSlice';
import './DummyDataProducts.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../app/Slices/cartSlice';
import { toast, ToastContainer } from 'react-toastify';

const DummyDataProducts = () => {
    const res = useGetAllProductsQuery();
    console.log(res);

    const dispatch = useDispatch();

    const { data, isError, isLoading } = useGetAllProductsQuery();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Product added to cart');
    }

    if (isLoading) {
        return <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading ....</p>
        </div>
    }

    if (isError) {
        return <div className="loading-screen">
            <div className="spinner"></div>
            <h1>Error</h1>
        </div>
    }




    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-5">
            <div className="products-container flex flex-wrap">
                {data?.products.map((product) => (
                    <div key={product.id} className='product-card text-white base-comp flex flex-col items-center justify-center m-2'>
                        <h1>{product.title}</h1>
                        <img src={product.images ||
                            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmJmMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNoaWVsZC1xdWVzdGlvbiI+PHBhdGggZD0iTTIwIDEzYzAgNS0zLjUgNy41LTcuNjYgOC45NWExIDEgMCAwIDEtLjY3LS4wMUM3LjUgMjAuNSA0IDE4IDQgMTNWNmExIDEgMCAwIDEgMS0xYzIgMCA0LjUtMS4yIDYuMjQtMi43MmExLjE3IDEuMTcgMCAwIDEgMS41MiAwQzE0LjUxIDMuODEgMTcgNSAxOSA1YTEgMSAwIDAgMSAxIDF6Ii8+PHBhdGggZD0iTTkuMSA5YTMgMyAwIDAgMSA1LjgyIDFjMCAyLTMgMy0zIDMiLz48cGF0aCBkPSJNMTIgMTdoLjAxIi8+PC9zdmc+"}
                            alt={product.name}
                            className='w-32 h-32 object-cover rounded-md mb-4'
                        />
                        <p>{product.category.toUpperCase()}</p>
                        <p>{product.description}</p>
                        <p>Price: <span className='gold-text'>{product.price} $</span></p>

                        <button>Add To Cart</button>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    )
}

export default DummyDataProducts;