import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Page from "./page"
import AddItem from './components/AddItem';

function App() {
  return (
    <div className="App"> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page/>}/>
            <Route path="AddItem" element={<AddItem/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
