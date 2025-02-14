import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useState } from "react";
import { get } from "lodash";
import SimpleLoader from "@/components/loader/simple-loader";
import MinusIcon from "@/components/icons/minus";
import PlusIcon from "@/components/icons/plus";
import { themes } from "@/constants/dummy-data";

const RoomType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [treeId, setTreeId] = useState(null);
  const [formFactor, setFormFactor] = useState(null);
  const [isOpenFormFactor, setIsOpenFormFactor] = useState(false);

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

  // third api
  const secondGroupId = roomCategoriesGroup?.data?.[1]?.id || null;

  const {
    data: roomInfo,
    isLoading: isLoadingInfo,
    isFetching: isFetchingInfo,
  } = useGetQuery({
    key: [KEYS.roomInfo, secondGroupId], // Har safar 2-API yangilansa, 3-API ham yangilanadi
    url: secondGroupId ? `${URLS.roomInfo}${secondGroupId}` : null, // Faqat mavjud bo‘lsa chaqiriladi
    enabled: !!secondGroupId, // Ikkinchi selectdan hech narsa tanlanmasa, API ishlamaydi
  });

  console.log(roomInfo);

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

  const toggleDropdownFormFactor = () => setIsOpenFormFactor(!isOpenFormFactor);
  const handleSelectFormFactor = (theme) => {
    setFormFactor(theme);
    setIsOpenFormFactor(false);
  };

  if (isLoading) return <SimpleLoader />;

  return (
    <div>
      <div className="grid grid-cols-12 my-8 gap-x-5 flex-wrap">
        {/* First Dropdown */}
        <div className="relative flex-col flex flex-wrap col-span-6 text-base">
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
        <div className="relative flex-col flex flex-wrap col-span-6 text-base">
          <h5 className="text-lg flex-1 font-semibold">
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
      <div className="flex justify-between gap-x-[40px] items-center">
        <div>
          <h5 className="text-lg font-semibold">параметры освещения</h5>
          <div className={"flex"}>
            <div className={"mt-[15px] "}>
              <h5>освещенность</h5>

              <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                <button
                  className={"text-xl border rounded-full p-1 bg-[#272623]"}
                >
                  <MinusIcon color={"white"} />
                </button>

                <p>{get(roomInfo, "data[0].lk")} лк</p>

                <button
                  className={"text-xl border rounded-full p-1 bg-[#272623]"}
                >
                  <PlusIcon color={"white"} />
                </button>
              </div>
            </div>
          </div>{" "}
        </div>

        <div className="w-[1px] h-[100px] bg-gray-200"></div>

        <div>
          <h5 className="text-lg font-semibold">
            Ra(Индекса цвето передачи), не менее
          </h5>
          <div className={"flex items-center justify-center mt-[15px]"}>
            <div
              className={
                "my-[15px]  bg-black text-white text-center py-[10px] px-[20px] rounded-md inline-block"
              }
            >
              <p>{get(roomInfo, "data[0].ra")}</p>
            </div>
          </div>{" "}
        </div>

        <div className="w-[1px] h-[100px] bg-gray-200"></div>

        <div>
          <h5 className="text-lg font-semibold">
            {"К(Пульсации)<= %, не более"}
          </h5>
          <div className={"flex items-center justify-center mt-[15px]"}>
            <div
              className={
                "my-[15px]  bg-black text-white text-center py-[10px] px-[20px] rounded-md inline-block"
              }
            >
              <p>{get(roomInfo, "data[0].k")}</p>
            </div>
          </div>{" "}
        </div>
      </div>

      <div className="w-full bg-gray-200 h-[1px] my-[30px]"></div>

      <div className={""}>
        <h5 className={"text-lg font-semibold"}>Рабочая поверхность</h5>

        <div className={"my-[15px] flex gap-x-[20px] items-center"}>
          <button
            className={`text-xl border rounded py-1 px-2 active:scale-75 scale-100 transition-all duration-150 ${
              get(roomInfo, "data[0].table_height") === 0
                ? "bg-black text-white"
                : "bg-white text-black"
            } `}
          >
            <p>0 m</p>
          </button>

          <button
            className={`text-xl border rounded py-1 px-2 active:scale-75 scale-100 transition-all duration-150 ${
              get(roomInfo, "data[0].table_height") === 0.8
                ? "bg-black text-white"
                : "bg-white text-black"
            } `}
          >
            <p>0.8 m</p>
          </button>
        </div>
      </div>

      <div className="w-full bg-gray-200 h-[1px] my-[30px]"></div>

      <div className="relative w-1/2">
        <h5 className={"text-lg font-semibold mb-[20px]"}>
          Вводите параметры лампочки в зависимости от её формы.
        </h5>
        <div
          className="py-2 px-4 border border-gray-400 rounded cursor-pointer bg-white mb-[15px]"
          onClick={toggleDropdownFormFactor}
        >
          {formFactor ? formFactor.name : "Выберите форму"}
        </div>

        {formFactor?.name === "Круглый" ? (
          <input
            className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-1/2 px-[8px] py-[8px]"
            type="number"
            placeholder="диаметр"
          />
        ) : formFactor?.name === "Четырёхугольник" ? (
          <div className="flex gap-x-[10px]">
            <input
              className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
              type="number"
              placeholder="длина"
            />
            <input
              className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
              type="number"
              placeholder="ширина"
            />
          </div>
        ) : formFactor?.name === "Линейный" ? (
          <input
            className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-1/2 px-[8px] py-[8px]"
            type="number"
            placeholder="длина"
          />
        ) : (
          ""
        )}

        {isOpenFormFactor && (
          <ul className="absolute w-full bg-white border border-gray-400 rounded shadow-md mt-1 z-50">
            {themes.map((theme) => (
              <li
                key={theme.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectFormFactor(theme)}
              >
                {theme.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RoomType;
