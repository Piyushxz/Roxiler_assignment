import { useState } from "react"
import { X } from "lucide-react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

interface AddUserModalProps {
    isOpen: boolean
    onClose: () => void
    onUserAdded: () => void
}

export const AddUserModal = ({ isOpen, onClose, onUserAdded }: AddUserModalProps) => {
    const { token } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'NORMAL_USER',
        address: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const roles = ['NORMAL_USER', 'SYSTEM_ADMIN', 'STORE_OWNER']

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/create-user`, formData, {
                headers: {
                    authorization: token
                }
            })

            if (response.status === 201) {
                onUserAdded()
                onClose()
                setFormData({
                    email: '',
                    password: '',
                    name: '',
                    role: 'NORMAL_USER',
                    address: ''
                })
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create user')
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if (!isOpen) return null

    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center z-50">
            <div className="w-[500px] bg-black border border-white/15 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-satoshi font-bold tracking-tighter">
                        Add New User
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-colors duration-200"
                    >
                        <X className="size-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white border border-black/15 rounded-md p-3 text-black font-satoshi"
                            placeholder="Enter user name"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white border border-black/15 rounded-md p-3 text-black font-satoshi"
                            placeholder="Enter user email"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Password *
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white border border-black/15 rounded-md p-3 text-black font-satoshi"
                            placeholder="Enter password"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Role *
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white border border-black/15 rounded-md p-3 text-black font-satoshi"
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-black/15 rounded-md p-3 text-black font-satoshi"
                            placeholder="Enter user address (optional)"
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm font-satoshi">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-md font-satoshi font-semibold tracking-tighter hover:bg-gray-700 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-white text-black px-4 py-3 rounded-md font-satoshi font-semibold tracking-tighter hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}