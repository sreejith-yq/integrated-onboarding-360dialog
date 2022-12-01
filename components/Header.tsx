import Image from "next/image";

const Header = () => {

    return (
      <div className="flex flex-row gap-4 items-center pt-6 px-8 grow-0">
        <Image
          src="/logo-sidebar-open.svg"
          alt="360dialog logo"
          width={80}
          height={40}
        />
        <h1 className="text-xl font-bold text-gray-300 mb-1">Explore Integrated Onboarding</h1>
      </div>
    );
}

export default Header