'use client'
import Link from "next/link";
import styles from './index.module.css';
import { usePathname } from "next/navigation";

const MenuSelection = ({ href, title, id }: { href: string, title: string, id: number }) => {
    const handleOnClick = (id: number) => {
        const element = document.getElementById(String(id));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const pathname = usePathname();
    return (
        (pathname==='/') && <Link
            href={`#`}
            className={`items-center ml-2 mt-2 rounded-md ${styles.linkItem}`}
            onClick={() => handleOnClick(id)}
        >
            <span className="inline-block px-2 py-1 text-center text-[--text-light-color]">
                {title}
            </span>
        </Link>
    )
}

export default MenuSelection;