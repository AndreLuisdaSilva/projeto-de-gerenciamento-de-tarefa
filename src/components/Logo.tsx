import LogoImage from '/home/user/desafiofullstack/src/assets/Icon.png'

export default function Logo(){
    return(
        <div className="flex items-center gap-2">
            <img className='w-12 h-12' src={LogoImage} alt="logo" />
            <h3 className='text-lg bg-gradient-to-l to-pink-500 text-transparent via-purple-500 from-blue-00 bg-clip-text font-bold'>Task<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Flow</span></h3>
        </div>
    )
}