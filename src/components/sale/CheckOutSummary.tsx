interface CheckoutSummaryProps {
    items: { id: number; title: string; amount: number }[];
}

export const CheckoutSummary = ({ items }: CheckoutSummaryProps) => (
    <div>
        <h2>Valgte varer:</h2>
        {items.map((item) => (
            <p key={item.id}>
                {item.title}: {item.amount} stk
            </p>
        ))}
    </div>
);