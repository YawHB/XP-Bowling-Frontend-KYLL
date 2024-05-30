interface CheckoutSummaryProps {
    items: { id: number; title: string; amount: number; price: number }[];
}

export const CheckoutSummary = ({ items }: CheckoutSummaryProps) => {
    const totalPrice = items.reduce((acc, item) => acc + item.amount * item.price, 0);
    return (
        <div>
            <h2>Valgte varer:</h2>
            {items.map((item) => (
                <p key={item.id}>
                    {item.title}: {item.amount} stk
                </p>
            ))}
            -------------------------
            {items.length > 0 && <h3 className="h-3">Totalpris: {totalPrice},00 kr</h3>}
        </div>
    );
};
