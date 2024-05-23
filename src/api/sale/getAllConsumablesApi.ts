import { Consumable } from '../../components/sale/BarSale';

export const getAllConsumables = async () => {
    try {
        const response = await fetch('http://localhost:8080/consumables');
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
            return;
        }
        const consumables: Consumable[] = await response.json();
        console.log('Consumables:', consumables);
        return consumables;
    } catch (error) {
        console.error('Error:', error, 'Failed to fetch consumables');
    }
};
