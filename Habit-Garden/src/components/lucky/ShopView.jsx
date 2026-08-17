import { useState } from "react";
import { motion } from "motion/react";
import { PixelPlant } from "./Garden/Plants";
import "./ShopView.css";

// Shop items
const defaultItems = [
  {
    id: 1,
    name: "Sunny Sunflower",
    description: "A cheerful plant that brightens your garden.",
    species: "sunflower",
    price: 50,
    currency: "coins",
    owned: false,
  },

  {
    id: 2,
    name: "Cozy Rose",
    description: "A beautiful flower for your peaceful garden.",
    species: "rose",
    price: 10,
    currency: "gems",
    owned: false,
  },

  {
    id: 3,
    name: "Fresh Herb",
    description: "A simple little plant for your growing collection.",
    species: "herb",
    price: 35,
    currency: "coins",
    owned: false,
  },

  {
    id: 4,
    name: "Spring Tulip",
    description: "Add a warm touch of color to your virtual garden.",
    species: "tulip",
    price: 8,
    currency: "gems",
    owned: false,
  },
];

function ShopView({ items, user, onBuyItem }) {
  // Use the items coming from the app.
  // If there are no items, use our default items.
  const [shopItems, setShopItems] = useState(
    items && items.length > 0 ? items : defaultItems,
  );

  // Keep track of the user's coins and gems
  const [coins, setCoins] = useState(user?.coins ?? 250);
  const [gems, setGems] = useState(user?.gems ?? 18);

  // This function runs when Get Item is clicked
  const handleBuy = (item) => {
    // Check if the item costs coins
    if (item.currency === "coins") {
      // Check if the user has enough coins
      if (coins < item.price) {
        alert("You don't have enough coins!");
        return;
      }

      // Remove the price from the coins
      setCoins(coins - item.price);
    }

    // Check if the item costs gems
    if (item.currency === "gems") {
      // Check if the user has enough gems
      if (gems < item.price) {
        alert("You don't have enough gems!");
        return;
      }

      // Remove the price from the gems
      setGems(gems - item.price);
    }

    // Change the item to owned
    setShopItems(
      shopItems.map((shopItem) =>
        shopItem.id === item.id ? { ...shopItem, owned: true } : shopItem,
      ),
    );

    // If the parent component has its own buy function,
    // send the purchased item to it.
    if (onBuyItem) {
      onBuyItem(item);
    }
  };

  return (
    <div className="shop">
      {/* Shop heading */}
      <div className="shop-header">
        <div>
          <h1>Garden Shop</h1>

          <p>
            Unlock rare seeds, cozy pots, and decorations with your earned
            rewards.
          </p>
        </div>

        {/* User balance */}
        <div className="balance">
          <span>🪙 {coins} Coins</span>

          <span className="line"></span>

          <span>💎 {gems} Gems</span>
        </div>
      </div>

      {/* Shop items */}
      <div className="shop-items">
        {shopItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -5 }}
            className="shop-card"
          >
            {/* Plant */}
            <div className="plant-box">
              <PixelPlant stage={5} species={item.species} size={96} />

              {/* Show Owned */}
              {item.owned && <span className="owned">Owned</span>}
            </div>

            {/* Item information */}
            <div>
              <h3>{item.name}</h3>

              <p>{item.description}</p>
            </div>

            {/* Price and button */}
            <div className="item-bottom">
              {/* Show price */}
              <strong>
                {item.currency === "coins" ? "🪙" : "💎"} {item.price}
              </strong>

              {/* Buy button */}
              <button onClick={() => handleBuy(item)} disabled={item.owned}>
                {item.owned ? "Equipped" : "Get Item"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ShopView;
