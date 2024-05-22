import { Consumable } from '../../components/sale/BarSale';

export const postCheckoutItems = async (checkoutItems: Consumable[]) => {
    console.log('checkoutItems:', checkoutItems);
    //Creates a new object with only the id and quantity properties from the consumables, so it matches the server's expected format
    const filteredProps = checkoutItems.reduce((acc, { id, amount }) => ({ ...acc, [id]: amount }), {});
    console.log('filteredProps:', JSON.stringify(filteredProps, null, 2));

    try {
        const response = await fetch('http://localhost:8080/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filteredProps),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error, 'Failed to post checkout items');
    }
};
