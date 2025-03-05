export interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    price: string;
}

const products: Product[] = [
    {
        id: "1",
        name: "Stylischer Hundehoodie",
        image: "/src/assets/stylischer_hundehoodie.webp",
        description: "Ein gemütlicher Hoodie für kalte Tage.\n\nMaterial:\n95 % Baumwolle, 5 % Elasthan.",
        price: "29,99€"
    },
    {
        id: "2",
        name: "Magisches Katzenhalsband",
        image: "/src/assets/magisches_katzenhalsband.webp",
        description: "Verleiht deiner Katze einen edlen Look.\n\nMaterial:\nEdelstahl, vergoldet. Zirkonia.",
        price: "19,99€"
    },
    {
        id: "3",
        name: "Eleganter Papageienhut",
        image: "/src/assets/eleganter_papageienhut.webp",
        description: "Der perfekte Hut für stilbewusste Vögel.\n\nMaterial:\nFilz, Federn, Polyester, Metall.",
        price: "14,99€"
    }
];

export default products;
