import React from "react";

interface Props{
    children: React.ReactNode; 
    className?: string;
}

export default function Title({ children, className}: Props){
    return (
        <div className={
            className
            ? className
            :"welcome_text text-3xl mt-32 md:text-4xl lg:text-7xl mb-4 md:mb-6 font-bold"}
            >
            <h1>
                { children }
            </h1>
        </div>
    )

}