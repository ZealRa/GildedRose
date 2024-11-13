class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      switch (item.name) {
        case 'Aged Brie':
          this.updateAgedBrie(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstagePass(item);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          break; // Sulfuras ne change jamais, aucune action nécessaire
        default:
          this.updateRegularItem(item);
          break;
      }

      // Décrémente le délai de vente, sauf pour Sulfuras
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn -= 1;
      }

      // Si le produit est expiré, applique une logique spéciale
      if (item.sellIn < 0) {
        this.handleExpiredItem(item);
      }
    });

    return this.items;
  }

  // Méthodes de mise à jour pour chaque type d'article
  updateAgedBrie(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  updateBackstagePass(item) {
    if (item.quality < 50) {
      item.quality += 1;
      if (item.sellIn < 11 && item.quality < 50) {
        item.quality += 1;
      }
      if (item.sellIn < 6 && item.quality < 50) {
        item.quality += 1;
      }
    }
  }

  updateRegularItem(item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
    if (item.name.startsWith('Conjured') && item.quality > 0) {
      item.quality -= 1; // Les articles Conjured se dégradent deux fois plus vite
    }
  }

  handleExpiredItem(item) {
    if (item.name === 'Aged Brie') {
      if (item.quality < 50) item.quality += 1;
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      item.quality = 0; // La qualité tombe à 0 après le concert
    } else {
      if (item.quality > 0) item.quality -= 1;
      if (item.name.startsWith('Conjured') && item.quality > 0) {
        item.quality -= 1; // Les articles Conjured se dégradent aussi plus vite après péremption
      }
    }
  }
}

module.exports = {
  Item,
  Shop
}
