function CategoryCard({ title, image }) {
  return (
    <div>
      <div className="bg-amber-500 p-3 rounded-lg">
        <img src={image} alt={title} />
      </div>
      <h2 className="text-base text-gray-800 mt-2 text-center">{title}</h2>
    </div>
  );
}

export default CategoryCard;
