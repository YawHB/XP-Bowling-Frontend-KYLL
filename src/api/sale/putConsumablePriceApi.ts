import { Consumable } from '../../components/sale/BarSale';

export const putConsumablePrice = async (id: number, newPrice: number) => {
    try {
        const response = await fetch(`http://localhost:8080/consumables/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price: newPrice }),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
            return;
        }
        const updatedConsumable: Consumable = await response.json();
        console.log('Updated consumable:', updatedConsumable);
        return updatedConsumable;
    } catch (error) {
        console.error('Error:', error, 'Failed to update consumable price');
    }
};
