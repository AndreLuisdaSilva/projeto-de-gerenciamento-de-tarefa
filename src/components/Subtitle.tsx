interface Props{
    children: string;
    className?: string;
}

export default function Subtitle({ children, className }: Props){
    return (
        <div className={className
            ? className
            :"subtitle_text text-base md:text-2xl mb-6 md:mb-6  text-cyan-600 font-bold w-[40rem] h-[4.5rem]"}
        >
            <p>
                { children }
            </p>
        </div>
    )
}