import { getImageUrl } from "../services/api";

function OwnerRestaurantCard({ restaurant, selected, onSelect }) {
  return (
    <div
      className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selected ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
      onClick={() => onSelect(restaurant.restaurantId)}
      role="button"
      tabIndex={0}
    >
      <h3>{restaurant.name}</h3>
      <p className="mb-[25px] text-[#615f5f]">{restaurant.description}</p>
      <p className="mb-[25px] text-[#615f5f]">{restaurant.address}</p>
      <img
        src={getImageUrl(restaurant.imageUrl) ?? ""}
        alt={restaurant.name}
        className="w-full h-32 sm:h-40 object-cover rounded"
      />
    </div>
  );
}

export default OwnerRestaurantCard;
