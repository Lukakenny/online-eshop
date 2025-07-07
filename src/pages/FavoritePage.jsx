import { useSelector } from "react-redux";
import CardComponent from "../components/cardComponent";

function FavoritePage() {
  const { allFavorite } = useSelector((state) => state.favoriteStore);
  return (
    <div className="container mx-auto w-[90%] mt-[50px] flex items-center gap-[20px] ">
      {allFavorite.map((favoriteItem) => {
        return <CardComponent key={favoriteItem.id} product={favoriteItem} />;
      })}
    </div>
  );
}

export default FavoritePage;
