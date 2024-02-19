let actorItems = _token.actor.items;
let items = {
  backpack: [],
  weapon: [],
  equipment: [],
  loot: [],
  tool: [],
  consumable: [],
}
let itemDetails = {
  mundane: 0,
  common: 0,
  uncommon: 0,
  rare: 0,
  veryRare: 0,
  legendary: 0,
  artifact: 0,
  total: 0,
  totalValue: 0,
  undefinedValue: 0
}
let stuff = {
  backpack: {
    mundane: 0,
    common: 0,
    uncommon: 0,
    rare: 0,
    veryRare: 0,
    legendary: 0,
    artifact: 0,
    total: 0,
    totalValue: 0,
    undefinedValue: 0
  },
  weapon: {
    mundane: 0,
    common: 0,
    uncommon: 0,
    rare: 0,
    veryRare: 0,
    legendary: 0,
    artifact: 0,
    total: 0,
    totalValue: 0,
    undefinedValue: 0
  },
  equipment: {
    mundane: 0,
    common: 0,
    uncommon: 0,
    rare: 0,
    veryRare: 0,
    legendary: 0,
    artifact: 0,
    total: 0,
    totalValue: 0,
    undefinedValue: 0
  },
  loot: {
    mundane: 0,
    common: 0,
    uncommon: 0,
    rare: 0,
    veryRare: 0,
    legendary: 0,
    artifact: 0,
    total: 0,
    totalValue: 0,
    undefinedValue: 0
  },
  tool: {
    mundane: 0,
    common: 0,
    uncommon: 0,
    rare: 0,
    veryRare: 0,
    legendary: 0,
    artifact: 0,
    total: 0,
    totalValue: 0,
    undefinedValue: 0
  },
  consumable: {
    mundane: 0,
    common: 0,
    uncommon: 0,
    rare: 0,
    veryRare: 0,
    legendary: 0,
    artifact: 0,
    total: 0,
    totalValue: 0,
    undefinedValue: 0
  },
  all: {
    mundane: 0,
    common: 0,
    uncommon: 0,
    rare: 0,
    veryRare: 0,
    legendary: 0,
    artifact: 0,
    total: 0,
    totalValue: 0,
    undefinedValue: 0
  }
}

for (const item of actorItems) {
  if (Object.keys(items).includes(item.type)) {
    items[item.type].push(item);

    // Rarity Quantities
    if (Object.keys(itemDetails).includes(item.system.rarity)) {
      stuff[item.type][item.system.rarity] += item.system.quantity;
      stuff["all"][item.system.rarity] += item.system.quantity;
    } else {
      stuff[item.type]["mundane"] += item.system.quantity;
      stuff["all"]["mundane"] += item.system.quantity;
    }
    stuff[item.type]["total"] += item.system.quantity;
    stuff["all"]["total"] += item.system.quantity;

    // Values
    itemValue = Math.round(item.system.price.value * item.system.quantity)
    if (itemValue > 0) {
      stuff[item.type]["totalValue"] += itemValue;
      stuff["all"]["totalValue"] += itemValue;
    } else {
      stuff[item.type]["undefinedValue"] += item.system.quantity;
      stuff["all"]["undefinedValue"] += item.system.quantity;
    }
  }
}

const DialogOptions = {
  resizeable: true,
  width:'auto'
};

new Dialog({
  title: `Stuff`,
  content: `
<h2>${actor.name}</h2>
<table>
  <tr>
    <th></th>
    <th>Backpacks</th>
    <th>Weapons</th>
    <th>Equipment</th>
    <th>Loot</th>
    <th>Tools</th>
    <th>Consumables</th>
    <th>All</th>
  </tr>
  <tr>
    <td>Mundane</td>
    <td>${stuff.backpack.mundane}</td>
    <td>${stuff.weapon.mundane}</td>
    <td>${stuff.equipment.mundane}</td>
    <td>${stuff.loot.mundane}</td>
    <td>${stuff.tool.mundane}</td>
    <td>${stuff.consumable.mundane}</td>
    <td>${stuff.all.mundane}</td>
  </tr>
  <tr>
    <td>Common</td>
    <td>${stuff.backpack.common}</td>
    <td>${stuff.weapon.common}</td>
    <td>${stuff.equipment.common}</td>
    <td>${stuff.loot.common}</td>
    <td>${stuff.tool.common}</td>
    <td>${stuff.consumable.common}</td>
    <td>${stuff.all.common}</td>
  </tr>
  <tr>
    <td>Uncommon</td>
    <td>${stuff.backpack.uncommon}</td>
    <td>${stuff.weapon.uncommon}</td>
    <td>${stuff.equipment.uncommon}</td>
    <td>${stuff.loot.uncommon}</td>
    <td>${stuff.tool.uncommon}</td>
    <td>${stuff.consumable.uncommon}</td>
    <td>${stuff.all.uncommon}</td>
  </tr>
  <tr>
    <td>Rare</td>
    <td>${stuff.backpack.rare}</td>
    <td>${stuff.weapon.rare}</td>
    <td>${stuff.equipment.rare}</td>
    <td>${stuff.loot.rare}</td>
    <td>${stuff.tool.rare}</td>
    <td>${stuff.consumable.rare}</td>
    <td>${stuff.all.rare}</td>
  </tr>
  <tr>
    <td>Very Rare</td>
    <td>${stuff.backpack.veryRare}</td>
    <td>${stuff.weapon.veryRare}</td>
    <td>${stuff.equipment.veryRare}</td>
    <td>${stuff.loot.veryRare}</td>
    <td>${stuff.tool.veryRare}</td>
    <td>${stuff.consumable.veryRare}</td>
    <td>${stuff.all.veryRare}</td>
  </tr>
  <tr>
    <td>Legendary</td>
    <td>${stuff.backpack.legendary}</td>
    <td>${stuff.weapon.legendary}</td>
    <td>${stuff.equipment.legendary}</td>
    <td>${stuff.loot.legendary}</td>
    <td>${stuff.tool.legendary}</td>
    <td>${stuff.consumable.legendary}</td>
    <td>${stuff.all.legendary}</td>
  </tr>
  <tr>
    <td>Artifact</td>
    <td>${stuff.backpack.artifact}</td>
    <td>${stuff.weapon.artifact}</td>
    <td>${stuff.equipment.artifact}</td>
    <td>${stuff.loot.artifact}</td>
    <td>${stuff.tool.artifact}</td>
    <td>${stuff.consumable.artifact}</td>
    <td>${stuff.all.artifact}</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>${stuff.backpack.total}</td>
    <td>${stuff.weapon.total}</td>
    <td>${stuff.equipment.total}</td>
    <td>${stuff.loot.total}</td>
    <td>${stuff.tool.total}</td>
    <td>${stuff.consumable.total}</td>
    <td>${stuff.all.total}</td>
  </tr>
  <tr>
    <td>Total Value</td>
    <td>${stuff.backpack.totalValue}</td>
    <td>${stuff.weapon.totalValue}</td>
    <td>${stuff.equipment.totalValue}</td>
    <td>${stuff.loot.totalValue}</td>
    <td>${stuff.tool.totalValue}</td>
    <td>${stuff.consumable.totalValue}</td>
    <td>${stuff.all.totalValue}</td>
  </tr>
  <tr>
    <td>Undefined Value</td>
    <td>${stuff.backpack.undefinedValue}</td>
    <td>${stuff.weapon.undefinedValue}</td>
    <td>${stuff.equipment.undefinedValue}</td>
    <td>${stuff.loot.undefinedValue}</td>
    <td>${stuff.tool.undefinedValue}</td>
    <td>${stuff.consumable.undefinedValue}</td>
    <td>${stuff.all.undefinedValue}</td>
  </tr>

</table>
`,
	buttons: {
		close: {label: "Close", callback: () => {
            // simply close
        }},
	},
    default: "close"
}, DialogOptions ).render(true);