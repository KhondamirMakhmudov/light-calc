export const allServices = [
  {
    id: 1,
    title: "Калькулятор освещенности",
    desc: "Быстрый расчет количества светильников для вашего проекта.",
    url: "/light-calculator",
  },
  {
    id: 2,
    title: "Калькулятор отопление",
    desc: "позволяет оценить потенциальные теплопотери в здании и ожидаемые затраты на отопление.",
    url: "/calculator-heating",
  },
  {
    id: 3,
    title: "Калькулятор теплоизоляции",
    desc: "Расчет применяется для отапливаемых эксплуатируемых помещений",
    url: "/thermal-insulation-calculator",
  },
  {
    id: 4,
    title: "Калькулятор расчета кровли",
    desc: "Удобный в использовании калькулятор кровли предназначен для определения конкретного количества материала, необходимого для устройства кровли, в том числе доборных и комплектующих элементов.",
    url: "/roofing-calculator",
  },

  {
    id: 5,
    title: "Калькулятор  зелёного строительства",
    url: "/green-building-calculator",
  },
];

export const colorOptions = {
  потолка: [
    {
      value: "white",
      label: "белый (80)",
      related: { стен: "white", пола: "dark" },
    },
    {
      value: "very-light",
      label: "очень светлый (70)",
      related: { стен: "light", пола: "very-dark" },
    },
    {
      value: "light",
      label: "светлый (50)",
      related: { стен: "light", пола: "black" },
    },
    {
      value: "dark",
      label: "тёмный (30)",
      related: { стен: "dark", пола: "black" },
    },
  ],
  стен: [
    { value: "white", label: "белый (80)" },
    { value: "light", label: "светлый (50)" },
    { value: "dark", label: "тёмный (30)" },
  ],
  пола: [
    { value: "dark", label: "тёмный (30)" },
    { value: "very-dark", label: "очень тёмный (20)" },
    { value: "black", label: "чёрный (10)" },
  ],
};

export const colorOptionsUz = {
  shift: [
    {
      value: "oq",
      label: "Oq (80)",
      related: { devor: "oq", pol: "qorong'i" },
    },
    {
      value: "juda-yorug'",
      label: "Juda yorug' (70)",
      related: { devor: "yorug'", pol: "juda-qorong'i" },
    },
    {
      value: "yorug'",
      label: "Yorug' (50)",
      related: { devor: "yorug'", pol: "qora" },
    },
    {
      value: "qorong'i",
      label: "Qorong'i (30)",
      related: { devor: "qorong'i", pol: "qora" },
    },
  ],
  devor: [
    { value: "oq", label: "Oq (80)" },
    { value: "yorug'", label: "Yorug' (50)" },
    { value: "qorong'i", label: "Qorong'i (30)" },
  ],
  pol: [
    { value: "qorong'i", label: "Qorong'i (30)" },
    { value: "juda-qorong'i", label: "Juda qorong'i (20)" },
    { value: "qora", label: "Qora (10)" },
  ],
};

export const colorOptionsEn = {
  ceiling: [
    {
      value: "white",
      label: "White (80)",
      related: { wall: "white", floor: "dark" },
    },
    {
      value: "very-light",
      label: "Very light (70)",
      related: { wall: "light", floor: "very-dark" },
    },
    {
      value: "light",
      label: "Light (50)",
      related: { wall: "light", floor: "black" },
    },
    {
      value: "dark",
      label: "Dark (30)",
      related: { wall: "dark", floor: "black" },
    },
  ],
  wall: [
    { value: "white", label: "White (80)" },
    { value: "light", label: "Light (50)" },
    { value: "dark", label: "Dark (30)" },
  ],
  floor: [
    { value: "dark", label: "Dark (30)" },
    { value: "very-dark", label: "Very dark (20)" },
    { value: "black", label: "Black (10)" },
  ],
};

export const safetyFactorData = [
  {
    id: 1,
    title: "Запыленность свыше 5 мг/м3",
    sf: 1.5,
  },
  {
    id: 2,
    title: "Дым, копоть 1-5 мг/м3",
    sf: 1.3,
  },
  {
    id: 3,
    title: "Менее 1 мг/м3 Значительная концентрация паров кислот и щелочей",
    sf: 1.1,
  },
  {
    id: 3,
    title:
      "Запыленность значительно менее 1 мг/м3, отсутствие паров кислот и щелочей",
    sf: 1.0,
  },
];

export const themesUz = [
  { id: "round", name: "Думалоқ" },
  { id: "square", name: "Тўртбурчак" },
  { id: "linear", name: "Чизиқли" },
];

export const themesRu = [
  { id: "round", name: "Круглый" },
  { id: "square", name: "Четырёхугольник" },
  { id: "linear", name: "Линейный" },
];

export const themesEn = [
  { id: "round", name: "Round" },
  { id: "square", name: "Square" },
  { id: "linear", name: "Linear" },
];
