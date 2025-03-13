import campaigns from "../Campaigns/campaign";
import { useState } from "react";
import { Instagram } from "lucide-react";

const Content = () => {
    const [activeTab] = useState('all');
    const [filters] = useState({
      minCash: 0,
      maxCash: 10000,
      platforms: [],
      categories: [],
    });

    const filteredCampaigns = campaigns.filter(campaign => {
        // Tab filtering
        if (activeTab === 'applied' && campaign.status !== 'active') return false;
        if (activeTab === 'hired' && campaign.hired === 0) return false;
        if (activeTab === 'closed' && campaign.status !== 'closed') return false;
    
        // Advanced filtering
        if (campaign.cash < filters.minCash || campaign.cash > filters.maxCash) return false;
        if (filters.platforms.length > 0 && !filters.platforms.includes(campaign.platform)) return false;
        if (filters.categories.length > 0 && !filters.categories.includes(campaign.category)) return false;
    
        return true;
      });
    return (
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
                    alt="Product"
                    className="w-24 h-24 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={campaign.logoImage}
                    alt="Logo"
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
                    <p className="text-lg font-semibold">INR {campaign.cash}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Barter Worth</p>
                    <p className="text-lg font-semibold">INR {campaign.barterWorth}</p>
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
    )
}

export default Content;