import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableList from './TableList';
import loginImg from "../assets/loginImg.png"
import { Route, Routes, useNavigate } from 'react-router-dom';
import { routes } from '../pages/routes/route';
import useModalStore from '../store/IsAuth';

const SignIn = () => {
    const {openModal} = useModalStore();
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false)
    const { register, handleSubmit } = useForm()
    const [apiuser, setApiUser] = useState()

    function onSubmit(data) {
        apiuser.map(({ login, password }) => {
            if (login === data?.login && password === data?.password) {
                toast.success('You can access this section')
                navigate("/home");
                openModal();
            } else if (data?.login === "" || data?.password === "") {
                toast.warning('password undefined');
            } else {
                toast.error("kirishingiz taqiqlanadi");
            }
        })
    }
    let url = "https://ishaserverface.onrender.com/data"
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setApiUser(data))
    }, [url])

    const onCreate = (data) => {
        if (data.login === "" || data.password === "") {
            toast.warning("to`ldiring")
        } else {
            fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
                .then((respons) => {
                    toast.success("yaratildi")
                    setTimeout(() => {
                        if (respons.status == 201) {
                            window.location.reload()
                            window.localStorage.getItem.apply(data)
                        }
                    }, 2100)
                })
                .catch((error) => {
                    toast.error("yuklanmadi")
                })
        }
    }
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
            <div className="hidden">
                <TableList apiuser={apiuser} deleteFunction={deleteFunction} />
            </div>

            <ToastContainer />
            <div className='flex'>
                <div className='flex h-[100vh] w-[50%] ' >
                    <img src={loginImg} alt="" className='flex w-[100%] h-[100%] object-cover' />
                </div>
                <div className='w-[50%] h-[90vh] flex justify-center items-center flex-col'>
                    <h2 className='text-[#F48221] font-[700] mb-5  text-[40px]'>Tizimga kirish</h2>
                    <form action="" onSubmit={handleSubmit(isLogin ? onCreate : onSubmit)} className='mt-4'>
                        <label>
                            <span className='text-red-400'>{isLogin && "Create"} Ma`mur</span>
                            <br />
                            <input className='border-black border rounded-[5px]' defaultValue="EduCRM$007Boss" type="text" name="" id="" {...register("login")} />
                        </label>
                        <br />
                        <br />
                        <label>
                            <span className='text-red-600 '>{isLogin && "Create "}Parol kiriting</span>
                            <br />
                            <input type="text" name="" id="" defaultValue="+998901234567" className='border-black border rounded-[5px]' {...register("password")} />
                        </label>

                        <button className='mx-auto mt-10 text-[17px] cursor-pointer w-[60%] bg-[#F48221] text-[#FFFFFF] flex gap-2  py-[11px] rounded-[15px] justify-center'>Kirish</button>
                    </form>
                    {/* <button className='border mt-3' onClick={() => setIsLogin(prev => !prev)}>create new User</button> */}
                </div>
            </div>



        </div>
    );
}

export default SignIn;
