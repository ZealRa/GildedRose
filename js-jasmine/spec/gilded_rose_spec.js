const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("augmente la qualité de Aged Brie chaque jour", function() {
    const item = new Item("Aged Brie", 2, 0);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toBe(1);
  });

  it("double la dégradation de la qualité des articles normaux après la date de péremption", function() {
    const item = new Item("Elixir of the Mongoose", 0, 6);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toBe(4);
  });

  it("ne permet jamais à la qualité d'un article d'être négative", function() {
    const item = new Item("Elixir of the Mongoose", 5, 0);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toBe(0);
  });

  it("ne permet jamais à la qualité d'un article d'excéder 50", function() {
    const item = new Item("Aged Brie", 2, 50);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toBe(50);
  });

  it("augmente la qualité de Backstage passes de 2 quand il reste entre 6 et 10 jours", function() {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toBe(22);
  });

  it("augmente la qualité de Backstage passes de 3 quand il reste 5 jours ou moins", function() {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toBe(23);
  });

  it("met la qualité de Backstage passes à 0 après la date de concert", function() {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toBe(0);
  });

  it("ne modifie pas la qualité ni le sellIn de Sulfuras", function() {
    const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toBe(80);
    expect(item.sellIn).toBe(0);
  });

  it("dégrade la qualité des articles Conjured deux fois plus vite", function() {
    const item = new Item("Conjured Mana Cake", 3, 6);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toBe(4);
  });

});
