function CategoryCard({ title, image, selected, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div
        className={`bg-amber-500 p-3 rounded-lg ${selected ? "ring-4 ring-[#00b7ff]" : ""}`}
      >
        {image ? (
          <img src={image} alt={title} className="h-16 w-16 object-cover" />
        ) : (
          <div className="h-16 w-16" />
        )}
      </div>
      <h2 className="text-base text-gray-800 mt-2 text-center">{title}</h2>
    </div>
  );
}

export default CategoryCard;
