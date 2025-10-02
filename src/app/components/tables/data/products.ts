export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  brand?: string;
  imageUrl: string;
  children?: Product[];
};

const products: Product[] = [
  {
    id: "bebidas",
    name: "Bebidas",
    category: "Bebidas",
    price: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=600&auto=format&fit=crop",
    children: [
      {
        id: "bebidas-alcoholicas",
        name: "Alcohólicas",
        category: "Bebidas",
        subcategory: "Alcohólicas",
        price: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1514361892635-6b07e31e75d9?q=80&w=600&auto=format&fit=crop",
        children: [
          {
            id: "ron",
            name: "Ron",
            category: "Bebidas",
            subcategory: "Ron",
            price: 0,
            brand: "",
            imageUrl:
              "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?q=80&w=600&auto=format&fit=crop",
            children: [
              {
                id: "ron-santateresa-aniversario",
                name: "Santa Teresa Aniversario",
                category: "Bebidas",
                subcategory: "Ron",
                price: 25,
                brand: "Santa Teresa",
                imageUrl:
                  "https://images.unsplash.com/photo-1624360252989-3e97e2bca6b0?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "ron-santateresa-1796",
                name: "Santa Teresa 1796",
                category: "Bebidas",
                subcategory: "Ron",
                price: 45,
                brand: "Santa Teresa",
                imageUrl:
                  "https://images.unsplash.com/photo-1617806118233-bb1c6a0dfda5?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "ron-diplomatico-reserva",
                name: "Diplomático Reserva",
                category: "Bebidas",
                subcategory: "Ron",
                price: 30,
                brand: "Diplomático",
                imageUrl:
                  "https://images.unsplash.com/photo-1611284446314-60a58ac0c2b7?q=80&w=600&auto=format&fit=crop",
              },
            ],
          },
          {
            id: "cervezas",
            name: "Cervezas",
            category: "Bebidas",
            subcategory: "Cervezas",
            price: 0,
            imageUrl:
              "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=600&auto=format&fit=crop",
            children: [
              {
                id: "cerveza-pale-ale",
                name: "Pale Ale Artesanal",
                category: "Bebidas",
                subcategory: "Cervezas",
                price: 4.5,
                brand: "CraftCo",
                imageUrl:
                  "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "cerveza-lager",
                name: "Lager Clásica",
                category: "Bebidas",
                subcategory: "Cervezas",
                price: 3.2,
                brand: "GoldBeer",
                imageUrl:
                  "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "cerveza-stout",
                name: "Stout Negra",
                category: "Bebidas",
                subcategory: "Cervezas",
                price: 4.9,
                brand: "NightBrew",
                imageUrl:
                  "https://images.unsplash.com/photo-1600275669283-4d21a7103e52?q=80&w=600&auto=format&fit=crop",
              },
            ],
          },
          {
            id: "whiskies",
            name: "Whiskies",
            category: "Bebidas",
            subcategory: "Whiskies",
            price: 0,
            imageUrl:
              "https://images.unsplash.com/photo-1544141015-4a0b5e46f3de?q=80&w=600&auto=format&fit=crop",
            children: [
              {
                id: "whisky-scotch",
                name: "Scotch 12 años",
                category: "Bebidas",
                subcategory: "Whiskies",
                price: 55,
                brand: "Glen Valley",
                imageUrl:
                  "https://images.unsplash.com/photo-1547452919-51ce6203a2c4?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "whisky-bourbon",
                name: "Bourbon Reserve",
                category: "Bebidas",
                subcategory: "Whiskies",
                price: 49,
                brand: "Old Creek",
                imageUrl:
                  "https://images.unsplash.com/photo-1604908177075-991b63590f9f?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "whisky-rye",
                name: "Rye Select",
                category: "Bebidas",
                subcategory: "Whiskies",
                price: 46,
                brand: "Maple Ridge",
                imageUrl:
                  "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop",
              },
            ],
          },
        ],
      },
      {
        id: "bebidas-refrescos",
        name: "Refrescos",
        category: "Bebidas",
        subcategory: "Refrescos",
        price: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=600&auto=format&fit=crop",
        children: [
          {
            id: "refresco-cola",
            name: "Cola",
            category: "Bebidas",
            subcategory: "Refrescos",
            price: 1.5,
            brand: "ColaCo",
            imageUrl:
              "https://images.unsplash.com/photo-1600275669283-4d21a7103e52?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "refresco-limon",
            name: "Limonada",
            category: "Bebidas",
            subcategory: "Refrescos",
            price: 1.2,
            brand: "Citrus+",
            imageUrl:
              "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "refresco-naranja",
            name: "Naranja",
            category: "Bebidas",
            subcategory: "Refrescos",
            price: 1.3,
            brand: "OrangeZ",
            imageUrl:
              "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=600&auto=format&fit=crop",
          },
        ],
      },
      {
        id: "bebidas-jugos",
        name: "Jugos",
        category: "Bebidas",
        subcategory: "Jugos",
        price: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop",
        children: [
          {
            id: "jugo-manzana",
            name: "Jugo de Manzana",
            category: "Bebidas",
            subcategory: "Jugos",
            price: 2.3,
            brand: "Apple Farm",
            imageUrl:
              "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "jugo-uva",
            name: "Jugo de Uva",
            category: "Bebidas",
            subcategory: "Jugos",
            price: 2.6,
            brand: "Purple Vine",
            imageUrl:
              "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "jugo-pina",
            name: "Jugo de Piña",
            category: "Bebidas",
            subcategory: "Jugos",
            price: 2.4,
            brand: "Tropic",
            imageUrl:
              "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=600&auto=format&fit=crop",
          },
        ],
      },
    ],
  },
];

export default products;
