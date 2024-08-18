import Categories from "@/containers/CategoryDetail/Categories";
import Products from "@/containers/CategoryDetail/Products";
import React from "react";

const CategoryPage = ({ searchParams }: { searchParams: { categoryId: string | undefined } }) => {
    const categoryId = searchParams?.categoryId;
    if (categoryId)
        return (
            <div className='md:container h-screen'>
                <div className="p-2">
                    <Categories categoryId={categoryId} />
                </div>
                <div className="bg-grey p-2">
                    <Products categoryId={categoryId} />
                </div>
            </div>
        )
    return <></>
}

export default CategoryPage;