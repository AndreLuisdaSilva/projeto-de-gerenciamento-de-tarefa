import React from 'react'
import Button from './Button.tsx'
import { useNavigate } from 'react-router-dom';
import '/home/user/desafiofullstack/src/App.css'
export default function ButtonContainer() {
    const navigate = useNavigate();

    const handleNavigateRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/register");
    }

    const handleNavigateLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/login");
    }

    return (
        <div className="flex flex-row items-center justify-center max-sm:gap-2 md:justify-end gap-12">
            <Button style='bg-black text-white w-48 h-10 max-sm:w-36 cursor-pointer' handleNavigate={handleNavigateLogin}>Entrar</Button>
            <Button style='bg-cyan-400 w-48 h-10 max-sm:w-36 cursor-pointer' handleNavigate={handleNavigateRegister}>Inscrever-se</Button>
        </div>
    );
}