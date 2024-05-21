import StockOrder from "./StockOrders";
import StockOrderOverview from "./StockOrderOverview";

export default function StockOrderPage() {
  return (
    <div className="flex w-screen">
      <div className=" mx-auto px-4 py-8">
        <h1 className="text-4xl self-center font-bold text-pink-300">Se Bestillinger</h1>

        <div className="flex ">
          <div>
            <StockOrderOverview />
          </div>
          <div>
            <StockOrder />
          </div>
        </div>
      </div>
    </div>
  );
}
