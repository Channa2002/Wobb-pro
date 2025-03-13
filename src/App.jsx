
import Header from './Components/Header/Header';
import Bottomnav from './Components/BottomNav/bottomNav'
import FilterPanel from './Components/Filter/filter';



function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Tabs and Filter */}
    <FilterPanel/>
      {/* Mobile Bottom Navigation */}
     <Bottomnav />
    </div>
  );
}

export default App;