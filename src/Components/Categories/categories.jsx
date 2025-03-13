import { useState } from "react";

const Categories = () => {

    const [filters, setFilters] = useState({
            minCash: 0,
            maxCash: 10000,
            // platforms: [],
            categories: [],
          })
     const toggleCategory = (category) => {
        setFilters(prev => ({
          ...prev,
          categories: prev.categories.includes(category)
            ? prev.categories.filter(c => c !== category)
            : [...prev.categories, category]
        }));
      };

    return (
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <div className="flex gap-2">
          {['beauty', 'health', 'lifestyle'].map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                filters.categories.includes(category)
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
    )
}

export default Categories;