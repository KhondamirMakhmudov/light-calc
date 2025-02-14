import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useState } from "react";
import { get } from "lodash";
import SimpleLoader from "@/components/loader/simple-loader";

const RoomType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [treeId, setTreeId] = useState(null);

  // Fetch first dropdown data
  const { data: roomCategories, isLoading } = useGetQuery({
    key: KEYS.roomCategories,
    url: URLS.roomCategories,
  });

  // Fetch second dropdown data (depends on first selection)
  const { data: roomCategoriesGroup, isLoading: isLoadingGroup } = useGetQuery({
    key: [KEYS.roomCategoriesGroup, treeId],
    url: treeId ? `${URLS.roomCategoriesGroup}${treeId}/` : null,
    enabled: !!treeId,
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (room) => {
    setSelectedRoom(room);
    setTreeId(room.tree_id);
    setSelectedGroup(null); // Reset second selection on change
    setIsOpen(false);
  };

  const toggleDropdownGroup = () => {
    if (!selectedRoom) return; // Prevent opening if the first is not selected
    setIsOpenGroup(!isOpenGroup);
  };

  const handleSelectGroup = (room) => {
    setSelectedGroup(room);
    setIsOpenGroup(false);
  };

  if (isLoading) return <SimpleLoader />;

  return (
    <div className="flex my-8 gap-x-5 flex-wrap">
      {/* First Dropdown */}
      <div className="relative flex-col flex flex-wrap w-1/3 text-base">
        <h5 className="text-lg flex-1 font-semibold">Тип помещения</h5>
        <div
          className="py-2 px-6 border border-black rounded my-4 cursor-pointer"
          onClick={toggleDropdown}
        >
          <span>
            {selectedRoom ? selectedRoom.name : "Выберите тип комнаты"}
          </span>
        </div>

        {isOpen && (
          <ul className="absolute mt-0 w-full bg-white z-50 border rounded shadow-md max-h-52 overflow-y-auto">
            {get(roomCategories, "data", []).map((room) => (
              <li
                key={room.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(room)}
              >
                {room.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Second Dropdown (Disabled if First Not Selected) */}
      <div className="relative w-1/3 text-base">
        <h5 className="text-lg font-semibold">
          Наименование зрительной работы и вида деятельности
        </h5>
        <div
          className={`py-2 px-6 border rounded my-4 transition-all duration-300 cursor-pointer ${
            !selectedRoom
              ? "border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed"
              : "border-black"
          }`}
          onClick={toggleDropdownGroup}
        >
          <span>
            {selectedGroup ? selectedGroup.name : "Выберите категорию"}
          </span>
        </div>

        {isOpenGroup && selectedRoom && (
          <ul className="absolute mt-0 w-full bg-white z-50 border rounded shadow-md max-h-52 overflow-y-auto">
            {get(roomCategoriesGroup, "data", []).map((room) => (
              <li
                key={room.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectGroup(room)}
              >
                {room.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RoomType;
