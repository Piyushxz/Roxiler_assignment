import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"



export const EditPasswordModal = ({ isOpen, onClose ,mode = 'user'}:any) => {
    const { token } = useAuth()
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match')
            setIsLoading(false)
            return
        }

        try {
            // Determine endpoint based on mode
            const endpoint = mode === 'store-owner' 
                ? `${import.meta.env.VITE_API_URL}/store-owner/update-password`
                : `${import.meta.env.VITE_API_URL}/users/update-password`

            // Use token from useAuth hook

            const response = await axios.put(endpoint, {
                currentPassword: formData.oldPassword,
                newPassword: formData.newPassword
            }, {
                headers: {
                    authorization: token
                }
            })

            if (response.status === 200) {
                setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                })
                onClose()
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update password')
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-black border border-white/15 rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-satoshi font-bold tracking-tighter">
                        Update Password
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
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleInputChange}
                                placeholder="Enter current password"
                                className="w-full bg-white border border-black/15 rounded-md p-2 pr-10 text-black"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600"
                            >
                                {showOldPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                placeholder="Enter new password"
                                className="w-full bg-white border border-black/15 rounded-md p-2 pr-10 text-black"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600"
                            >
                                {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm new password"
                                className="w-full bg-white border border-black/15 rounded-md p-2 pr-10 text-black"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
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
                            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md font-satoshi font-semibold hover:bg-gray-700 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-white text-black px-4 py-2 rounded-md font-satoshi font-semibold hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
