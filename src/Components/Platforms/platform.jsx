import { useState } from "react";

const Platform = () => {
    const [filters, setFilters] = useState({
        minCash: 0,
        maxCash: 10000,
        platforms: [],
        // categories: [],
      })
    const togglePlatform = (platform) => {
        setFilters(prev => ({
          ...prev,
          platforms: prev.platforms.includes(platform)
            ? prev.platforms.filter(p => p !== platform)
            : [...prev.platforms, platform]
        }));
      };
    return (
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Platforms
      </label>
      <div className="flex flex-wrap gap-2">
        {['instagram', 'youtube', 'tiktok'].map(platform => (
          <button
            key={platform}
            onClick={() => togglePlatform('platform', platform)}
            className={`px-4 py-2 rounded-full text-sm ${
              filters.platforms.includes(platform)
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </button>
        ))}
      </div>
    </div>

    )
}

export default Platform;