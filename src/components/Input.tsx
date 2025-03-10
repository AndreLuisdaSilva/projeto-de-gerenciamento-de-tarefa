import React from "react";

interface Props{
    children : React.ReactNode,
    type: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputBox({ children, type, onChange }: Props){
    return(
        <div className="input_box flex flex-col gap-1 max-lg:flex-col max-lg:items-center">
            <label htmlFor={type} className="font-normal text-G600 max-lg:w-80">{children}</label>
            <input type={type} onChange={onChange} className="p-2 rounded-xl ring-1 ring-customwhite h-14 max-lg:w-80"/>
        </div>
    )
}