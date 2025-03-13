import { useState } from "react";
import {  Filter, Instagram, X } from 'lucide-react';
import campaigns from "../Campaigns/campaign";
import Categories from "../Categories/categories";
import Platform from "../Platforms/platform";
// import Content from "../contents/content";

const FilterPanel = () => {

  const [activeTab, setActiveTab] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
      minCash: 0,
      maxCash: 10000,
      platforms: [],
      categories: [],
    });

    const filteredCampaigns = campaigns.filter(campaign => {
      if (activeTab === 'applied' && campaign.status !== 'active') return false;
      if (activeTab === 'hired' && campaign.hired === 0) return false;
      if (activeTab === 'closed' && campaign.status !== 'closed') return false;
  
      if (campaign.cash < filters.minCash || campaign.cash > filters.maxCash) return false;
      if (filters.platforms.length > 0 && !filters.platforms.includes(campaign.platform)) return false;
      if (filters.categories.length > 0 && !filters.categories.includes(campaign.category)) return false;
  
      return true;
    });


    const getTabCount = (tab) => {
      if (tab === 'all') return campaigns.length;
      if (tab === 'applied') return campaigns.filter(c => c.status === 'active').length;
      if (tab === 'hired') return campaigns.filter(c => c.hired > 0).length;
      return campaigns.filter(c => c.status === 'closed').length;
    };

  return (
    <div>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="border-b border-gray-200">
          <div className="flex items-center">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-2 md:p-4 rounded-lg transition-colors ${isFilterOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Filter className="w-5 h-5" />
            </button>
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {(['all', 'applied', 'hired', 'closed']).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
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

      {/* Filter Panel */}
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
                    onChange={(e) => setFilters(prev => ({ ...prev, minCash: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filters.maxCash}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxCash: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Platforms */}
             <Platform />

              {/* Categories */}
              <Categories />
            </div>
          </div>
        </div>
      )}

      {/* Campaign Cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 md:mb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map(campaign => (
            <div key={campaign.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`bg-gradient-to-r ${campaign.gradientFrom} ${campaign.gradientTo} p-6`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{campaign.title}</h2>
                    <p className="text-sm text-white/90">{campaign.description}</p>
                  </div>
                  <img 
                    src={campaign.productImage}
                    alt={`${campaign.title} product`}
                    className="w-24 h-24 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={campaign.logoImage}
                    alt={`${campaign.title} logo`}
                    className="w-12 h-12 rounded-full shadow"
                  />
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    campaign.status === 'pending'
                      ? 'bg-red-500 text-white'
                      : campaign.status === 'active'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">{campaign.tagline}</h3>
                  <Instagram className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Cash</p>
                    <p className="text-lg font-semibold">₹{campaign.cash}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Barter Worth</p>
                    <p className="text-lg font-semibold">₹{campaign.barterWorth}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(campaign.hired / campaign.totalSpots) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {campaign.hired}/{campaign.totalSpots} Hired
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    
    </div>
   
  )
}

export default FilterPanel;