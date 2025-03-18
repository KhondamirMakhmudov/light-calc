import MinusIcon from "@/components/icons/minus";
import Title from "@/components/title";
import PlusIcon from "@/components/icons/plus";
import { useState, useEffect } from "react";
import DarkModeButton from "@/components/darkmode-button";
import Image from "next/image";
import LightType from "@/components/light-type";

import ReflectionCoefficient from "@/components/light-type/reflection-coefficient";
import { useRouter } from "next/router";
import House3D from "@/components/light-type/room";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";

import { useRoomContext } from "@/context/roomTypeProvider";

import { safetyFactorData } from "@/constants/dummy-data";
import { useContext } from "react";
import { LightCalculatorContext } from "@/context/responseProvider";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get } from "lodash";
import { themes } from "@/constants/dummy-data";
const angles = ["К30", "Г60", "Д120", "Л140", "Ш160", "М180"];

export default function Index() {
  const router = useRouter();
  const [isOpenRoom, setIsOpenRoom] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isOpenMiniGroup, setIsOpenMiniGroup] = useState(false);
  const [selectedMiniGroup, setSelectedMiniGroup] = useState(null);
  const [selectedMicroGroup, setSelectedMicroGroup] = useState(null);
  const [isOpenMicroGroup, setIsOpenMicroGroup] = useState(false);
  const [treeId, setTreeId] = useState(null);
  const [formFactor, setFormFactor] = useState(null);
  const [isOpenFormFactor, setIsOpenFormFactor] = useState(false);
  const [selectedAngle, setSelectedAngle] = useState("Д120");
  const [isOpenAngle, setIsOpenAngle] = useState(false);
  const [diameter, setDiameter] = useState("");
  const [rectLength, setRectLength] = useState("");
  const [rectWidth, setRectWidth] = useState("");
  const [distanceFromCeilingLength, setDistanceFromCeilingLength] =
    useState("");
  const [distanceFromCeiling, setDistanceFromCeiling] = useState(0);
  const [selectedNumbersArray, setSelectedNumbersArray] = useState([]);
  const [height, setHeight] = useState(3.0);
  const [length, setLength] = useState(3.0);
  const [width, setWidth] = useState(3.0);
  const [isOpen, setIsOpen] = useState(false);
  const { roomLK } = useRoomContext();
  const [ripple, setRipple] = useState("");
  const [colorRendering, setColorRendering] = useState("");

  const { setResult } = useContext(LightCalculatorContext);

  /////// SAFETY FACTOR /////////////////

  const [isOpenSafetyFactor, setIsOpenSafetyFactor] = useState(false);

  const [selectedCondition, setSelectedCondition] = useState(null);
  const toggleDropdown = () => setIsOpenSafetyFactor(!isOpenSafetyFactor);

  const handleSelect = (room) => {
    setSelectedCondition(room);
    setIsOpenSafetyFactor(false);
  };

  // Fetch first dropdown data
  const { data: roomCategories, isLoading } = useGetQuery({
    key: KEYS.roomCategories,
    url: URLS.roomCategories,
  });

  const secondGroupId = selectedRoom?.id || null;

  const {
    data: roomCategoryGroup,
    isLoading: isLoadingCategoryGroup,
    isFetching: isFetchingCategoryGroup,
  } = useGetQuery({
    key: [KEYS.roomCategoryGroup, secondGroupId],
    url: secondGroupId ? `${URLS.roomCategoryGroup}${secondGroupId}/` : null,
    enabled: !!secondGroupId,
  });

  // console.log(roomCategoryGroup);

  // // Fetch second dropdown data (depends on first selection)
  // const { data: roomCategoriesGroup, isLoading: isLoadingGroup } = useGetQuery({
  //   key: [KEYS.roomCategoriesGroup, treeId],
  //   url: treeId ? `${URLS.roomCategoriesGroup}${treeId}/` : null,
  //   enabled: !!treeId,
  // });

  // third api

  const thirdGroupId =
    selectedMicroGroup?.id ||
    selectedMiniGroup?.id ||
    selectedGroup?.id ||
    null;

  const { data: roomInfo } = useGetQuery({
    key: [KEYS.roomInfo, thirdGroupId],
    url: thirdGroupId ? `${URLS.roomInfo}${thirdGroupId}` : null,
    enabled: !!thirdGroupId,
  });

  const toggleDropdownRoom = () => setIsOpenRoom(!isOpenRoom);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setTreeId(room.tree_id);
    setSelectedGroup(null); // Reset second selection on change
    setIsOpenRoom(false);
  };

  const toggleDropdownGroup = () => {
    if (!selectedRoom) return; // Prevent opening if the first is not selected
    setIsOpenGroup(!isOpenGroup);
  };

  const toggleDropdownMiniGroup = () => setIsOpenMiniGroup((prev) => !prev);
  const toggleDropdownMicroGroup = () => setIsOpenMicroGroup((prev) => !prev);

  const handleSelectGroup = (room) => {
    setSelectedGroup(room);
    setSelectedMiniGroup(null);
    setSelectedMicroGroup(null);
    setIsOpenGroup(false);
  };

  const toggleDropdownFormFactor = () => setIsOpenFormFactor(!isOpenFormFactor);
  const handleSelectFormFactor = (theme) => {
    setFormFactor(theme);
    setIsOpenFormFactor(false);
  };

  const toggleDropdownAngle = () => setIsOpenAngle(!isOpenAngle);
  const handleSelectAngle = (angle) => {
    setSelectedAngle(angle);
    setIsOpenAngle(false);
  };

  const handleSelectMiniGroup = (mini) => {
    setSelectedMiniGroup(mini);
    setSelectedMicroGroup(null); // Microcategories ni tozalash
    setIsOpenMiniGroup(false);
  };

  const handleSelectMicroGroup = (micro) => {
    setSelectedMicroGroup(micro);
    setIsOpenMicroGroup(false);
  };

  ///////////////////////////////////////////////
  ////// Giving parameters to the house /////////
  ///////////////////////////////////////////////
  // for height
  const incrementHeight = () =>
    setHeight((prev) => (parseFloat(prev) + 0.1).toFixed(1));
  const decrementHeight = () =>
    setHeight((prev) => Math.max(0, parseFloat((prev - 0.1).toFixed(1))));

  const handleInputChangeHeight = (e) => {
    const value = e.target.value;
    if (/^(\d+(\.\d*)?)?$/.test(value)) {
      setHeight(value);
    }
  };

  const handleBlurHeight = () => {
    setHeight((prev) =>
      prev === "" || isNaN(parseFloat(prev))
        ? "0.0"
        : parseFloat(prev).toFixed(1)
    );
  };

  // for weight
  const incrementWidth = () =>
    setWidth((prev) => (parseFloat(prev) + 0.1).toFixed(1));
  const decrementWidth = () =>
    setWidth((prev) => Math.max(0, parseFloat(prev) - 0.1).toFixed(1));

  const handleInputChangeWidth = (e) => {
    const value = e.target.value;

    if (/^(\d+(\.\d*)?)?$/.test(value)) {
      setWidth(value);
    }
  };

  const handleBlurWidth = () => {
    setWidth((prev) =>
      prev === "" || isNaN(parseFloat(prev))
        ? "0.0"
        : parseFloat(prev).toFixed(1)
    );
  };

  //   for length
  const incrementLength = () =>
    setLength((prev) => (parseFloat(prev) + 0.1).toFixed(1));

  const handleInputChangeLength = (e) => {
    const value = e.target.value;

    if (/^(\d+(\.\d*)?)?$/.test(value)) {
      setLength(value);
    }
  };

  const handleBlurLength = () => {
    // Ensure a valid number is set when the input loses focus
    setLength((prev) =>
      prev === "" || isNaN(parseFloat(prev))
        ? "0.0"
        : parseFloat(prev).toFixed(1)
    );
  };

  const decrementLength = () => {
    setLength((prev) => Math.max(0, parseFloat((prev - 0.1).toFixed(1))));
  };

  const area = (length * width).toFixed(2);

  useEffect(() => {
    if (roomInfo) {
      setRipple(get(roomInfo, "data[0].k", ""));
      setColorRendering(get(roomInfo, "data[0].ra")); // Default bo'sh string
    }
  }, [roomInfo]);

  const handleSelectionChange = (selectedNumbers) => {
    const updatedArray = Object.values(selectedNumbers);
    setSelectedNumbersArray(updatedArray);
    // Use the selected numbers as needed
  };

  const { mutate: calculateTheLightBulb, isLoading: isLoadingLightBulb } =
    usePostQuery({
      listKeyId: KEYS.calculateLight,
      hideSuccessToast: true,
    });

  const onSubmit = () => {
    calculateTheLightBulb(
      {
        url: URLS.calculateLight,
        attributes: {
          room_length: length,
          room_width: width,
          room_height: height,
          reflection_factors: selectedNumbersArray,
          illumination: get(roomInfo, "data[0].lk"),
          working_surface_height: get(roomInfo, "data[0].table_height"),
          reserve_factor: String(selectedCondition?.sf),
        },
      },
      {
        onSuccess: (response) => {
          console.log(response);
          router.push("/light-calculator/results");

          let formFactorValues = {};
          if (formFactor?.name === "Круглый") {
            formFactorValues = { diameter };
          } else if (formFactor?.name === "Четырёхугольник") {
            formFactorValues = { length: rectLength, width: rectWidth };
          } else if (formFactor?.name === "Линейный") {
            formFactorValues = { length: distanceFromCeilingLength };
          }
          setResult({
            response,
            inputValues: {
              formFactor: formFactor?.name,
              diameter,
              rectLength, // Selected form factor
              rectWidth,
              distanceFromCeilingLength,
              selectedAngle,
              distanceFromCeiling,
              ripple,
              colorRendering,
            },
          });
          // localStorage.setItem("calculationResponse", JSON.stringify(response));
          toast.success("success", {
            position: "top-right",
          });
        },
      }
    );
  };
  return (
    <div className="container  my-[50px]">
      {/* <DarkModeButton /> */}

      <button
        onClick={() => router.back()}
        className="flex gap-x-[10px] items-center bg-[#e9e9e9] p-2 rounded-full"
      >
        <Image src={"/icons/back.svg"} alt="back" width={20} height={20} />
      </button>
      <Title>калькулятор освещенности</Title>

      <div className={"grid grid-cols-12 gap-[70px] mt-[30px]"}>
        <div className="col-span-12 lg:col-span-5">
          {/* <div className={"flex justify-between items-start"}>
            <div>
              <h5 className={"text-lg font-semibold"}>светильник</h5>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={
                  "py-[10px] px-[50px] border border-black hover:bg-black hover:text-white rounded my-[15px]  transition-all duration-300"
                }
              >
                выбрать светильник
              </button>
            </div>
          </div> */}
          <div>
            <h5 className={"text-lg font-semibold"}>параметры помещения</h5>
            <div
              className={
                "flex lg:justify-between lg:flex-row flex-col flex-wrap"
              }
            >
              {/* uzunligi */}
              <div className={"mt-[15px]"}>
                <h5 className="text-lg font-normal">ширина</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    onClick={decrementWidth}
                    className={
                      "text-xl border rounded-full p-1 bg-[#272623] hover:bg-[] active:scale-105 scale-100 transition-all duration-100"
                    }
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <label>
                    <input
                      type="text"
                      step="0.1"
                      value={width}
                      onChange={handleInputChangeWidth}
                      onBlur={handleBlurWidth}
                      className="text-center w-[30px]  rounded bg-transparent p-1"
                    />
                    м
                  </label>

                  <button
                    onClick={incrementWidth}
                    className={
                      "text-xl border rounded-full p-1 bg-[#272623] hover:bg-[] active:scale-105 scale-100 transition-all duration-100"
                    }
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
              {/* kengligi */}
              <div className={"mt-[15px]"}>
                <h5 className="text-lg">длина</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    onClick={decrementLength}
                    className={
                      "text-xl border rounded-full p-1 bg-black active:scale-105 scale-100 transition-all duration-100"
                    }
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <label>
                    <input
                      type="text"
                      step="0.1"
                      value={length}
                      onChange={handleInputChangeLength}
                      onBlur={handleBlurLength}
                      className="text-center w-[30px]  rounded bg-transparent "
                    />
                    м
                  </label>

                  <button
                    onClick={incrementLength}
                    className={
                      "text-xl border rounded-full p-1 bg-black active:scale-105 scale-100 transition-all duration-100"
                    }
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
              {/* ship balandligi */}
              <div className={"mt-[15px]"}>
                <h5 className="text-lg">высота потолка</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    onClick={decrementHeight}
                    className={
                      "text-xl border rounded-full p-1 bg-black active:scale-105 scale-100 transition-all duration-100"
                    }
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <label>
                    <input
                      type="text"
                      value={height}
                      onChange={handleInputChangeHeight}
                      onBlur={handleBlurHeight}
                      className="text-center w-[30px]  rounded bg-transparent p-1"
                    />
                    м
                  </label>

                  <button
                    onClick={incrementHeight}
                    className={
                      "text-xl border rounded-full p-1 bg-black active:scale-105 scale-100 transition-all duration-100"
                    }
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-span-12 lg:col-span-7 max-w-lg md:max-w-full">
          <div className="border relative">
            <House3D
              width={width}
              height={height}
              length={length}
              workSurface={get(roomInfo, "data[0].table_height")}
            />

            <div className="absolute top-2 right-2">
              <h3 className={"text-[42px]"}>{area} м²</h3>

              <p className={"text-sm"}>общая площадь</p>
            </div>
          </div>
        </div> */}
        {/* <div className="col-span-12 lg:col-span-7 flex justify-between max-w-lg md:max-w-full">
          <div className="relative">
            <Image
              src={"/images/calculator.webp"}
              alt="calculator"
              width={485}
              height={485}
              className="lg:w-[485px] lg:h-[485px] md:w-[400px] md:h-[400px]"
            />
            <p className="absolute left-[70px] bottom-[50px] text-lg font-medium">
              {width} м
            </p>
            <p className="absolute right-[50px] bottom-[50px] text-lg font-medium">
              {length} м
            </p>
            <p className="absolute -left-[40px] top-[200px] text-lg font-medium">
              {height} м
            </p>

            <p className="absolute text-white left-[90px] top-[300px] text-lg font-medium">
              {get(roomInfo, "data[0].table_height")} м
            </p>
          </div>
          <div className="">
            <h3 className={"text-[42px]"}>{area} м²</h3>

            <p className={"text-sm"}>общая площадь</p>
          </div>
        </div> */}

        <div className="col-span-12">
          <div>
            <div className=" flex-wrap">
              {/* First Dropdown */}
              <div className="relative flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm sm:text-base">
                <h5 className="text-lg font-semibold">Тип помещения</h5>

                <div
                  className="py-2 px-6 border border-black rounded my-3 cursor-pointer bg-white flex justify-between items-center"
                  onClick={toggleDropdownRoom}
                >
                  <span>
                    {selectedRoom ? selectedRoom.name : "Выберите тип комнаты"}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpenRoom ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {isOpenRoom && (
                  <ul className="absolute left-0 right-0 mt-1 w-full bg-white z-50 border rounded shadow-md max-h-52 overflow-y-auto transition-opacity duration-200">
                    {get(roomCategories, "data", []).map((room) => (
                      <li
                        key={room.id}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition-colors"
                        onClick={() => handleSelectRoom(room)}
                      >
                        {room.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Second Dropdown (Disabled if First Not Selected) */}
              <div className="relative flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm sm:text-base">
                <h5 className="text-lg font-semibold">
                  Наименование зрительной работы и вида деятельности
                </h5>

                <div
                  className={`py-2 px-6 border rounded my-3 transition-all duration-300 flex justify-between items-center ${
                    !selectedRoom
                      ? "border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "border-black cursor-pointer bg-white"
                  }`}
                  onClick={selectedRoom ? toggleDropdownGroup : undefined}
                >
                  <span>
                    {selectedGroup ? selectedGroup.name : "Выберите категорию"}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpenGroup ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {isOpenGroup && selectedRoom && (
                  <ul className="absolute left-0 right-0 mt-1 w-full bg-white z-50 border rounded shadow-md max-h-52 overflow-y-auto transition-all duration-300">
                    {get(roomCategoryGroup, "data.subcategories", []).map(
                      (room) => (
                        <li
                          key={room.id}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition-colors"
                          onClick={() => handleSelectGroup(room)}
                        >
                          {room.name}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>

              {/* ThirdDropdown miniCategories */}
              {selectedGroup && selectedGroup?.minicategories?.length > 0 && (
                <div className="relative flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm sm:text-base">
                  <h5 className="text-lg font-semibold mt-4">Подкатегория</h5>

                  <div
                    className="py-2 px-6 border rounded my-3 transition-all duration-300 flex justify-between items-center border-black cursor-pointer bg-white"
                    onClick={toggleDropdownMiniGroup}
                  >
                    <span>
                      {selectedMiniGroup
                        ? selectedMiniGroup.name
                        : "Выберите подкатегорию"}
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isOpenMiniGroup ? "rotate-180" : "rotate-0"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {isOpenMiniGroup && (
                    <ul className="absolute left-0 right-0 mt-1 w-full bg-white z-50 border rounded shadow-md max-h-52 overflow-y-auto transition-all duration-300">
                      {selectedGroup?.minicategories.map((mini) => (
                        <li
                          key={mini.id}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition-colors"
                          onClick={() => handleSelectMiniGroup(mini)}
                        >
                          {mini.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {/* Fourth Dropdown miniCategories */}
              {selectedMiniGroup &&
                selectedMiniGroup.microcategories?.length > 0 && (
                  <div className="relative flex-col flex flex-wrap col-span-6 text-base">
                    <h5 className="text-lg flex-1 font-semibold mt-4">
                      Микро категория
                    </h5>
                    <div
                      className="py-2 px-6 border rounded my-4 transition-all duration-300 cursor-pointer border-black"
                      onClick={toggleDropdownMicroGroup}
                    >
                      <span>
                        {selectedMicroGroup
                          ? selectedMicroGroup.name
                          : "Выберите микро категорию"}
                      </span>
                    </div>

                    {isOpenMicroGroup && (
                      <ul className="absolute mt-[90px] w-full bg-white z-50 border rounded shadow-md max-h-52 overflow-y-auto">
                        {selectedMiniGroup.microcategories.map((micro) => (
                          <li
                            key={micro.id}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectMicroGroup(micro)}
                          >
                            {micro.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-6 items-center w-full">
              {/* 1. Освещенность */}
              <div className="w-full md:w-auto">
                <h5 className="text-lg font-semibold">Параметры освещения</h5>
                <div className="mt-4 flex flex-col ">
                  <h5>Освещенность</h5>
                  <div className="my-4 flex items-center gap-4">
                    <button className="text-xl border rounded-full p-2 bg-[#272623]">
                      <MinusIcon color="white" />
                    </button>
                    <p>{get(roomInfo, "data[0].lk")} лк</p>
                    <button className="text-xl border rounded-full p-2 bg-[#272623]">
                      <PlusIcon color="white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ajratuvchi chiziq (faqat katta ekranda) */}
              <div className="hidden md:block w-[1px] h-[100px] bg-gray-300"></div>

              {/* 2. Индекса цвето передачи */}
              <div className="w-full md:w-auto ">
                <h5 className="text-lg font-semibold">
                  Ra (Индекса цвето передачи), не менее
                </h5>
                <div className="mt-4 flex ">
                  <div className="my-4 bg-black text-white text-center py-2 px-4 rounded-md">
                    <p>{colorRendering}</p>
                  </div>
                </div>
              </div>

              {/* Ajratuvchi chiziq (faqat katta ekranda) */}
              <div className="hidden md:block w-[1px] h-[100px] bg-gray-300"></div>

              {/* 3. К (Пульсации) */}
              <div className="w-full md:w-auto ">
                <h5 className="text-lg font-semibold">
                  К (Пульсации) ≤ %, не более
                </h5>
                <div className="mt-4 flex ">
                  <div className="my-4 bg-black text-white text-center py-2 px-4 rounded-md">
                    <p>{ripple}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="w-full bg-gray-200 h-[1px] my-[30px]"></div> */}

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

            {/* <div className="w-full bg-gray-200 h-[1px] my-[30px]"></div> */}

            <div className="flex flex-col md:flex-row md:justify-between gap-x-[20px] gap-y-6">
              <div className="flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm sm:text-base">
                <h5 className="text-lg font-semibold mb-[20px]">
                  Вводите параметры лампочки в зависимости от её формы.
                </h5>
                <div
                  className="py-2 px-4 border border-gray-400 rounded cursor-pointer bg-white mb-[15px]"
                  onClick={toggleDropdownFormFactor}
                >
                  {formFactor ? formFactor.name : "Выберите форму"}
                </div>

                {formFactor?.name === "Круглый" && (
                  <div className="flex gap-x-[10px] items-center">
                    <input
                      className="border border-gray-300 bg-white text-gray-900 rounded-md w-1/2 px-[8px] py-[8px]"
                      type="number"
                      placeholder="диаметр"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                    />
                    <p>см</p>
                  </div>
                )}

                {isOpenFormFactor && (
                  <ul className="absolute w-full bg-white border border-gray-400 rounded shadow-md mt-2 z-50">
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

              <div className="hidden md:block w-[1px] h-[100px] bg-gray-200"></div>

              <div className="relative flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm sm:text-base">
                <h5 className="font-semibold text-lg mb-[20px]">
                  Угол рассеивания
                </h5>
                <div className="relative">
                  <div
                    className="py-2 px-4 border border-gray-400 rounded cursor-pointer bg-white"
                    onClick={toggleDropdownAngle}
                  >
                    {selectedAngle || "Выберите угол"}
                  </div>
                  {isOpenAngle && (
                    <ul className="absolute w-full bg-white border border-gray-400 rounded shadow-md mt-2 z-50">
                      {angles.map((angle) => (
                        <li
                          key={angle}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectAngle(angle)}
                        >
                          {angle}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="hidden md:block w-[1px] h-[100px] bg-gray-200"></div>

              <div className="flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm sm:text-base">
                <h5 className="text-lg font-semibold mb-[20px]">
                  Расстояние светильника от потолка
                </h5>
                <input
                  type="number"
                  className="border border-gray-300 bg-white text-gray-900 rounded-md w-full px-[8px] py-[8px]"
                  placeholder="введите"
                  value={distanceFromCeiling}
                  onChange={(e) => setDistanceFromCeiling(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className={"my-[50px]"}>
            <h5 className="font-bold text-lg">коэффициенты отражения</h5>

            <ReflectionCoefficient onSelectionChange={handleSelectionChange} />
          </div>
        </div>

        <div className="col-span-4 my-[50px]"></div>
        <div className={"col-span-12"}>
          <div className={"mb-[30px] text-lg"}>
            <div className={"mt-[15px]"}>
              <h5 className="font-bold">коэффициент запаса</h5>

              <div className="relative block">
                {/* Dropdown Trigger */}
                <div
                  className={
                    "py-[10px] px-[50px] border border-black  rounded my-[15px] text-center  transition-all duration-300 cursor-pointer w-1/3"
                  }
                  onClick={toggleDropdown}
                >
                  <span>
                    {selectedCondition ? selectedCondition.title : "Выберите"}
                  </span>
                </div>

                {/* Dropdown List */}
                {isOpenSafetyFactor && (
                  <ul className="absolute mt-2 w-full bg-white border rounded shadow-md max-h-[200px] overflow-y-auto">
                    {safetyFactorData.map((room, index) => (
                      <li
                        key={index}
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
                  className={`text-xl border py-1 px-3 rounded-md ${
                    selectedCondition?.sf === 1.5
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } `}
                >
                  <p>1.5</p>
                </button>

                <button
                  className={`text-xl border py-1 px-3 rounded-md ${
                    selectedCondition?.sf === 1.3
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } `}
                >
                  <p>1.3</p>
                </button>

                <button
                  className={`text-xl border py-1 px-3 rounded-md ${
                    selectedCondition?.sf === 1.1
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } `}
                >
                  <p>1.1</p>
                </button>

                <button
                  className={`text-xl border py-1 px-3 rounded-md ${
                    selectedCondition?.sf === 1.0
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } `}
                >
                  <p>1.0</p>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onSubmit}
            className={
              "py-[15px] px-[50px] text-lg w-1/3 bg-black text-white  border rounded-[10px]    transition-all duration-300"
            }
          >
            рассчитать
          </button>
          <p className="text-sm w-1/2 text-[#C4C4C4]">
            Онлайн-калькулятор не учитывает многих факторов, влияющих на
            результаты освещенности. Полученные результаты являются
            предварительными
          </p>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm  z-50"
          onClick={() => setIsOpen(false)} // Close the modal when clicking outside
        >
          <div className="relative">
            <div
              className="bg-white absolute top-0 right-0 w-3/5 min-h-screen  p-6  "
              onClick={(e) => e.stopPropagation()} // Prevent click propagation
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
              <h2 className="text-[28px] font-bold mb-[30px]">
                Mahsulotni tanlang
              </h2>
              <LightType />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
