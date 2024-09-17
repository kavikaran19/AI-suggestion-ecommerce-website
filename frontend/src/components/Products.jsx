import Image from 'next/image';
import Link from 'next/link';

export default function Products({ products = [], error }) {
  return (
    <>
      <div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="border p-4 rounded-lg shadow-md">
                <Image
                  src={`http://localhost:8000/${product.photo}`} // Ensure the path starts with a leading slash
                  alt={product.name} // Use product's name as alt text for better accessibility
                  width={500} // Specify the width
                  height={300} // Specify the height
                  className="object-cover rounded-lg" // Ensures the image fits within the container
                />
                <h2 className="text-lg font-bold mt-2">{product.name}</h2>
                <p className="text-gray-500">${product.price}</p>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
}
