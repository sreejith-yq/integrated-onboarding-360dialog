
interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  outlined?: boolean
}

const Button = ({children, outlined, ...rest}: IButton) => {
  return(
    <button {...rest} className={`block rounded-md text-blue-600 text-sm font-base px-3 py-1 outline-none hover:text-blue-800 focus:ring-gray-600 disabled:cursor-not-allowed disabled:text-gray-300 flex flex-row items-center gap-2 font-base ${outlined && "border border-1 border-blue-600 hover:border-blue-800 bg-gray-50"}`}>
        {children}
    </button>
  );
};

export default Button