import { useLocation } from 'react-router-dom';
import Logo from "./Logo";
import '../App.css'
import '../index.css'
import ButtonContainer from "./ButtonContainer.tsx";
import UsersContainer from "./UserContainer.tsx";

export default function Header(){

    const background = {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(50px)',
        boxshadow: '0px 14px 24px 0px rgba(0, 0, 0, 0.01)'
    }

    const location = useLocation();
    const { pathname } = location;

    const renderContainer = () => {
        if (pathname === '/') {
            return <ButtonContainer />;
        } else {
            return <UsersContainer />;
        }
    };

    

    return (
        <header style={background} className='flex h-[4.6875rem] md:h-[4.6875rem] lg:h-[4.6875rem]'>
            <div className="header_content flex justify-between items-center w-full md:px-8 lg:px-[6.25rem] sm:px-8 max-sm:px-4">
                <Logo />
                {renderContainer()}
            </div>
        </header>
    )
}