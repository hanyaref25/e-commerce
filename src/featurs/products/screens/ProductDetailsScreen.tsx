import { notFound } from "next/navigation";
import getspecificProduct from "../services/getspecificProduct";
import ProductInfo from "../components/productDetails/ProductInfo";
import ProductTabs from "../components/productDetails/ProductTabs";
import SimilarProducts from "../components/productDetails/SimilarProducts";

export default async function ProductDetailsScreen({ id }: { id: string }) {
  try {
    const productResponse = await getspecificProduct(id);
    const product = productResponse?.data;

    if (!product) {
      notFound();
    }

    return (
      <div className="bg-gray-50/40 min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Product Info & Gallery */}
          <ProductInfo product={product} />

          {/* Product Specifications & Reviews Tabs */}
          <ProductTabs product={product} />

          {/* You May Also Like / Similar Products */}
          <SimilarProducts currentProduct={product} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    notFound();
  }
}
