
export async function fetchCards() {
    return await fetch('http://localhost:3001/cards').then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }
        return response.json();
    });
}