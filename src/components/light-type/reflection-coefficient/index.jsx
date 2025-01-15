import { useState } from "react";
import { colorOptions } from "@/constants/dummy-data";

const ReflectionCoefficient = () => {
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
  };
  return (
    <div className="flex justify-between">
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
                  className="form-radio text-gray-600 h-4 w-4"
                />
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
