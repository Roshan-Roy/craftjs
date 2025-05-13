import { Link } from "@nextui-org/react";

const Navbar = async ({
    link,
    linkName,
    heading,
    btn,
    name,
    total,
    count
}: {
    link: string;
    linkName: string;
    heading: string;
    btn: React.ReactNode;
    name: string;
    total: string;
    count: number;
}) => {
    return (
        <>
            <div className="h-16"></div>
            <div className="h-16"></div>
            <div className="flex fixed top-0 items-center justify-center w-full h-16 bg-primary text-white">
                <div className="flex justify-between w-10/12">
                    <Link href={link} className="text-white">{linkName}</Link>
                    <p className="absolute font-semibold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{heading}</p>
                    <p className="text-sm">Hi, {name}</p>
                </div>
            </div>
            <div className="fixed flex items-center justify-center top-16 w-full border-b-2 h-16 bg-white">
                <div className="flex justify-between items-center w-9/12">
                    <p>Total {total} : {count}</p>
                    {btn}
                </div>
            </div>
        </>
    )
}

export default Navbar