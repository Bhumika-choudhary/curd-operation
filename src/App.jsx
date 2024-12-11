import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Single import for BrowserRouter
import Create from './component/create';
import Read from './component/read';
import Update from './component/update';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/read" element={<Read/>} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
