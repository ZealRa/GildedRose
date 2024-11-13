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
          break;
        default:
          this.updateRegularItem(item);
          break;
      }

      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn -= 1;
      }

      if (item.sellIn < 0) {
        this.handleExpiredItem(item);
      }
    });

    return this.items;
  }

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
      item.quality -= 1;
    }
  }

  handleExpiredItem(item) {
    if (item.name === 'Aged Brie') {
      if (item.quality < 50) item.quality += 1;
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      item.quality = 0; 
    } else {
      if (item.quality > 0) item.quality -= 1;
      if (item.name.startsWith('Conjured') && item.quality > 0) {
        item.quality -= 1;
      }
    }
  }
}

module.exports = {
  Item,
  Shop
}
