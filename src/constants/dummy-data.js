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
