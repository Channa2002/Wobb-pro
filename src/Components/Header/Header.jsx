import { Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl md:text-2xl font-semibold">Hi, Channa</h1>
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" />
          </div>
        </div>
      </header>
    )
}

export default Header;