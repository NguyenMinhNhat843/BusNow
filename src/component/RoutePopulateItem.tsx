import demoImage from "../../public/bg_searchbar.jpg";
import Image from "next/image";

export default function RoutePopulateItem() {
  return (
    <div className="w-1/4 shadow-2xl rounded-lg overflow-hidden">
      <div className="cursor-pointer">
        <Image src={demoImage} alt="Demo Image" />
      </div>
      <div className="p-2">
        <p>Sài Gòn - Nha Trang</p>
        <p>120.000 đ</p>
      </div>
    </div>
  );
}
