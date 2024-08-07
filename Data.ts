namespace Eisdealer{
    	
    export interface Item {
        name: string;
        price: number;
        color: string;
      }
    
      export interface Data {
        [category: string]: Item[];
    }

    export let data: Data = {
        IceCream: [
            { name: "Strawberry Ice Cream", price: 1.20, color: "#ED413E" },
            { name: "Coffee Ice Cream", price: 1.20, color: "#A78B71" },
            { name: "Mango Ice Cream", price: 1.20, color: "#FEF4C0" },
        ],
        Sauce: [
            { name: "Strawberry Sauce", price: 0.30, color: "#B20000" },
            { name: "Chocolate Sauce", price: 0.30, color: "#432D2D" },
        ],
        Sprinkles: [
            { name: "Chocolate Sprinkles", price: 0.30, color: "#583E26" },
            { name: "Star Sprinkles", price: 0.30, color: "#F2A60A" },
        ],
        Tables: [
          { name: "Table 1", price: 0, color: "pink" },
          { name: "Table 2", price: 0, color: "pink" },
          { name: "Table 3", price: 0, color: "pink" },
          { name: "Table 4", price: 0, color: "pink" },
          { name: "Table 5", price: 0, color: "pink" }
      ]
    }
}