import StockOrder from "./stockOrder";

export default function StockPage() {
    return (
        <div className="flex w-screen">
        <div className=" mx-auto px-4 py-8">
            <h1 className="text-4xl self-center font-bold text-pink-300">Lager</h1>
        </div>
        <div>
            <StockOrder />
        </div>
        </div>
    );
    }