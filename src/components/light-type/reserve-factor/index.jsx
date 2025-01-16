import { safetyFactorData } from "@/constants/dummy-data";
import { useState } from "react";

const SafetyFactorComponent = () => {
  const [safety, setSafety] = useState(1.4);
  const [isOpen, setIsOpen] = useState(false);
  const [openSafety, setOpenSafety] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const setSafetyFactor = (safety) => {
    setSafety(safety);
  };

  const handleSelect = (room) => {
    setSelectedCondition(room);
    setIsOpen(false);
  };
  return (
    <div className={"mt-[15px]"}>
      <h5>коэффициент запаса</h5>

      <div className="relative block">
        {/* Dropdown Trigger */}
        <div
          className={
            "py-[10px] px-[50px] border border-black  rounded my-[15px] text-center  transition-all duration-300 cursor-pointer w-full"
          }
          onClick={toggleDropdown}
        >
          <span>
            {selectedCondition ? selectedCondition.title : "Выберите"}
          </span>
        </div>

        {/* Dropdown List */}
        {isOpen && (
          <ul className="absolute mt-2 w-full bg-white border rounded shadow-md max-h-[200px] overflow-y-auto">
            {safetyFactorData.map((room) => (
              <li
                key={room.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(room)}
              >
                <p>{room.title}</p>
                <p className="hidden">{room.sf}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={"my-[15px] flex gap-x-[20px] items-center"}>
        <button
          onClick={() => setSafetyFactor(1.4)}
          className={`text-xl border py-1 px-2 ${
            selectedCondition?.sf === 1.25
              ? "bg-black text-white"
              : "bg-white text-black"
          } `}
        >
          <p>1.25</p>
        </button>

        <button
          onClick={() => setSafetyFactor(1.6)}
          className={`text-xl border py-1 px-2 ${
            selectedCondition?.sf === 1.5
              ? "bg-black text-white"
              : "bg-white text-black"
          } `}
        >
          <p>1.5</p>
        </button>

        <button
          onClick={() => setSafetyFactor(1.7)}
          className={`text-xl border py-1 px-2 ${
            selectedCondition?.sf === 2.0
              ? "bg-black text-white"
              : "bg-white text-black"
          } `}
        >
          <p>2.0</p>
        </button>
      </div>
    </div>
  );
};

export default SafetyFactorComponent;
