export default function NotFoundPage(){
    return(
        <main className='bg-gray-100 h-screen flex flex-col justify-between'>
            <div className='mx-auto text-center pt-24'>
                <h1 className='text-6xl font-bold text-gray-800 mb-4'>404 - Page not found</h1>
                <p className='text-xl text-gray-600 mb-8'>A pagina que você tentou acessar não existe</p>
            </div>
        </main>  
    )
}