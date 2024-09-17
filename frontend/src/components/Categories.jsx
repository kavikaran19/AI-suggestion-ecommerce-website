
import Link from 'next/link';
export default function Categories({categories,error}) {
    return (
      <>
     

<div>
      {error && <p>{error}</p>}
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
            >
              {category.name}
            </Link>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
    </>
    );
  }
  