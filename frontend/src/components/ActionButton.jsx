const VARIANTS = {
  primary: "bg-[#00b7ff] hover:bg-[#0095d6]",
  danger: "bg-red-500 hover:bg-red-600",
};

const SIZES = {
  sm: "px-4 py-1 text-sm font-bold",
  compact: "px-[15px] py-[5px] text-base font-extrabold",
  md: "px-[15px] py-[10px] text-base font-extrabold",
};

function ActionButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      className={`cursor-pointer rounded-full border-0 text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ActionButton;
