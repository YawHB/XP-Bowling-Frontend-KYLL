import SuccessToaster from '../../components/toasters/SuccesToaster';
import FailToaster from '../../components/toasters/ErrorToaster';

interface Consumable {
    title: string;
    price: number;
}

export const postNewConsumable = async (newProduct: Consumable) => {
    try {
        const response = await fetch('http://localhost:8080/consumables', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
            FailToaster({ messageString: 'Der skete en fejl ved bestillingen' });
            return;
        }
        const data = await response.json();
        SuccessToaster({ messageString: 'Nyt produkt oprettet i baren🍻' });

        return data;
    } catch (error) {
        console.error('Error:', error, 'Failed to post new consumable');
    }
};
