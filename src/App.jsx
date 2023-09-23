import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import TableList from './Components/TableList';
import loginImg from "./assets/loginImg.png"
import SignIn from './Components/Signin';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import { routes } from './pages/routes/route';
import useModalStore from './store/IsAuth';

const App = () => {
  const {isAuth} = useModalStore();
  const navigate = useNavigate()
  const [apiuser, setApiUser] = useState()
 
  let url = "https://ishaserverface.onrender.com/data"
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiUser(data))
  }, [url])


  function deleteFunction(id) {
    fetch(url + "/" + id, {
      method: "DELETE",
    })
      .then((result) => result.json())
      .then(data => {
        toast.success("delete success")
        setInterval(() => {
          window.location.reload()
        }, 2000)
      })
      .catch((eror) => {
        toast.error("Malumotni topib bo`lmadi")
      })
  }



  return (
    <div>

      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='*' element={<h1>Bunday page mavjud emas</h1>}/>
        { isAuth ?
          routes.map((elem) => {
            return (
              <Route key={elem.id} path={elem.path} element={elem.element} />
            )
          })
          : ''
        }
      </Routes>

      <div className="hidden">
        <TableList apiuser={apiuser} deleteFunction={deleteFunction} />
      </div>
      {/* <SignIn/> */}
   



    </div>
  );
}

export default App;
