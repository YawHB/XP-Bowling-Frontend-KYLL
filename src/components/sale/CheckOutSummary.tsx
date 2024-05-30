interface CheckoutSummaryProps {
    items: { id: number; title: string; amount: number; price: number }[];
}

export const CheckoutSummary = ({ items }: CheckoutSummaryProps) => {
    const totalPrice = items.reduce((acc, item) => acc + item.amount * item.price, 0);
    return (
      <div className="my-4 p-4 border-2">
        <h2 className="font-bold">Valgte varer:</h2>
        {items.map((item) => (
          <p key={item.id}>
            {item.title}: {item.amount} stk
          </p>
        ))}
        <div className="my-4"></div>
        <hr />
        <div className="my-4"></div>
        {items.length > 0 && <h3 className="h-3  font-bold">Totalpris: {totalPrice},00 kr</h3>}
      </div>
    );
};
