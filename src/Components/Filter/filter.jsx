import { useState } from "react";
import { Filter, X } from 'lucide-react';
import campaigns from "../Campaigns/campaign";
import Platform from "../Platforms/platform";
import Categories from "../Categories/categories";

const Filterpanel = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
      minCash: 0,
      maxCash: 10000,
      platforms: [],
      categories: [],
    });

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
      };
      const getTabCount = (tab) => {
        if (tab === 'all') return campaigns.length;
        if (tab === 'applied') return campaigns.filter(c => c.status === 'active').length;
        if (tab === 'hired') return campaigns.filter(c => c.hired > 0).length;
        return campaigns.filter(c => c.status === 'closed').length;
      };
    return (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="border-b border-gray-200">
          <div className="flex items-center">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-2 md:p-4 rounded-lg transition-colors ${isFilterOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Filter className="w-5 h-5" />
            </button>
            <nav className="-mb-px flex space-x-8">
              {(['all', 'applied', 'hired', 'closed']).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({getTabCount(tab)})
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {isFilterOpen && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Cash Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cash Range (₹{filters.minCash} - ₹{filters.maxCash})
                      </label>
                      <div className="flex gap-4">
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          value={filters.minCash}
                          onChange={(e) => handleFilterChange('minCash', parseInt(e.target.value))}
                          className="w-full"
                        />
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          value={filters.maxCash}
                          onChange={(e) => handleFilterChange('maxCash', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
      
                    {/* Platforms */}
                   <Platform/>
      
                    {/* Categories */}
                   <Categories/>
                  </div>
                </div>
              </div>
            )}
        </>
      

      
    )
}

export default Filterpanel;