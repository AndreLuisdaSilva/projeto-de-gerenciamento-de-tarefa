import { useNavigate,useLocation  } from "react-router-dom";
import '../App.css'


export default function UsersContainer(){
    const navigate = useNavigate();
    const location = useLocation(); 
    const handleNavigateCollection = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        navigate("/collection");
    }

    const handleNavigateWallet = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        navigate("/my-wallet");
    }

    return(
        <div className="flex flex-wrap md:flex-row items-center justify-center md:justify-end gap-10 mr-10">
            <div className="flex gap-10">
                <h4 onClick={handleNavigateCollection} className={`text-white cursor-pointer ${location.pathname === "/collection" ? "font-extrabold" : "font-medium"} hover:scale-110`}>Meus discos</h4>
                <h4 onClick={handleNavigateWallet} className={`font-medium hover:scale-110 cursor-pointer ${location.pathname === "/collection" ? "text-[#FCFCFC]" : "text-white"}`}>Carteira</h4>
            </div>
        </div>
    )
}