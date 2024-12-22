
import { motion } from "framer-motion";
import { useGetAllProductsQuery } from '../../app/Slices/itemsSlice';
import { ShoppingCart, ChevronRight } from "lucide-react"; // Assuming you're using Feather Icons
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/Slices/cartSlice";
import { toast, ToastContainer } from 'react-toastify';

const ProductsList = () => {
    const dispatch = useDispatch();
    const { data: products, error, isLoading } = useGetAllProductsQuery();
    document.title = "Marketplace";


    // Convert the Firestore Timestamp to Date
    const transformedProducts = products ? products.map(product => ({
        ...product,
        timestamp: product.timestamp ? new Date(product.timestamp.seconds * 1000) : null,  // Convert Firestore timestamp to JS Date
    })) : [];

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`${product.name || 'Product'} added to cart!`);
    };

    if (isLoading) return <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Products..</p>
    </div>
    if (error) return <p className="text-center text-xl text-red-500">Error fetching products: {error.message}</p>;
    if (!transformedProducts || transformedProducts.length === 0) return <p className="text-center text-xl text-gray-500">No products available.</p>;

    return (
        <div className="min-h-screen">
            <header className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <motion.div
                    initial="initial"
                    animate="animate"
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 text-white"
                    >
                        Explore the <span className="gold-text">Marketplace</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                    >
                        Discover exclusive digital rewards, gaming codes, and crypto assets tailored just for you.
                    </motion.p>
                </motion.div>
            </header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-5">
                <h2 className="text-3xl font-semibold text-center text-white mb-10">Available Products</h2>

                {/* Grid for displaying products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {transformedProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            className="glass rounded-lg p-6 flex flex-col items-center hover:bg-black/60 transition-colors"
                            initial="initial"
                            animate="animate"
                        >

                            <img
                                src={product.img || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmJmMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNoaWVsZC1xdWVzdGlvbiI+PHBhdGggZD0iTTIwIDEzYzAgNS0zLjUgNy41LTcuNjYgOC45NWExIDEgMCAwIDEtLjY3LS4wMUM3LjUgMjAuNSA0IDE4IDQgMTNWNmExIDEgMCAwIDEgMS0xYzIgMCA0LjUtMS4yIDYuMjQtMi43MmExLjE3IDEuMTcgMCAwIDEgMS41MiAwQzE0LjUxIDMuODEgMTcgNSAxOSA1YTEgMSAwIDAgMSAxIDF6Ii8+PHBhdGggZD0iTTkuMSA5YTMgMyAwIDAgMSA1LjgyIDFjMCAyLTMgMy0zIDMiLz48cGF0aCBkPSJNMTIgMTdoLjAxIi8+PC9zdmc+"} // Use a fallback if no image
                                alt={product.name}
                                className="w-32 h-32 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2 text-white">{product.name}</h2>
                            {/* <h3 className="text-xl font-semibold mb-2 text-white text-left"><span className="gold-text">Type:</span> {product.productType}</h3> */}
                            {/* <p className="text-gray-400 mb-4 text-left"><span className="gold-text">Platform: </span>{product.platform}</p> */}
                            {product.region.length > 0 && <p className="text-gray-400 mb-4 text-left"><span className="gold-text">Region: </span>{product.region}</p>}
                            <p className="text-white text-lg"> Price: <span className="text-lg font-bold gold-text mb-4">{product.price} $</span></p>
                            <div className="btns flex">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="gold-gradient px-6 py-3 rounded-lg font-medium text-black mr-3"
                                >
                                    Add to Cart <ShoppingCart className="w-5 h-5 ml-2 inline-block" />
                                </button>

                                <button className="bg-gray-500 px-2 py-3 rounded-lg font-medium text-black hover:bg-gray-700">
                                    More Details <ChevronRight className="w-5 h-5 ml-2 inline-block" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>

    );
};

export default ProductsList;





// const ProductsList = () => {
//     const { data: products, error, isLoading } = useGetAllProductsQuery();

//     if (isLoading) return <p>Loading products...</p>;
//     if (error) return <p>Error fetching products: {error.message}</p>;
//     if (!products || products.length === 0) return <p>No products available.</p>;

//     return (
//         <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//                 <div key={product.id} className="border p-4 rounded-lg">
//                     <h2 className="font-bold text-lg">{product.productType}</h2>
//                     <p>Platform: {product.platform}</p>
//                     <p>Region: {product.region}</p>
//                     <p>Category: {product.category}</p>
//                     <p className="text-green-600 font-bold">Price: ${product.price}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductsList;
