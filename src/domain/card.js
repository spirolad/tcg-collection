
export const RARITIES = Object.freeze(['commune', 'peu-commune', 'rare', 'ultra-rare'])
const SETS = Object.freeze(['Set de Base', 'Jungle', 'Fossile'])

export class Card {
    constructor(id, name, set, rarity, price, quantity) {
        this.id = id
        this.name = name
        this.set = set
        this.rarity = rarity
        this.price = price
        this.quantity = quantity
    }
}

export const SAMPLE_CARDS = Object.freeze([
    new Card(1, 'Dracaufeu', 'Set de Base', 'ultra-rare', 48.9, 1),
    new Card(2, 'Tortank', 'Set de Base', 'rare', 12.5, 2),
    new Card(3, 'Pikachu', 'Set de Base', 'commune', 0.3, 4),
    new Card(4, 'Ronflex', 'Jungle', 'ultra-rare', 35.0, 1),
    new Card(5, 'Pyroli', 'Jungle', 'rare', 18.75, 1),
    new Card(6, 'Persian', 'Jungle', 'peu-commune', 1.2, 3),
    new Card(7, 'Ptéra', 'Fossile', 'rare', 9.9, 0),
    new Card(8, 'Amonistar', 'Fossile', 'peu-commune', 0.8, 2),
])

export function parseRarity(value) { // la rareté si value en est une, sinon undefined
    return RARITIES.includes(value) ? value : undefined
}
export function isRare(card) { // vrai pour "rare" et "ultra-rare"
    return card.rarity === 'rare' || card.rarity === 'ultra-rare'
}
export function formatPrice(price) { // 48.9 → "48,90 €"
    return new Intl.NumberFormat("fr-FR", { style: "currency",
        currency: "EUR" }).format(price);
}
export function copyCount(cards) { // somme des quantités
    return cards.reduce((total, card) => total + card.quantity, 0)
}
export function collectionValue(cards) { // somme de prix × quantité
    return cards.reduce((total, card) => total + card.price * card.quantity, 0)
}