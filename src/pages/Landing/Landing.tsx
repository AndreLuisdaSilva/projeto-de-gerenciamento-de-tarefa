import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header.tsx';
import Title from '../../components/Title.tsx';
import Subtitle from '../../components/Subtitle.tsx';
import Button from '../../components/Button.tsx';
import backgroundImage from '../../assets/backgound.jpeg'; 

export default function LandingPage() {
    const navigate = useNavigate();

    const handleNavigateRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/register");
    }

    return (
        <main
            className="w-full h-screen"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Header />
            <section className="flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 xl:px-32 text-blue-800 mt-10 md:mt-12">
                <Title>A história das suas tarefas <br /> não pode ser <br /> esquecida!</Title>
                <Subtitle>Crie sua conta e organize suas tarefas de forma simples e eficiente, com um sistema que acompanha seu progresso!</Subtitle>
                <Button style="bg-cyan-400 text-black w-48 h-10 mt-6 cursor-pointer" handleNavigate={handleNavigateRegister}>Inscrever-se</Button>
            </section>
        </main>
    );
}