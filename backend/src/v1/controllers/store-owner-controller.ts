import { Request, Response } from "express";
import { client } from "../../index";
import bcrypt from "bcryptjs";

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user?.userId;

        if (!currentPassword || !newPassword || !userId) {
            return res.status(400).json({
                message: "Current password, new password, and user ID are required"
            });
        }

        // Get user details
        const user = await client.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await client.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword }
        });

        res.status(200).json({
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getDashboard = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "User ID not found"
            });
        }

        // Get stores owned by the store owner
        const stores = await client.store.findMany({
            where: { ownerId: userId },
            include: {
                ratings: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                createdAt: true
                            }
                        }
                    }
                }
            }
        });

        if (stores.length === 0) {
            return res.status(404).json({
                message: "No stores found for this store owner"
            });
        }

        // Calculate average ratings for each store
        const storesWithStats = stores.map(store => {
            const totalRatings = store.ratings.length;
            const averageRating = totalRatings > 0 
                ? store.ratings.reduce((sum: number, rating: any) => sum + rating.rating, 0) / totalRatings 
                : 0;

            return {
                storeId: store.id,
                storeName: store.name,
                storeDescription: store.description,
                totalRatings,
                averageRating: Math.round(averageRating * 100) / 100, 
                ratings: store.ratings.map((rating: any) => ({
                    id: rating.id,
                    rating: rating.rating,
                    comment: rating.comment,
                    createdAt: rating.createdAt,
                    user: rating.user
                }))
            };
        });

        res.status(200).json({
            message: "Dashboard data retrieved successfully",
            stores: storesWithStats
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getStoreRatings = async (req: Request, res: Response) => {
    try {
        const { storeId } = req.params;
        const userId = req.user?.userId;

        if (!storeId || !userId) {
            return res.status(400).json({
                message: "Store ID and user ID are required"
            });
        }

        // Verify the store belongs to the store owner
        const store = await client.store.findFirst({
            where: {
                id: storeId,
                ownerId: userId
            }
        });

        if (!store) {
            return res.status(404).json({
                message: "Store not found or you don't have access to it"
            });
        }

        const ratings = await client.ratings.findMany({
            where: { storeId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Calculate average rating
        const totalRatings = ratings.length;
        const averageRating = totalRatings > 0 
            ? ratings.reduce((sum: number, rating: any) => sum + rating.rating, 0) / totalRatings 
            : 0;

        res.status(200).json({
            message: "Store ratings retrieved successfully",
            store: {
                id: store.id,
                name: store.name,
                description: store.description
            },
            totalRatings,
            averageRating: Math.round(averageRating * 100) / 100,
            ratings: ratings.map((rating: any) => ({
                id: rating.id,
                rating: rating.rating,
                comment: rating.comment,
                createdAt: rating.createdAt,
                user: rating.user
            }))
        });
    } catch (error) {
        console.error('Get store ratings error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};


