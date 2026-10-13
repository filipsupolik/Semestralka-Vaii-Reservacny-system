function MenuItemListItem({ item, selected, onSelect }) {
  return (
    <div
      className={`cursor-pointer rounded-[8px] border-b-2 border-[#b8b8b8] px-[10px] py-[15px] transition-colors last:border-b-0 ${selected ? "border-2 border-[#00b7ff] bg-[#e8f7ff]" : "hover:bg-gray-50"}`}
      onClick={() => onSelect(selected ? null : item)}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center">
        <h4>{item.name}</h4>
        <span className="font-bold text-red-500">€{item.price}</span>
      </div>
      <p className="text-[#615f5f]">{item.description}</p>
      {item.category && (
        <span className="text-sm text-gray-500">{item.category.name}</span>
      )}
    </div>
  );
}

export default MenuItemListItem;
