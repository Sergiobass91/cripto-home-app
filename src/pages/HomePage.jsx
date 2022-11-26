import CoinList from "../components/CoinList";
import FiatList from "../components/FiatList";

const HomePage = () => {
  return (
    <div className="w-full mx-auto max-w-[1000px] px-4">
      <div className="my-3">
        <FiatList />
      </div>
      <CoinList />
    </div>
  );
};

export default HomePage;
