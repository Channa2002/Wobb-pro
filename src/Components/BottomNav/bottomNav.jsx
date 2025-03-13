import { Filter, MessageCircle, User} from 'lucide-react';

const Bottomnav = () => {
    return (
        <nav className="fixed bottom-0 w-full bg-white border-t md:hidden">
        <div className="flex justify-around items-center h-16">
          <a href="#" className="flex flex-col items-center text-blue-600">
            <Filter className="w-5 h-5 mb-1" />
            <span className="text-xs">Campaigns</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600">
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">Messages</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600">
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Profile</span>
          </a>
        </div>
      </nav>
    )
}


export default Bottomnav;