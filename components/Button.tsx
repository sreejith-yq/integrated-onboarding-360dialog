
interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

const Button = ({children, ...rest}: IButton) => {
  return(
    <button {...rest} className="block rounded-md text-white text-blue-600 text-sm font-base px-3 py-1 outline-none hover:text-blue-800 focus:ring-gray-600 disabled:cursor-not-allowed disabled:text-gray-300">
        {children}
    </button>
  );
};

export default Button