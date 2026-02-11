/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (
    typeof thali !== "object" ||
    thali === null ||
    typeof thali.name !== "string" ||
    !Array.isArray(thali.items) ||
    typeof thali.price !== "number" ||
    !Number.isFinite(thali.price) ||
    typeof thali.isVeg !== "boolean"
  ) {
    return "";
  }

    return `${thali.name.toUpperCase()} (${thali.isVeg?'Veg':'Non-Veg'}) - Items: ${thali.items.join(", ")} - Rs.${thali.price.toFixed(2)}`;

}

export function getThaliStats(thalis) {
  // Your code here
  let statsThali = {
    totalThalis: 0, 
    vegCount: 0, 
    nonVegCount: 0, 
    avgPrice: 0,
    cheapest: 0, 
    costliest: 0, 
    names: []
  }

  let totalPrice = 0;

  if (
    !Array.isArray(thalis) || 
    thalis.length === 0
  ) {
    return null;
  }

  statsThali.totalThalis = thalis.length;
  statsThali.vegCount = thalis.filter(thali => thali.isVeg === true).length;
  statsThali.nonVegCount = thalis.filter(thali => !thali.isVeg).length;
  totalPrice = thalis.reduce((total, item) => {
    return total + item.price;
  },0);
  console.log(totalPrice);
  statsThali.avgPrice = (totalPrice/thalis.length).toFixed(2) ;
  statsThali.cheapest = Math.min(...thalis.map(thali => thali.price));
  statsThali.costliest = Math.max(...thalis.map(thali => thali.price));
  statsThali.names = thalis.map(thali=>thali.name);

  console.log(statsThali);

  return statsThali;

}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if (!Array.isArray(thalis) || typeof query!=='string') return [];
  
  let matchingThali = [];

  matchingThali = thalis.filter(thali => thali.name.toLowerCase().includes(query.toLowerCase()) || thali.items.some(item => item.toLowerCase().includes(query.toLowerCase())));
  return matchingThali;
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here
  if (!Array.isArray(thalis) || thalis.length === 0 || typeof customerName !== 'string') return "";

  let thaliReceipt = "";
  let line_items = [];
  let totalCost = 0;

  line_items = thalis.map(thali => `- ${thali.name} x Rs.${thali.price}`);
  totalCost = thalis.reduce((acc, item) => {
    return acc + item.price
  },0);


  thaliReceipt = `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${line_items.join('\n')}\n---\nTotal: Rs.${totalCost}\nItems: ${line_items.length}`
  return thaliReceipt;

}

