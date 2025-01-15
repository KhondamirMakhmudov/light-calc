export const allServices = [
  {
    id: 1,
    title: "калькулятор освещенности",
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
    title: "калькулятор теплоизоляции",
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
    title: "Калькулятор  зелёного строительства.",
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
