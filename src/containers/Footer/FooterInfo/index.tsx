'use client'
import { StoreConfig } from "@/models";
import { usePathname } from "next/navigation";

const FooterInfo = (storeInfo: StoreConfig) => {
    const pathname = usePathname();
    return (
        (pathname === '/') && 
        <div className="mx-auto w-full">
            <div className="rounded-mdp-2 shadow-md md:p-4">
                <h2 className="mb-2 text-sm font-bold">{storeInfo?.name}</h2>
                <p className="mb-2 text-sm">Địa chỉ: {storeInfo?.address}</p>
                <p className="mb-2 text-sm">
                    Điện thoại:{' '}
                    <a href={`tel:${storeInfo?.phoneNumber}`} className="text-blue-400">
                        {storeInfo?.phoneNumber}
                    </a>
                </p>
                <p className="mb-2 text-sm">Mã số thuế: {storeInfo?.vat}</p>
            </div>
        </div>
    )
}
export default FooterInfo;