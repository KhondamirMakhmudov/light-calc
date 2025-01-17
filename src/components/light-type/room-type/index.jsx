import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useState } from "react";
import { get } from "lodash";
import { useRoomContext } from "@/context/roomTypeProvider";

const RoomType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setRoomLK } = useRoomContext();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.listOfROoms,
    url: URLS.listOfROoms,
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (room) => {
    setSelectedRoom(room);
    setIsOpen(false);
    setRoomLK(room.lk);
    // Trigger callback with selected room
  };
  return (
    <div className="relative inline-block text-base">
      <h5 className={"text-lg font-semibold"}>Тип помещения</h5>
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
        <ul className="absolute mt-2 w-full bg-white z-50 border rounded shadow-md max-h-[200px] overflow-y-auto">
          {get(data, "data", []).map((room) => (
            <li
              key={room.id}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(room)}
            >
              <p>{room.title}</p>
              <p className="hidden">{room.lk}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomType;
