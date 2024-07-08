import ProductModel from "../models/ProductModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// Content-Based Filtering Function
const getRecommendationsContentBased = async (userId, limit) => {
    try {
        // Fetch user's last order
        const lastOrder = await orderModel.findOne({ userId }).sort({ date: -1 });

        if (!lastOrder || !lastOrder.items || lastOrder.items.length === 0) {
            console.log('No previous orders found for user:', userId);
            return [];
        }

        // Extract relevant features (e.g., categories)
        const lastOrderItems = lastOrder.items;
        const categories = lastOrderItems.map(item => item.category);

        // Find products with similar categories
        const recommendedProducts = await ProductModel.find({ category: { $in: categories } })
                                                      .limit(limit)
                                                      .sort({ rating: -1 }); // Adjust sorting criteria

        return recommendedProducts;
    } catch (error) {
        console.error('Error in content-based filtering:', error);
        return [];
    }
};

// Collaborative Filtering Function
const getRecommendationsCollaborative = async (userId, limit) => {
    try {
        // Fetch user's last order
        const lastOrder = await orderModel.findOne({ userId }).sort({ date: -1 });

        if (!lastOrder || !lastOrder.items || lastOrder.items.length === 0) {
            console.log('No previous orders found for user:', userId);
            return [];
        }

        const lastOrderItems = lastOrder.items;

        // Find users with similar purchase histories (example: users who bought similar products)
        const similarUsers = await userModel.find({ _id: { $ne: userId }, 'orders.items': { $elemMatch: { $in: lastOrderItems } } })
                                            .limit(limit)
                                            .sort({ ordersCount: -1 }); // Adjust sorting based on relevance

        // Aggregate and recommend items from similar users
        const recommendedProducts = await ProductModel.find({ userId: { $in: similarUsers.map(user => user._id) } })
                                                      .limit(limit)
                                                      .sort({ rating: -1 }); // Adjust sorting criteria

        return recommendedProducts;
    } catch (error) {
        console.error('Error in collaborative filtering:', error);
        return [];
    }
};

// Hybrid Filtering Function
const getRecommendationsHybrid = async (userId, limit) => {
    try {
        // Get recommendations from content-based filtering
        const contentBasedRecommendations = await getRecommendationsContentBased(userId, limit);

        // Get recommendations from collaborative filtering
        const collaborativeRecommendations = await getRecommendationsCollaborative(userId, limit);

        // Combine and prioritize recommendations (example: alternate between content-based and collaborative results)
        let hybridRecommendations = [];
        for (let i = 0; i < limit; i++) {
            hybridRecommendations.push(contentBasedRecommendations[i]);
            hybridRecommendations.push(collaborativeRecommendations[i]);
        }

        return hybridRecommendations.slice(0, limit);
    } catch (error) {
        console.error('Error in hybrid filtering:', error);
        return [];
    }
};





const getRecommendations = async (req, res) => {
    const userId = req.params.userId; // Extract userId from request
    const limit = 5; // Default limit for recommendations

    try {
        // Fetch user order history
        const orders = await orderModel.find({ userId });
        const lastOrder = orders[orders.length - 1]; // Get the last order

        // Example: Content-based recommendations
        const contentBasedRecommendations = await getRecommendationsContentBased(userId, limit);

        // Example: Collaborative filtering recommendations
        const collaborativeRecommendations = await getRecommendationsCollaborative(userId, limit);

        // Example: Hybrid recommendations
        const hybridRecommendations = await getRecommendationsHybrid(userId, limit);

        res.json({
            success: true,
            recommendations: {
                contentBased: contentBasedRecommendations,
                collaborative: collaborativeRecommendations,
                hybrid: hybridRecommendations
            }
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.json({ success: false, message: "Error fetching recommendations" });
    }
};


export {getRecommendations};




