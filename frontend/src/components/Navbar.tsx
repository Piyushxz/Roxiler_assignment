import { LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export const Navbar=()=>{
    const {logout} = useAuth()
    return(
        <header className="w-screen   border-b border-white/15 bg-black" >
            <div className="flex justify-between items-center w-[80%] mx-auto py-4 ">
                <h1 style={{fontFamily:'Satoshi'}} className="text-3xl font-satoshi font-extrabold tracking-tigher text-white">
                    ratifyAI

                </h1>
                <div className="flex items-center gap-4">
                        <button onClick={logout} className="bg-white text-black px-4 py-2 rounded-md font-satoshi flex items-center gap-2">
                            <LogOut className="size-4" />
                            <h1>Logout</h1>
                        </button>
                </div>
            </div>
        </header>
    )
}