import '/home/user/desafiofullstack/src/App.css'
interface Props {
    children: React.ReactNode;
    style?: string;
    handleNavigate?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: "submit" | "reset" | "button"; // Especificar os tipos permitidos
}

export default function Button({ children, type = "button", style, handleNavigate, disabled }: Props) {
    return (
        <button className={`${style} rounded-[2rem] px-0  py-0 font-bold transition-transform duration-100 transform hover:scale-110`} onClick={handleNavigate} type={ type } disabled = { disabled }>
            {children}
        </button>
    );
}
