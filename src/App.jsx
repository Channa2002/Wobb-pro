import Header from './Components/Header/Header';
import './App.css'
import Bottomnav from './Components/BottomNav/bottomNav';
import Filterpanel from './Components/Filter/filter';
import Content from './Components/contents/content';

function App() {
 
  return (
    <>
     <div className="min-h-screen bg-gray-50">

      <Header />
      <Filterpanel />
      <Content />
      <Bottomnav />

    </div>
    </>
  )
}

export default App
