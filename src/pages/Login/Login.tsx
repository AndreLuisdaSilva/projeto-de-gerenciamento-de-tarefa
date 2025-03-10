import { FormEvent, useState } from 'react';
import logo from '../../assets/Icon.png';
import { BsArrowLeft } from "react-icons/bs";
import InputBox from '../../components/Input.tsx';
import { useAuth } from '../../hooks/UseAuth.tsx';
import Button from "../../components/Button.tsx";
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isAuthenticated } = useAuth();

    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        console.log("Tentando fazer login com:", email, password);
        setError('');
        try {
            const errorMessage = await login(email, password);
            if (errorMessage) {
                throw new Error(errorMessage);
            }
            toast.success("Login bem-sucedido!");
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            console.error("Erro ao efetuar o login:", error);
            setError("Erro ao efetuar o login. Verifique suas credenciais.");
            if (error instanceof Error && error.message.includes('Network Error')) {
                toast.error("Erro de conexão. Verifique sua rede.");
            } else {
                toast.error("Erro ao efetuar o login. Verifique suas credenciais.");
            }
        }
    }

    const handleNavigateRegister = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        navigate("/register");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
            {isAuthenticated && <Navigate to='/home' />}
            <div className="relative w-[544px] h-[522px] max-lg:w-96 max-w-[544px] bg-[#FCFCFC] rounded-3xl">
                <button onClick={() => navigate('/')} className=" absolute ml-6 mt-6 text-black text-3xl cursor-pointer"><BsArrowLeft /></button>
                <div className="flex flex-col items-center w-full gap-6 pt-10 pb-[12px] flex-grow">
                    <div className='h-24 flex flex-col items-center justify-center'>
                        <img src={logo} className="h-12 w-auto" />
                        <h1 className="text-[2rem] font-medium">Acesse sua conta</h1>
                    </div>
                    <form onSubmit={handleLogin} className="flex flex-col w-[25rem] gap-[0.875rem] flex-grow">
                        <InputBox onChange={e => setEmail(e.target.value)} type='email'>Email</InputBox>
                        <InputBox onChange={e => setPassword(e.target.value)} type='password'>Senha</InputBox>
                        <Button type='submit' style='max-lg:w-80 max-lg:ml-10 md:mr-8 bg-black text-white font-medium text-[1.375rem] w-full h-16 cursor-pointer'>Entrar</Button>
                    </form>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div className="flex flex-col items-center w-full mt-auto">
                        <div className='flex flex-row gap-1 p-[2px]'>
                            <p className="text-base font-normal flex text-[#666666]">Ainda não tem conta ?</p>
                            <p onClick={handleNavigateRegister} className="text-base text-[#100F14] flex font-semibold underline cursor-pointer">Inscrever-se</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
