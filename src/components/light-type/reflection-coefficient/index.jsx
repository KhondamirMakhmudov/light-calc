import { useState } from "react";
import { colorOptions } from "@/constants/dummy-data";

const ReflectionCoefficient = ({ onSelectionChange }) => {
  const [selected, setSelected] = useState({
    потолка: "white",
    стен: "white",
    пола: "dark",
  });

  const handleSelection = (group, value) => {
    const updatedSelection = { ...selected, [group]: value };

    // Update related groups if `потолка` is changed
    if (group === "потолка") {
      const related = colorOptions.потолка.find(
        (option) => option.value === value
      )?.related;
      if (related) {
        updatedSelection.стен = related.стен;
        updatedSelection.пола = related.пола;
      }
    }

    setSelected(updatedSelection);

    // Extract numbers from selected options
    const selectedNumbers = Object.entries(updatedSelection).reduce(
      (acc, [key, value]) => {
        const label = colorOptions[key].find(
          (option) => option.value === value
        )?.label;
        const numberInBrackets = label.match(/\((\d+)\)/)?.[1];
        if (numberInBrackets) {
          acc[key] = parseInt(numberInBrackets, 10);
        }
        return acc;
      },
      {}
    );

    // Call the callback prop with selected numbers
    if (onSelectionChange) {
      onSelectionChange(selectedNumbers);
    }
  };

  return (
    <div className="flex gap-[20px] lg:justify-between flex-wrap">
      {Object.entries(colorOptions).map(([group, options]) => (
        <div key={group} className="mt-3">
          <h4 className="text-lg font-semibold">{`цвет ${group}`}</h4>
          {options.map((option) => (
            <div key={option.value} className="flex items-center mb-2 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={group}
                  value={option.value}
                  checked={selected[group] === option.value}
                  onChange={() => handleSelection(group, option.value)}
                  className="hidden peer" // Hides the default radio button
                />
                <div className="w-5 h-5 border-2 border-gray-600 rounded-full peer-checked:bg-black peer-checked:border-white"></div>
                <span className="ml-2 text-black text-lg">{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReflectionCoefficient;
