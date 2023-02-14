import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from "./hooks/useToken";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

function App() {
  const [token] = useToken();
  const {modal} = useSelector(state => state.modal);
  return (
    <div>
      <div className='text-black font-bold text-2xl cursor-pointer'>hello world!</div>
     <BrowserRouter>
     {token?.token && <Navbar></Navbar>}
     {modal && <Modal />}
      <Routes>
        <Route path="/" element={!token?.token ? <Link to={'/auth'}/> : <Home />}/>
        <Route path="/auth" element={<Auth />}/>
      </Routes>
      <Link to={'/auth'}>auth</Link>
     </BrowserRouter>
     <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
