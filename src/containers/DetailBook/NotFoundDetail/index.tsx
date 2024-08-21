import React from "react";
import NotFound404 from "@/assets/images/not-found.png";
import Image from "next/image";
const NotFoundDetail = () => {
    return (
        <div className="container py-2">
            <Image src={NotFound404} alt="404" width={1000} height={1000} className="mx-auto" />
        </div>
    );
}

export default NotFoundDetail;