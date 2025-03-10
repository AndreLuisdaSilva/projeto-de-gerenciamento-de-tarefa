import Button from "../../components/Button.tsx";
import InputBox from '../../components/Input.tsx';
import logo from '../../assets/Icon.png';
import { useNavigate } from "react-router-dom";
import { FormEvent, useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { BsArrowLeft } from "react-icons/bs";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessageHtml, setErrorMessageHtml] = useState<string | null>(null); // Novo estado

    const handleNavigateLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/login");
    }

    async function handleRegister(event: FormEvent) {
        setLoading(true);
        setErrorMessageHtml(null)
        const toastId = toast.loading("Criando conta...");
        event.preventDefault();

        const errorMessage = await register(name, email, password);

        toast.dismiss(toastId);
        if (errorMessage) {
                setErrorMessageHtml(errorMessage); 
        
            setLoading(false);
        } else {
            toast.success("Conta criada com sucesso");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            navigate('/');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
            <div className="relative w-[544px] max-w-[544px] max-lg:w-96 bg-[#FCFCFC] rounded-3xl">
                <button onClick={() => navigate('/')} className="absolute ml-6 mt-6 text-black text-3xl cursor-pointer"><BsArrowLeft /></button>
                <div className="flex flex-col items-center w-full gap-6 pt-10 pb-[12px]">
                    <img src={logo} className="h-12" />
                    <h1 className="text-[2rem] font-medium">Crie sua conta</h1>
                    <form onSubmit={handleRegister} className="flex flex-col w-[25rem] gap-[0.875rem]">
                        <InputBox onChange={e => setName(e.target.value)} type='text'>Nome Completo</InputBox>
                        <InputBox onChange={e => setEmail(e.target.value)} type='email'>Email</InputBox>
                        <InputBox onChange={e => setPassword(e.target.value)} type='password'>Senha</InputBox>
                          {errorMessageHtml && ( 
                                <div className="text-red-500 text-sm">{errorMessageHtml}</div>
                            )}
                        <Button type='submit' disabled={loading} style='max-lg:w-80 max-lg:ml-10 md:mr-8 bg-black text-white font-medium text-[1.375rem] w-full h-16 cursor-pointer'>
                            {loading ? "Carregando..." : "Criar conta"}
                        </Button>
                    </form>
                    <div className='flex flex-row gap-1 p-[2px]'>
                        <p className="text-base font-normal flex text-[#666666]">Já tem conta ? </p>
                        <button onClick={handleNavigateLogin} className="text-base text-[#100F14] flex font-semibold underline cursor-pointer">Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
