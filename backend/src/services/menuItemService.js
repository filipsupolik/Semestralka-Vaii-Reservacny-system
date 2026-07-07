const prisma = require("../../prisma/prismaClient/prismaClient")

const createMenuItem = async (restaurantId, menuItemData) => {
    return prisma.menuItem.create({
        data: {
            ...menuItemData,
            restaurantId
        }
    });
};

const getMenuItemByRestaurantId = async (restaurantId) => {
    return prisma.menuItem.findMany({
        where: {restaurantId},
    });
};

const updateMenuItem = async (restaurantId, menuItemId, updateMenuItemData) => {
    
}