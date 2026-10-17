import {
  ShoppingCard,
  MenuItemCard,
  MenuPageNavigation,
} from "../components/index";
import { useParams } from "react-router-dom";
import { useCart } from "../context";
import { useMenuItems, useMenuCategories } from "../hooks";
import { getImageUrl } from "../services/api";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

function MenuPage() {
  const { id } = useParams();
  const { addToCart, getCart } = useCart();
  const {
    menuItems,
    isLoading: menuLoading,
    error: menuError,
  } = useMenuItems(id, false);
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useMenuCategories(id, false);
  const cart = getCart(id);
  const loadError = menuError || categoriesError;

  const handleAddToCart = (item) => {
    addToCart(id, item);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 pb-20 lg:pb-0">
        {/* Menu Section */}
        <section className="w-full lg:w-3/4 py-8 sm:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Menu</h2>
            {loadError && (
              <div className="text-center text-red-500 mb-4">{loadError}</div>
            )}
            {categoriesLoading || menuLoading ? (
              <div className="text-center text-gray-600">Loading menu...</div>
            ) : (
              <>
                <MenuPageNavigation menuCategories={categories} />

                {categories.map((category) => (
                  <div
                    key={category.categoryId}
                    id={category.categoryId}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {menuItems
                        .filter(
                          (item) => item.categoryId === category.categoryId,
                        )
                        .map((item) => (
                          <MenuItemCard
                            key={item.menuItemId}
                            menuItemId={item.menuItemId}
                            image={
                              getImageUrl(item.imageUrl) ?? PLACEHOLDER_IMAGE
                            }
                            name={item.name}
                            description={item.description}
                            ingredients={item.ingredients || []}
                            price={item.price}
                            onAddToCart={handleAddToCart}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>
        {/* Shopping Cart Section */}
        <ShoppingCard cart={cart} restaurantId={id} />
      </div>
    </div>
  );
}

export default MenuPage;
