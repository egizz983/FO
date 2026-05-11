
const cropArray = [
  [ // cropType 0: Basic (Apple → Gold Blueberry)
    {
      name: "Apple",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/0/0b/FarmCrop0.png"
    },
    {
      name: "Orange",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/b/bf/FarmCrop1.png"
    },
    {
      name: "Lemon",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/1/1c/FarmCrop2.png"
    },
    {
      name: "Pear",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/3/3d/FarmCrop3.png"
    },
    {
      name: "Strawberry",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/1/14/FarmCrop4.png"
    },
    {
      name: "Bananas",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/7/7c/FarmCrop5.png"
    },
    {
      name: "Blueberry",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/9/90/FarmCrop6.png"
    },
    {
      name: "Brown Grapes",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/1/15/FarmCrop7.png"
    },
    {
      name: "Red Pear",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/d/d8/FarmCrop8.png"
    },
    {
      name: "Pineapple",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/d/d7/FarmCrop9.png"
    },
    {
      name: "Lime",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/f/fa/FarmCrop10.png"
    },
    {
      name: "Raspberry",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/f/f8/FarmCrop11.png"
    },
    {
      name: "Fig",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/2/22/FarmCrop12.png"
    },
    {
      name: "Peach",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/7/79/FarmCrop13.png"
    },
    {
      name: "Purple Grapes",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/b/bb/FarmCrop14.png"
    },
    {
      name: "Yellow Pear",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/5/54/FarmCrop15.png"
    },
    {
      name: "Watermelon",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/8/8a/FarmCrop16.png"
    },
    {
      name: "Green Grapes",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/c/cd/FarmCrop17.png"
    },
    {
      name: "Dragon Fruit",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/8/84/FarmCrop18.png"
    },
    {
      name: "Mango",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/0/01/FarmCrop19.png"
    },
    {
      name: "Gold Blueberry",
      baseExp: 5,
      growthTime: "4H",
      image: "https://idleon.wiki/images/8/8f/FarmCrop20.png"
    }
  ],
[
  {
    name: "Carrot",
    baseExp: 55,
    growthTime: "6H",
    image: "https://idleon.wiki/images/1/15/FarmCrop21.png"
  },
  {
    name: "Potato",
    baseExp: 67,
    growthTime: "6H",
    image: "https://idleon.wiki/images/2/2e/FarmCrop22.png"
  },
  {
    name: "Beat",
    baseExp: 83,
    growthTime: "6H",
    image: "https://idleon.wiki/images/7/75/FarmCrop23.png"
  },
  {
    name: "Tomato",
    baseExp: 102,
    growthTime: "6H",
    image: "https://idleon.wiki/images/8/8f/FarmCrop24.png"
  },
  {
    name: "Artichoke",
    baseExp: 127,
    growthTime: "6H",
    image: "https://idleon.wiki/images/7/7a/FarmCrop25.png"
  },
  {
    name: "Roma Tomato",
    baseExp: 157,
    growthTime: "6H",
    image: "https://idleon.wiki/images/2/2a/FarmCrop26.png"
  },
  {
    name: "Butternut Squash",
    baseExp: 195,
    growthTime: "6H",
    image: "https://idleon.wiki/images/8/85/FarmCrop27.png"
  },
  {
    name: "Avocado",
    baseExp: 243,
    growthTime: "6H",
    image: "https://idleon.wiki/images/4/41/FarmCrop28.png"
  },
  {
    name: "Red Pepper",
    baseExp: 303,
    growthTime: "6H",
    image: "https://idleon.wiki/images/4/46/FarmCrop29.png"
  },
  {
    name: "Broccoli",
    baseExp: 377,
    growthTime: "6H",
    image: "https://idleon.wiki/images/f/fa/FarmCrop30.png"
  },
  {
    name: "Radish",
    baseExp: 470,
    growthTime: "6H",
    image: "https://idleon.wiki/images/e/ee/FarmCrop31.png"
  },
  {
    name: "Coconut",
    baseExp: 587,
    growthTime: "6H",
    image: "https://idleon.wiki/images/3/30/FarmCrop32.png"
  },
  {
    name: "Sliced Tomato",
    baseExp: 732,
    growthTime: "6H",
    image: "https://idleon.wiki/images/b/b6/FarmCrop33.png"
  },
  {
    name: "Cashew",
    baseExp: 914,
    growthTime: "6H",
    image: "https://idleon.wiki/images/6/6a/FarmCrop34.png"
  },
  {
    name: "Turnip",
    baseExp: 1141,
    growthTime: "6H",
    image: "https://idleon.wiki/images/3/3f/FarmCrop35.png"
  },
  {
    name: "Coffee Bean",
    baseExp: 1426,
    growthTime: "6H",
    image: "https://idleon.wiki/images/7/75/FarmCrop36.png"
  },
  {
    name: "Pumpkin",
    baseExp: 1781,
    growthTime: "6H",
    image: "https://idleon.wiki/images/7/7b/FarmCrop37.png"
  },
  {
    name: "Sliced Cucumber",
    baseExp: 2225,
    growthTime: "6H",
    image: "https://idleon.wiki/images/4/4f/FarmCrop38.png"
  },
  {
    name: "Eggplant",
    baseExp: 2780,
    growthTime: "6H",
    image: "https://idleon.wiki/images/8/85/FarmCrop39.png"
  },
  {
    name: "Lettuce",
    baseExp: 3474,
    growthTime: "6H",
    image: "https://idleon.wiki/images/b/b8/FarmCrop40.png"
  },
  {
    name: "Garlic",
    baseExp: 4341,
    growthTime: "6H",
    image: "https://idleon.wiki/images/e/ed/FarmCrop41.png"
  },
  {
    name: "Green Beans",
    baseExp: 5426,
    growthTime: "6H",
    image: "https://idleon.wiki/images/3/35/FarmCrop42.png"
  },
  {
    name: "Bell Pepper",
    baseExp: 6781,
    growthTime: "6H",
    image: "https://idleon.wiki/images/1/11/FarmCrop43.png"
  },
  {
    name: "Corn",
    baseExp: 8475,
    growthTime: "6H",
    image: "https://idleon.wiki/images/8/8e/FarmCrop44.png"
  },
  {
    name: "Gold Sliced Tomato",
    baseExp: 10592,
    growthTime: "6H",
    image: "https://idleon.wiki/images/6/69/FarmCrop45.png"
  }], // cropType 1: Earthy (ready to add when you confirm/share)
  [
  {
    name: "Daisy",
    baseExp: 205,
    growthTime: "9H",
    image: "https://idleon.wiki/images/c/cc/FarmCrop46.png"
  },
  {
    name: "Flour",
    baseExp: 255,
    growthTime: "9H",
    image: "https://idleon.wiki/images/f/f8/FarmCrop47.png"
  },
  {
    name: "Stargazer Lily",
    baseExp: 317,
    growthTime: "9H",
    image: "https://idleon.wiki/images/4/4c/FarmCrop48.png"
  },
  {
    name: "Rose",
    baseExp: 395,
    growthTime: "9H",
    image: "https://idleon.wiki/images/3/3b/FarmCrop49.png"
  },
  {
    name: "Sunflower",
    baseExp: 493,
    growthTime: "9H",
    image: "https://idleon.wiki/images/0/08/FarmCrop50.png"
  },
  {
    name: "Blue Daisy",
    baseExp: 615,
    growthTime: "9H",
    image: "https://idleon.wiki/images/6/6b/FarmCrop51.png"
  },
  {
    name: "Red Rose",
    baseExp: 767,
    growthTime: "9H",
    image: "https://idleon.wiki/images/d/d9/FarmCrop52.png"
  },
  {
    name: "Tulip",
    baseExp: 958,
    growthTime: "9H",
    image: "https://idleon.wiki/images/0/06/FarmCrop53.png"
  },
  {
    name: "Pink Daisy",
    baseExp: 1197,
    growthTime: "9H",
    image: "https://idleon.wiki/images/f/f1/FarmCrop54.png"
  },
  {
    name: "Cauliflower",
    baseExp: 1495,
    growthTime: "9H",
    image: "https://idleon.wiki/images/0/01/FarmCrop55.png"
  },
  {
    name: "Cape Marguerite Daisy",
    baseExp: 1867,
    growthTime: "9H",
    image: "https://idleon.wiki/images/7/79/FarmCrop56.png"
  },
  {
    name: "Papua Black Orchid",
    baseExp: 2333,
    growthTime: "9H",
    image: "https://idleon.wiki/images/7/75/FarmCrop57.png"
  },
  {
    name: "Muffin",
    baseExp: 2915,
    growthTime: "9H",
    image: "https://idleon.wiki/images/8/8b/FarmCrop58.png"
  },
  {
    name: "Black Rose",
    baseExp: 3642,
    growthTime: "9H",
    image: "https://idleon.wiki/images/b/be/FarmCrop59.png"
  },
  {
    name: "Golden Tulip",
    baseExp: 4552,
    growthTime: "9H",
    image: "https://idleon.wiki/images/d/d8/FarmCrop60.png"
  }
], // cropType 2: Bulbo
  [
  {
    name: "Sake Maki",
    baseExp: 605,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/e/ec/FarmCrop61.png"
  },
  {
    name: "Salmon Nigiri",
    baseExp: 755,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/6/63/FarmCrop62.png"
  },
  {
    name: "Temaki",
    baseExp: 942,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/5/53/FarmCrop63.png"
  },
  {
    name: "Hamaguri",
    baseExp: 1176,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/3/33/FarmCrop64.png"
  },
  {
    name: "Onigiri",
    baseExp: 1469,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/6/64/FarmCrop65.png"
  },
  {
    name: "Ama-ebi",
    baseExp: 1836,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/6/6e/FarmCrop66.png"
  },
  {
    name: "Cup Ramen",
    baseExp: 2293,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/2/2b/FarmCrop67.png"
  },
  {
    name: "Dalkon Maki",
    baseExp: 2866,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/a/a5/FarmCrop68.png"
  },
  {
    name: "Sushi 9",
    baseExp: 3581,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/4/4d/FarmCrop69.png"
  },
  {
    name: "Sushi 10",
    baseExp: 4475,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/4/4d/FarmCrop70.png"
  },
  {
    name: "Ikura",
    baseExp: 5592,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/8/8b/FarmCrop71.png"
  },
  {
    name: "Sushi 12",
    baseExp: 6989,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/f/f6/FarmCrop72.png"
  },
  {
    name: "Sushi 13",
    baseExp: 8736,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/f/f7/FarmCrop73.png"
  },
  {
    name: "Sushi 14",
    baseExp: 10918,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/3/35/FarmCrop74.png"
  },
  {
    name: "Abocado Maki",
    baseExp: 13647,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/e/ec/FarmCrop75.png"
  },
  {
    name: "Ebi Nigiri",
    baseExp: 17058,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/f/f0/FarmCrop76.png"
  },
  {
    name: "Sushi 17",
    baseExp: 21321,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/4/47/FarmCrop77.png"
  },
  {
    name: "Sushi 18",
    baseExp: 26650,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/8/8d/FarmCrop78.png"
  },
  {
    name: "Tako Nigiri",
    baseExp: 33311,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/a/a7/FarmCrop79.png"
  },
  {
    name: "Soy Sauce",
    baseExp: 41638,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/a/a9/FarmCrop80.png"
  },
  {
    name: "Sushi 21",
    baseExp: 52046,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/4/47/FarmCrop81.png"
  },
  {
    name: "Neko Rice",
    baseExp: 65057,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/6/62/FarmCrop82.png"
  },
  {
    name: "Shrimp",
    baseExp: 81320,
    growthTime: "13H 30M",
    image: "https://idleon.wiki/images/b/b2/FarmCrop83.png"
  }
], // cropType 3: Sushi
  [
  {
    name: "Mushroom 1",
    baseExp: 1605,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/6/66/FarmCrop84.png"
  },
  {
    name: "Mushroom 2",
    baseExp: 2005,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/4/49/FarmCrop85.png"
  },
  {
    name: "Mushroom 3",
    baseExp: 2505,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/f/f7/FarmCrop86.png"
  },
  {
    name: "Mushroom 4",
    baseExp: 3130,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/f/f3/FarmCrop87.png"
  },
  {
    name: "Mushroom 5",
    baseExp: 3911,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/b/bd/FarmCrop88.png"
  },
  {
    name: "Mushroom 6",
    baseExp: 4887,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/f/f2/FarmCrop89.png"
  },
  {
    name: "Mushroom 7",
    baseExp: 6108,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/9/9e/FarmCrop90.png"
  },
  {
    name: "Mushroom 8",
    baseExp: 7634,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/4/48/FarmCrop91.png"
  },
  {
    name: "Mushroom 9",
    baseExp: 9541,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/e/e2/FarmCrop92.png"
  },
  {
    name: "Mushroom 10",
    baseExp: 11925,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/e/e0/FarmCrop93.png"
  },
  {
    name: "Mushroom 11",
    baseExp: 14906,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/9/90/FarmCrop94.png"
  },
  {
    name: "Mushroom 12",
    baseExp: 18631,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/7/7c/FarmCrop95.png"
  },
  {
    name: "Mushroom 13",
    baseExp: 23288,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/0/0f/FarmCrop96.png"
  },
  {
    name: "Mushroom 14",
    baseExp: 29108,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/3/30/FarmCrop97.png"
  },
  {
    name: "Mushroom 15",
    baseExp: 36384,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/e/ef/FarmCrop98.png"
  },
  {
    name: "Mushroom 16",
    baseExp: 45479,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/1/12/FarmCrop99.png"
  },
  {
    name: "Mushroom 17",
    baseExp: 56848,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/4/4f/FarmCrop100.png"
  },
  {
    name: "Mushroom 18",
    baseExp: 71059,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/9/9f/FarmCrop101.png"
  },
  {
    name: "Mushroom 19",
    baseExp: 88822,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/e/e0/FarmCrop102.png"
  },
  {
    name: "Mushroom 20",
    baseExp: 111027,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/f/fd/FarmCrop103.png"
  },
  {
    name: "Mushroom 21",
    baseExp: 138782,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/2/26/FarmCrop104.png"
  },
  {
    name: "Mushroom 22",
    baseExp: 173477,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/d/d8/FarmCrop105.png"
  },
  {
    name: "Mushroom 23",
    baseExp: 216845,
    growthTime: "20H 15M",
    image: "https://idleon.wiki/images/e/e8/FarmCrop106.png"
  }
], // cropType 4: Mushie
  [
  {
    name: "Glassy Bananas",
    baseExp: 4005,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/f/f1/FarmCrop107.png"
  },
  {
    name: "Glassy Mango",
    baseExp: 5005,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/c/c9/FarmCrop108.png"
  },
  {
    name: "Glassy Mushroom",
    baseExp: 6255,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/d/d1/FarmCrop109.png"
  },
  {
    name: "Glassy Maki",
    baseExp: 7817,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/ec/FarmCrop110.png"
  },
  {
    name: "Glassy Broccoli",
    baseExp: 9770,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/23/FarmCrop111.png"
  },
  {
    name: "Glassy Carrot",
    baseExp: 12212,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/3/3d/FarmCrop112.png"
  },
  {
    name: "Glassy Tomato",
    baseExp: 15263,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/5/55/FarmCrop113.png"
  },
  {
    name: "Glassy Watermelon",
    baseExp: 19078,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/6/63/FarmCrop114.png"
  },
  {
    name: "Glassy Shrimp",
    baseExp: 23846,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/b4/FarmCrop115.png"
  },
  {
    name: "Glassy Rose",
    baseExp: 29807,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/a/a7/FarmCrop116.png"
  },
  {
    name: "Glassy Lettuce",
    baseExp: 37257,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/8/8a/FarmCrop117.png"
  },
  {
    name: "Glassy Onigiri",
    baseExp: 46571,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/e9/FarmCrop118.png"
  },
  {
    name: "Glassy Corn",
    baseExp: 58212,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/1/1e/FarmCrop119.png"
  },
  {
    name: "Red Glassy Bananas",
    baseExp: 72764,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/26/FarmCrop120.png"
  },
  {
    name: "Red Glassy Mango",
    baseExp: 90954,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/b6/FarmCrop121.png"
  },
  {
    name: "Red Glassy Broccoli",
    baseExp: 113691,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/b4/FarmCrop122.png"
  },
  {
    name: "Red Glassy Carrot",
    baseExp: 142113,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/b9/FarmCrop123.png"
  },
  {
    name: "Red Glassy Tomato",
    baseExp: 177640,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/5/58/FarmCrop124.png"
  },
  {
    name: "Red Glassy Watermelon",
    baseExp: 222049,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/c/c4/FarmCrop125.png"
  },
  {
    name: "Red Glassy Shrimp",
    baseExp: 277560,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/eb/FarmCrop126.png"
  },
  {
    name: "Red Glassy Rose",
    baseExp: 346949,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/f/f0/FarmCrop127.png"
  },
  {
    name: "Red Glassy Onigiri",
    baseExp: 433685,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/1/1a/FarmCrop128.png"
  },
  {
    name: "Red Glassy Corn",
    baseExp: 542106,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/2e/FarmCrop129.png"
  },
  {
    name: "Green Glassy Bananas",
    baseExp: 677631,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/a/a4/FarmCrop130.png"
  },
  {
    name: "Green Glassy Mango",
    baseExp: 847037,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/e1/FarmCrop131.png"
  },
  {
    name: "Green Glassy Broccoli",
    baseExp: 1058796,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/d/d2/FarmCrop132.png"
  },
  {
    name: "Green Glassy Carrot",
    baseExp: 1323493,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/c/c3/FarmCrop133.png"
  },
  {
    name: "Green Glassy Tomato",
    baseExp: 1654366,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/0/03/FarmCrop134.png"
  },
  {
    name: "Green Glassy Watermelon",
    baseExp: 2067956,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/0/06/FarmCrop135.png"
  },
  {
    name: "Green Glassy Shrimp",
    baseExp: 2584944,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/8/85/FarmCrop136.png"
  },
  {
    name: "Green Glassy Rose",
    baseExp: 3231179,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/6/6d/FarmCrop137.png"
  },
  {
    name: "Green Glassy Onigiri",
    baseExp: 4038972,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/f/f5/FarmCrop138.png"
  },
  {
    name: "Green Glassy Corn",
    baseExp: 5048714,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/9/9c/FarmCrop139.png"
  },
  {
    name: "White Glassy Bananas",
    baseExp: 6310892,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/3/3c/FarmCrop140.png"
  },
  {
    name: "White Glassy Mango",
    baseExp: 7888614,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/b1/FarmCrop141.png"
  },
  {
    name: "White Glassy Broccoli",
    baseExp: 9860766,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/7e/FarmCrop142.png"
  },
  {
    name: "White Glassy Carrot",
    baseExp: 12325956,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/e4/FarmCrop143.png"
  },
  {
    name: "White Glassy Tomato",
    baseExp: 15407444,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/c/c0/FarmCrop144.png"
  },
  {
    name: "White Glassy Watermelon",
    baseExp: 19259304,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/7a/FarmCrop145.png"
  },
  {
    name: "White Glassy Shrimp",
    baseExp: 24074129,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/c/cc/FarmCrop146.png"
  },
  {
    name: "White Glassy Rose",
    baseExp: 30092660,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/d/d4/FarmCrop147.png"
  },
  {
    name: "White Glassy Onigiri",
    baseExp: 37615824,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/9/96/FarmCrop148.png"
  },
  {
    name: "White Glassy Corn",
    baseExp: 47019779,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/7a/FarmCrop149.png"
  },
  {
    name: "Rainbow Glassy Bananas",
    baseExp: 58774722,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/a/a1/FarmCrop150.png"
  },
  {
    name: "Rainbow Glassy Mango",
    baseExp: 73468401,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/3/31/FarmCrop151.png"
  },
  {
    name: "Rainbow Glassy Broccoli",
    baseExp: 91835501,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/3/34/FarmCrop152.png"
  },
  {
    name: "Rainbow Glassy Carrot",
    baseExp: 114794375,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/6/63/FarmCrop153.png"
  },
  {
    name: "Rainbow Glassy Tomato",
    baseExp: 143492967,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/d/d1/FarmCrop154.png"
  },
  {
    name: "Rainbow Glassy Watermelon",
    baseExp: 179366208,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/6/68/FarmCrop155.png"
  },
  {
    name: "Rainbow Glassy Shrimp",
    baseExp: 224207759,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/1/18/FarmCrop156.png"
  },
  {
    name: "Rainbow Glassy Rose",
    baseExp: 280259697,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/5/5c/FarmCrop157.png"
  },
  {
    name: "Rainbow Glassy Onigiri",
    baseExp: 350324621,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/5/57/FarmCrop158.png"
  },
  {
    name: "Rainbow Glassy Corn",
    baseExp: 437905775,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/b3/FarmCrop159.png"
  },
  {
    name: "Yellow Glassy Bananas",
    baseExp: 547382217,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/d/dc/FarmCrop160.png"
  },
  {
    name: "Yellow Glassy Mango",
    baseExp: 684227770,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/25/FarmCrop161.png"
  },
  {
    name: "Yellow Glassy Broccoli",
    baseExp: 855284712,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/9/9f/FarmCrop162.png"
  },
  {
    name: "Yellow Glassy Carrot",
    baseExp: 1069105889,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/9/99/FarmCrop163.png"
  },
  {
    name: "Yellow Glassy Tomato",
    baseExp: 1336382360,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/5/5b/FarmCrop164.png"
  },
  {
    name: "Yellow Glassy Watermelon",
    baseExp: 1670477948,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/e0/FarmCrop165.png"
  },
  {
    name: "Yellow Glassy Shrimp",
    baseExp: 2088097434,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/9/92/FarmCrop166.png"
  },
  {
    name: "Yellow Glassy Rose",
    baseExp: 2610121792,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/3/35/FarmCrop167.png"
  },
  {
    name: "Yellow Glassy Onigiri",
    baseExp: 3262652238,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/d/d8/FarmCrop168.png"
  },
  {
    name: "Yellow Glassy Corn",
    baseExp: 4078315297,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/e4/FarmCrop169.png"
  },
  {
    name: "Bright Blue Glassy Bananas",
    baseExp: 5097894120,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/f/f5/FarmCrop170.png"
  },
  {
    name: "Bright Blue Glassy Mango",
    baseExp: 6372367649,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/76/FarmCrop171.png"
  },
  {
    name: "Bright Blue Glassy Broccoli",
    baseExp: 7965459560,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/0/01/FarmCrop172.png"
  },
  {
    name: "Bright Blue Glassy Carrot",
    baseExp: 9956824449,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/e9/FarmCrop173.png"
  },
  {
    name: "Bright Blue Glassy Tomato",
    baseExp: 12446030560,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/5/50/FarmCrop174.png"
  },
  {
    name: "Bright Blue Glassy Watermelon",
    baseExp: 15557538199,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/a/aa/FarmCrop175.png"
  },
  {
    name: "Bright Blue Glassy Shrimp",
    baseExp: 19446922748,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/26/FarmCrop176.png"
  },
  {
    name: "Bright Blue Glassy Rose",
    baseExp: 24308653434,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/d/dd/FarmCrop177.png"
  },
  {
    name: "Bright Blue Glassy Onigiri",
    baseExp: 30385816791,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/4/45/FarmCrop178.png"
  },
  {
    name: "Bright Blue Glassy Corn",
    baseExp: 37982270988,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/20/FarmCrop179.png"
  },
  {
    name: "Dark Glassy Bananas",
    baseExp: 47477838733,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/d/d2/FarmCrop180.png"
  },
  {
    name: "Dark Glassy Mango",
    baseExp: 59347298415,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/f/f9/FarmCrop181.png"
  },
  {
    name: "Dark Glassy Broccoli",
    baseExp: 74184123018,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/77/FarmCrop182.png"
  },
  {
    name: "Dark Glassy Carrot",
    baseExp: 92730153772,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/8/82/FarmCrop183.png"
  },
  {
    name: "Dark Glassy Tomato",
    baseExp: 115912692213,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/1/1d/FarmCrop184.png"
  },
  {
    name: "Dark Glassy Watermelon",
    baseExp: 144890865266,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/7e/FarmCrop185.png"
  },
  {
    name: "Dark Glassy Shrimp",
    baseExp: 181113581581,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/a/a3/FarmCrop186.png"
  },
  {
    name: "Dark Glassy Rose",
    baseExp: 226391976975,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/5/53/FarmCrop187.png"
  },
  {
    name: "Dark Glassy Onigiri",
    baseExp: 282989971218,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/e2/FarmCrop188.png"
  },
  {
    name: "Dark Glassy Corn",
    baseExp: 353737464021,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/78/FarmCrop189.png"
  },
  {
    name: "Bright Green Glassy Bananas",
    baseExp: 442171830025,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/6/68/FarmCrop190.png"
  },
  {
    name: "Bright Green Glassy Mango",
    baseExp: 552714787531,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/0/05/FarmCrop191.png"
  },
  {
    name: "Bright Green Glassy Broccoli",
    baseExp: 690893484412,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/b4/FarmCrop192.png"
  },
  {
    name: "Bright Green Glassy Carrot",
    baseExp: 863616855514,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/8/81/FarmCrop193.png"
  },
  {
    name: "Bright Green Glassy Tomato",
    baseExp: 1079521069391,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/3/3a/FarmCrop194.png"
  },
  {
    name: "Bright Green Glassy Watermelon",
    baseExp: 1349401336738,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/3/35/FarmCrop195.png"
  },
  {
    name: "Bright Green Glassy Shrimp",
    baseExp: 1686751670921,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/8/85/FarmCrop196.png"
  },
  {
    name: "Bright Green Glassy Rose",
    baseExp: 2108439588651,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/7a/FarmCrop197.png"
  },
  {
    name: "Bright Green Glassy Onigiri",
    baseExp: 2635549485812,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/b1/FarmCrop198.png"
  },
  {
    name: "Bright Green Glassy Corn",
    baseExp: 3294436857264,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/0/0e/FarmCrop199.png"
  },
  {
    name: "Light Glassy Bananas",
    baseExp: 4118046071579,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/9/91/FarmCrop200.png"
  },
  {
    name: "Light Glassy Mango",
    baseExp: 5147557589473,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/a/a5/FarmCrop201.png"
  },
  {
    name: "Light Glassy Broccoli",
    baseExp: 6434446986840,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/1/1d/FarmCrop202.png"
  },
  {
    name: "Light Glassy Carrot",
    baseExp: 8043058733548,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/2f/FarmCrop203.png"
  },
  {
    name: "Light Glassy Tomato",
    baseExp: 10053823416934,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/78/FarmCrop204.png"
  },
  {
    name: "Light Glassy Watermelon",
    baseExp: 12567279271167,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/5/5f/FarmCrop205.png"
  },
  {
    name: "Light Glassy Shrimp",
    baseExp: 15709099088957,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/f/f7/FarmCrop206.png"
  },
  {
    name: "Light Glassy Rose",
    baseExp: 19636373861195,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/6/63/FarmCrop207.png"
  },
  {
    name: "Light Glassy Onigiri",
    baseExp: 24545467326493,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/72/FarmCrop208.png"
  },
  {
    name: "Light Glassy Corn",
    baseExp: 30681834158115,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/8/80/FarmCrop209.png"
  },
  {
    name: "Blue Glassy Bananas",
    baseExp: 38352292697643,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/c/c7/FarmCrop210.png"
  },
  {
    name: "Blue Glassy Mango",
    baseExp: 47940365872053,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/e/eb/FarmCrop211.png"
  },
  {
    name: "Blue Glassy Broccoli",
    baseExp: 59925457340065,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/bf/FarmCrop212.png"
  },
  {
    name: "Blue Glassy Carrot",
    baseExp: 74906821675080,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/20/FarmCrop213.png"
  },
  {
    name: "Blue Glassy Tomato",
    baseExp: 93633527093848,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/5/52/FarmCrop214.png"
  },
  {
    name: "Blue Glassy Watermelon",
    baseExp: 11704190886731,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/f/f4/FarmCrop215.png"
  },
  {
    name: "Blue Glassy Shrimp",
    baseExp: 14630238608414,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/7/7f/FarmCrop216.png"
  },
  {
    name: "Blue Glassy Rose",
    baseExp: 18287798260517,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/2f/FarmCrop217.png"
  },
  {
    name: "Blue Glassy Onigiri",
    baseExp: 22859747825646,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/21/FarmCrop218.png"
  },
  {
    name: "Blue Glassy Corn",
    baseExp: 28574684782057,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/9/90/FarmCrop219.png"
  },
  {
    name: "Orange Glassy Bananas",
    baseExp: 35718355977572,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/2/2a/FarmCrop220.png"
  },
  {
    name: "Orange Glassy Mango",
    baseExp: 44647944971964,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/f/f6/FarmCrop221.png"
  },
  {
    name: "Orange Glassy Broccoli",
    baseExp: 55809931214955,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/b/b6/FarmCrop222.png"
  },
  {
    name: "Orange Glassy Carrot",
    baseExp: 69762414018694,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/8/81/FarmCrop223.png"
  },
  {
    name: "Orange Glassy Tomato",
    baseExp: 87203017523367,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/a/a4/FarmCrop224.png"
  },
  {
    name: "Orange Glassy Watermelon",
    baseExp: 10900377190421,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/6/6b/FarmCrop225.png"
  },
  {
    name: "Orange Glassy Shrimp",
    baseExp: 13625471488026,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/1/1a/FarmCrop226.png"
  },
  {
    name: "Orange Glassy Rose",
    baseExp: 17031839360033,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/9/96/FarmCrop227.png"
  },
  {
    name: "Orange Glassy Onigiri",
    baseExp: 21289799200041,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/a/a3/FarmCrop228.png"
  },
  {
    name: "Orange Glassy Corn",
    baseExp: 26612249000051,
    growthTime: "1D 6H 22M 30S",
    image: "https://idleon.wiki/images/1/15/FarmCrop229.png"
  }
], // cropType 5: Glassy
  [
  {
    name: "Medal 1",
    baseExp: 9605,
    growthTime: "7H",
    image: "https://idleon.wiki/images/a/a3/FarmCrop230.png"
  },
  {
    name: "Medal 2",
    baseExp: 12005,
    growthTime: "7H",
    image: "https://idleon.wiki/images/1/19/FarmCrop231.png"
  },
  {
    name: "Medal 3",
    baseExp: 15005,
    growthTime: "7H",
    image: "https://idleon.wiki/images/9/97/FarmCrop232.png"
  },
  {
    name: "Medal 4",
    baseExp: 18755,
    growthTime: "7H",
    image: "https://idleon.wiki/images/b/bb/FarmCrop233.png"
  },
  {
    name: "Medal 5",
    baseExp: 23442,
    growthTime: "7H",
    image: "https://idleon.wiki/images/6/6e/FarmCrop234.png"
  },
  {
    name: "Medal 6",
    baseExp: 29301,
    growthTime: "7H",
    image: "https://idleon.wiki/images/1/1d/FarmCrop235.png"
  },
  {
    name: "Medal 7",
    baseExp: 36626,
    growthTime: "7H",
    image: "https://idleon.wiki/images/0/0e/FarmCrop236.png"
  },
  {
    name: "Medal 8",
    baseExp: 45781,
    growthTime: "7H",
    image: "https://idleon.wiki/images/1/16/FarmCrop237.png"
  },
  {
    name: "Medal 9",
    baseExp: 57225,
    growthTime: "7H",
    image: "https://idleon.wiki/images/6/6e/FarmCrop238.png"
  },
  {
    name: "Medal 10",
    baseExp: 71530,
    growthTime: "7H",
    image: "https://idleon.wiki/images/2/2a/FarmCrop239.png"
  },
  {
    name: "Medal 11",
    baseExp: 89411,
    growthTime: "7H",
    image: "https://idleon.wiki/images/2/21/FarmCrop240.png"
  },
  {
    name: "Medal 12",
    baseExp: 111763,
    growthTime: "7H",
    image: "https://idleon.wiki/images/f/fa/FarmCrop241.png"
  },
  {
    name: "Medal 13",
    baseExp: 139703,
    growthTime: "7H",
    image: "https://idleon.wiki/images/9/91/FarmCrop242.png"
  },
  {
    name: "Medal 14",
    baseExp: 174627,
    growthTime: "7H",
    image: "https://idleon.wiki/images/9/9c/FarmCrop243.png"
  },
  {
    name: "Medal 15",
    baseExp: 218283,
    growthTime: "7H",
    image: "https://idleon.wiki/images/9/9a/FarmCrop244.png"
  },
  {
    name: "Medal 16",
    baseExp: 272853,
    growthTime: "7H",
    image: "https://idleon.wiki/images/e/e6/FarmCrop245.png"
  },
  {
    name: "Medal 17",
    baseExp: 341065,
    growthTime: "7H",
    image: "https://idleon.wiki/images/2/28/FarmCrop246.png"
  },
  {
    name: "Medal 18",
    baseExp: 426330,
    growthTime: "7H",
    image: "https://idleon.wiki/images/c/c0/FarmCrop247.png"
  },
  {
    name: "Medal 19",
    baseExp: 532912,
    growthTime: "7H",
    image: "https://idleon.wiki/images/0/07/FarmCrop248.png"
  },
  {
    name: "Medal 20",
    baseExp: 666138,
    growthTime: "7H",
    image: "https://idleon.wiki/images/c/c3/FarmCrop249.png"
  },
  {
    name: "Medal 21",
    baseExp: 832672,
    growthTime: "7H",
    image: "https://idleon.wiki/images/5/5b/FarmCrop250.png"
  },
  {
    name: "Medal 22",
    baseExp: 1040839,
    growthTime: "7H",
    image: "https://idleon.wiki/images/8/8c/FarmCrop251.png"
  },
  {
    name: "Medal 23",
    baseExp: 1301047,
    growthTime: "7H",
    image: "https://idleon.wiki/images/5/54/FarmCrop252.png"
  },
  {
    name: "Medal 24",
    baseExp: 1626308,
    growthTime: "7H",
    image: "https://idleon.wiki/images/8/8d/FarmCrop253.png"
  },
  {
    name: "Medal 25",
    baseExp: 2032884,
    growthTime: "7H",
    image: "https://idleon.wiki/images/c/c3/FarmCrop254.png"
  },
  {
    name: "Medal 26",
    baseExp: 2541103,
    growthTime: "7H",
    image: "https://idleon.wiki/images/d/db/FarmCrop255.png"
  },
  {
    name: "Medal 27",
    baseExp: 3176378,
    growthTime: "7H",
    image: "https://idleon.wiki/images/e/ef/FarmCrop256.png"
  },
  {
    name: "Medal 28",
    baseExp: 3970471,
    growthTime: "7H",
    image: "https://idleon.wiki/images/3/3b/FarmCrop257.png"
  },
  {
    name: "Medal 29",
    baseExp: 4963088,
    growthTime: "7H",
    image: "https://idleon.wiki/images/7/73/FarmCrop258.png"
  },
  {
    name: "Medal 30",
    baseExp: 6203859,
    growthTime: "7H",
    image: "https://idleon.wiki/images/5/53/FarmCrop259.png"
  },
  {
    name: "Medal 31",
    baseExp: 7754823,
    growthTime: "7H",
    image: "https://idleon.wiki/images/2/2f/FarmCrop260.png"
  },
  {
    name: "Medal 32",
    baseExp: 9693527,
    growthTime: "7H",
    image: "https://idleon.wiki/images/4/44/FarmCrop261.png"
  },
  {
    name: "Medal 33",
    baseExp: 12116908,
    growthTime: "7H",
    image: "https://idleon.wiki/images/c/c8/FarmCrop262.png"
  },
  {
    name: "Medal 34",
    baseExp: 15146134,
    growthTime: "7H",
    image: "https://idleon.wiki/images/f/f3/FarmCrop263.png"
  },
  {
    name: "Medal 35",
    baseExp: 18932666,
    growthTime: "7H",
    image: "https://idleon.wiki/images/4/4e/FarmCrop264.png"
  },
  {
    name: "Medal 36",
    baseExp: 23665832,
    growthTime: "7H",
    image: "https://idleon.wiki/images/d/df/FarmCrop265.png"
  },
  {
    name: "Medal 37",
    baseExp: 29582288,
    growthTime: "7H",
    image: "https://idleon.wiki/images/a/ae/FarmCrop266.png"
  },
  {
    name: "Medal 38",
    baseExp: 36977859,
    growthTime: "7H",
    image: "https://idleon.wiki/images/a/ad/FarmCrop267.png"
  },
  {
    name: "Medal 39",
    baseExp: 46222323,
    growthTime: "7H",
    image: "https://idleon.wiki/images/d/d8/FarmCrop268.png"
  },
  {
    name: "Medal 40",
    baseExp: 57777903,
    growthTime: "7H",
    image: "https://idleon.wiki/images/9/96/FarmCrop269.png"
  },
  {
    name: "Medal 41",
    baseExp: 72222377,
    growthTime: "7H",
    image: "https://idleon.wiki/images/0/09/FarmCrop270.png"
  },
  {
    name: "Medal 42",
    baseExp: 90277971,
    growthTime: "7H",
    image: "https://idleon.wiki/images/e/e9/FarmCrop271.png"
  },
  {
    name: "Medal 43",
    baseExp: 112847462,
    growthTime: "7H",
    image: "https://idleon.wiki/images/d/d4/FarmCrop272.png"
  },
  {
    name: "Medal 44",
    baseExp: 141059327,
    growthTime: "7H",
    image: "https://idleon.wiki/images/8/87/FarmCrop273.png"
  },
  {
    name: "Medal 45",
    baseExp: 176324157,
    growthTime: "7H",
    image: "https://idleon.wiki/images/8/81/FarmCrop274.png"
  },
  {
    name: "Medal 46",
    baseExp: 220405195,
    growthTime: "7H",
    image: "https://idleon.wiki/images/c/c7/FarmCrop275.png"
  },
  {
    name: "Medal 47",
    baseExp: 275506493,
    growthTime: "7H",
    image: "https://idleon.wiki/images/f/f4/FarmCrop276.png"
  },
  {
    name: "Medal 48",
    baseExp: 344383115,
    growthTime: "7H",
    image: "https://idleon.wiki/images/f/f4/FarmCrop277.png"
  },
  {
    name: "Medal 49",
    baseExp: 430478893,
    growthTime: "7H",
    image: "https://idleon.wiki/images/e/e0/FarmCrop278.png"
  },
  {
    name: "Medal 50",
    baseExp: 538098615,
    growthTime: "7H",
    image: "https://idleon.wiki/images/8/8b/FarmCrop279.png"
  },
  {
    name: "Medal 51",
    baseExp: 672623267,
    growthTime: "7H",
    image: "https://idleon.wiki/images/9/91/FarmCrop280.png"
  },
  {
    name: "Medal 52",
    baseExp: 840779083,
    growthTime: "7H",
    image: "https://idleon.wiki/images/1/16/FarmCrop281.png"
  },
  {
    name: "Medal 53",
    baseExp: 1050973853,
    growthTime: "7H",
    image: "https://idleon.wiki/images/e/ed/FarmCrop282.png"
  },
  {
    name: "Medal 54",
    baseExp: 1313717315,
    growthTime: "7H",
    image: "https://idleon.wiki/images/5/59/FarmCrop283.png"
  },
  {
    name: "Medal 55",
    baseExp: 1642146642,
    growthTime: "7H",
    image: "https://idleon.wiki/images/f/f5/FarmCrop284.png"
  },
  {
    name: "Medal 56",
    baseExp: 2052683302,
    growthTime: "7H",
    image: "https://idleon.wiki/images/e/e6/FarmCrop285.png"
  },
  {
    name: "Medal 57",
    baseExp: 2565854126,
    growthTime: "7H",
    image: "https://idleon.wiki/images/e/e0/FarmCrop286.png"
  },
  {
    name: "Medal 58",
    baseExp: 3207317657,
    growthTime: "7H",
    image: "https://idleon.wiki/images/a/aa/FarmCrop287.png"
  },
  {
    name: "Medal 59",
    baseExp: 4009147070,
    growthTime: "7H",
    image: "https://idleon.wiki/images/c/c2/FarmCrop288.png"
  },
  {
    name: "Medal 60",
    baseExp: 5011433836,
    growthTime: "7H",
    image: "https://idleon.wiki/images/7/7e/FarmCrop289.png"
  },
  {
    name: "Medal 61",
    baseExp: 6264292294,
    growthTime: "7H",
    image: "https://idleon.wiki/images/3/3d/FarmCrop290.png"
  },
  {
    name: "Medal 62",
    baseExp: 7830365366,
    growthTime: "7H",
    image: "https://idleon.wiki/images/d/d8/FarmCrop291.png"
  },
  {
    name: "Medal 63",
    baseExp: 9787956706,
    growthTime: "7H",
    image: "https://idleon.wiki/images/c/c0/FarmCrop292.png"
  },
  {
    name: "Medal 64",
    baseExp: 12234945882,
    growthTime: "7H",
    image: "https://idleon.wiki/images/a/a3/FarmCrop293.png"
  },
  {
    name: "Medal 65",
    baseExp: 15293682351,
    growthTime: "7H",
    image: "https://idleon.wiki/images/3/3f/FarmCrop294.png"
  },
  {
    name: "Medal 66",
    baseExp: 19117102938,
    growthTime: "7H",
    image: "https://idleon.wiki/images/1/1a/FarmCrop295.png"
  },
  {
    name: "Medal 67",
    baseExp: 23896378671,
    growthTime: "7H",
    image: "https://idleon.wiki/images/3/35/FarmCrop296.png"
  },
  {
    name: "Medal 68",
    baseExp: 29870473338,
    growthTime: "7H",
    image: "https://idleon.wiki/images/f/f9/FarmCrop297.png"
  },
  {
    name: "Medal 69",
    baseExp: 37338091672,
    growthTime: "7H",
    image: "https://idleon.wiki/images/c/c1/FarmCrop298.png"
  },
  {
    name: "Medal 70",
    baseExp: 46672614588,
    growthTime: "7H",
    image: "https://idleon.wiki/images/1/1f/FarmCrop299.png"
  }
]  // cropType 6: Medal
];

const cropTypes = [
    { image: "https://idleontoolbox.com/etc/Seed_0.png" },
    { image: "https://idleontoolbox.com/etc/Seed_1.png" },
    { image: "https://idleontoolbox.com/etc/Seed_2.png" },
    { image: "https://idleontoolbox.com/etc/Seed_3.png" },
    { image: "https://idleontoolbox.com/etc/Seed_4.png" },
    { image: "https://idleontoolbox.com/etc/Seed_5.png" },
    { image: "https://idleontoolbox.com/data/FarmCrop230.png" },
];

window.cropArray = cropArray;
window.cropTypes  = cropTypes;