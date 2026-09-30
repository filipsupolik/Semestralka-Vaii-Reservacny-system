import {
  ShoppingCard,
  MenuItemCard,
  MenuPageNavigation,
} from "../components/index";
import { useParams } from "react-router-dom";
import { useCart } from "../context";
import { useMenuItems, useMenuCategories } from "../hooks";

function MenuPage() {
  const { id } = useParams();
  const { addToCart, getCart } = useCart();
  const { menuItems, isLoading: menuLoading } = useMenuItems(id, true);
  const { categories, isLoading: categoriesLoading } = useMenuCategories(
    id,
    true,
  );
  const cart = getCart(id);

  const handleAddToCart = (item) => {
    addToCart(id, item);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-row gap-4">
        {/* Menu Section */}
        <section className="w-3/4 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Menu</h2>
            {categoriesLoading ? (
              <div className="text-center text-gray-600">Loading menu...</div>
            ) : (
              <>
                <MenuPageNavigation menuCategories={categories} />

                {categories.map((category) => (
                  <div key={category.id} id={category.id} className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {menuItems
                        .filter((item) => item.category === category.name)
                        .map((item) => (
                          <MenuItemCard
                            key={item.id}
                            image={item.image}
                            name={item.name}
                            description={item.description}
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
        <ShoppingCard cart={cart} />
      </div>
    </div>
  );
}

export default MenuPage;
