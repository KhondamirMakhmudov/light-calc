import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useState } from "react";
import { get } from "lodash";

const roomTypes = [
  { id: 1, name: "Одноместный" }, // Single Room
  { id: 2, name: "Двухместный" }, // Double Room
  { id: 3, name: "Трехместный" }, // Triple Room
  { id: 4, name: "Люкс" }, // Suite
  { id: 5, name: "Семейный" }, // Family Room
  { id: 6, name: "Дормитория" }, // Dormitory
  { id: 7, name: "Апартаменты" }, // Apartment
  { id: 8, name: "Студия" }, // Studio
  { id: 9, name: "Дуплекс" }, // Duplex
];

const RoomType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.listOfROoms,
    url: URLS.listOfROoms,
  });

  console.log(data);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (room) => {
    setSelectedRoom(room);
    setIsOpen(false);
    // Trigger callback with selected room
  };
  return (
    <div className="relative ">
      <h5 className={"text-sm"}>Тип помещения</h5>
      {/* Dropdown Trigger */}
      <div
        className={
          "py-[10px] px-[50px] border border-black  rounded my-[15px]  transition-all duration-300 cursor-pointer"
        }
        onClick={toggleDropdown}
      >
        <span>
          {selectedRoom ? selectedRoom.title : "Выберите тип комнаты"}
        </span>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white border rounded shadow-md max-h-[200px] overflow-y-auto">
          {get(data, "data", []).map((room) => (
            <li
              key={room.id}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(room)}
            >
              {room.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomType;
