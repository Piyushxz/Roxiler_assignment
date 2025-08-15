export const Navbar=()=>{
    return(
        <header className="w-screen   border-b border-white/15 bg-black" >
            <div className="flex justify-between items-center w-[80%] mx-auto py-4 ">
                <h1 style={{fontFamily:'Satoshi'}} className="text-3xl font-satoshi font-extrabold tracking-tigher text-white">
                    ratifyAI

                </h1>
                <div className="flex items-center gap-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-satoshi">
                            <h1>Logout</h1>
                        </button>
                </div>
            </div>
        </header>
    )
}