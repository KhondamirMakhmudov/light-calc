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
import { themesUz } from "@/constants/dummy-data";
import { themesRu } from "@/constants/dummy-data";
import { themesEn } from "@/constants/dummy-data";
import LanguageDropdown from "@/components/language";
import { useTranslation } from "react-i18next";
const angles = ["К30", "Г60", "Д120", "Л140", "Ш160", "М180"];

export default function Index() {
  const { t, i18n } = useTranslation();
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
    <div className="container px-[20px] my-[50px]">
      <div className="flex items-center justify-end">
        <LanguageDropdown />
        <DarkModeButton />
      </div>
      <button
        onClick={() => router.back()}
        className="flex gap-x-[10px] items-center bg-[#e9e9e9] p-2 rounded-full"
      >
        <Image src={"/icons/back.svg"} alt="back" width={20} height={20} />
      </button>
      <Title>{t("lighting calculator")}</Title>

      <div className={"grid grid-cols-12 gap-x-[70px] mt-[30px] px-[10px]"}>
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
            <h5 className={"text-lg font-semibold"}>{t("room parameters")}</h5>
            <div className={"flex justify-between"}>
              {/* uzunligi */}
              <div className={"mt-[15px]"}>
                <h5 className="text-lg font-normal">{t("width")}</h5>

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
                <h5 className="text-lg">{t("length")}</h5>

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
                <h5 className="text-lg">{t("ceiling height")}</h5>

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
        <div className="col-span-12 lg:col-span-7 flex justify-between max-w-lg md:max-w-full">
          <div className="relative">
            <Image
              src={"/images/calculator.webp"}
              alt="calculator"
              width={485}
              height={485}
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

            <p className={"text-sm"}>{t("total area")}</p>
          </div>
        </div>

        <div className="col-span-12">
          <div>
            <div className="grid grid-cols-12 my-8 gap-x-5 flex-wrap">
              {/* First Dropdown */}
              <div className="relative flex-col flex flex-wrap col-span-12 md:col-span-6 text-base">
                <h5 className="text-lg flex-1 font-semibold">
                  {t("room type")}
                </h5>
                <div
                  className="py-2 px-6 border border-black rounded my-4 cursor-pointer"
                  onClick={toggleDropdownRoom}
                >
                  <span>
                    {selectedRoom ? selectedRoom.name : "Выберите тип комнаты"}
                  </span>
                </div>

                {isOpenRoom && (
                  <ul className="absolute mt-[90px] w-full bg-white z-50 border rounded shadow-md max-h-52 overflow-y-auto">
                    {get(roomCategories, "data", []).map((room) => (
                      <li
                        key={room.id}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSelectRoom(room)}
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
                  {t("Name of visual work and type of activity")}
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
                  <ul className="absolute mt-[90px] w-full bg-white z-50 border rounded shadow-md max-h-52 overflow-y-auto">
                    {get(roomCategoryGroup, "data.subcategories", []).map(
                      (room) => (
                        <li
                          key={room.id}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
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
                <div className="relative flex-col flex flex-wrap col-span-6 text-base">
                  <h5 className="text-lg flex-1 font-semibold mt-4">
                    Подкатегория
                  </h5>
                  <div
                    className="py-2 px-6 border rounded my-4 transition-all duration-300 cursor-pointer border-black"
                    onClick={toggleDropdownMiniGroup}
                  >
                    <span>
                      {selectedMiniGroup
                        ? selectedMiniGroup.name
                        : "Выберите подкатегорию"}
                    </span>
                  </div>

                  {isOpenMiniGroup && (
                    <ul className="absolute top-[120px] w-full bg-white z-50 border rounded shadow-md max-h-52 overflow-y-auto">
                      {selectedGroup?.minicategories.map((mini) => (
                        <li
                          key={mini.id}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
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
            <div className="flex justify-between gap-x-[40px] items-center">
              <div>
                <h5 className="text-lg font-semibold">
                  {t("lighting parameters")}
                </h5>
                <div className={"flex"}>
                  <div className={"mt-[15px] "}>
                    <h5>{t("illumination")}</h5>

                    <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                      <button
                        className={
                          "text-xl border rounded-full p-1 bg-[#272623]"
                        }
                      >
                        <MinusIcon color={"white"} />
                      </button>

                      <p>{get(roomInfo, "data[0].lk")} лк</p>

                      <button
                        className={
                          "text-xl border rounded-full p-1 bg-[#272623]"
                        }
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
                  {t("Ra (Color rendering index), at least")}
                </h5>
                <div className={"flex items-center justify-center mt-[15px]"}>
                  <div
                    className={
                      "my-[15px]  bg-black text-white text-center py-[10px] px-[20px] rounded-md inline-block"
                    }
                  >
                    <p>{colorRendering}</p>
                  </div>
                </div>{" "}
              </div>

              <div className="w-[1px] h-[100px] bg-gray-200"></div>

              <div>
                <h5 className="text-lg font-semibold">
                  {t("K (Flicker) <= %, no more than")}
                </h5>
                <div className={"flex items-center justify-center mt-[15px]"}>
                  <div
                    className={
                      "my-[15px]  bg-black text-white text-center py-[10px] px-[20px] rounded-md inline-block"
                    }
                  >
                    <p>{ripple}</p>
                  </div>
                </div>{" "}
              </div>
            </div>

            <div className="w-full bg-gray-200 h-[1px] my-[30px]"></div>

            <div className={""}>
              <h5 className={"text-lg font-semibold"}>{t("Work surface")}</h5>

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

            <div className="flex justify-between gap-x-[20px]">
              <div className="relative  flex flex-col">
                <h5 className={"text-lg flex-grow-1 font-semibold mb-[20px]"}>
                  {t("Enter lamp parameters depending on its shape.")}
                </h5>
                <div
                  className="py-2 px-4 border border-gray-400 rounded cursor-pointer bg-white mb-[15px]"
                  onClick={toggleDropdownFormFactor}
                >
                  {formFactor ? formFactor.name : "Выберите форму"}
                </div>

                {formFactor?.name === `${t("round")}` ? (
                  <div className="flex gap-x-[10px] items-center">
                    <input
                      className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-1/5 px-[8px] py-[8px]"
                      type="number"
                      placeholder="диаметр"
                      value={diameter}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value) || value === "") {
                          setDiameter(value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                          e.preventDefault(); // Manfiy sonlar va eksponent ("e") oldini oladi
                        }
                      }}
                    />
                    <p>см</p>
                  </div>
                ) : formFactor?.name === `${t("square")}` ? (
                  <div className="flex gap-x-[10px]">
                    <div className="flex items-center gap-x-[10px]">
                      <input
                        className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-1/2 px-[8px] py-[8px]"
                        type="number"
                        placeholder="длина"
                        value={rectLength}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*\.?\d*$/.test(value) || value === "") {
                            setRectLength(value);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault(); // Manfiy sonlar va eksponent ("e") oldini oladi
                          }
                        }}
                      />
                      <p>см</p>
                    </div>
                    <div className="flex items-center gap-x-[10px]">
                      <input
                        className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-1/2 px-[8px] py-[8px]"
                        type="number"
                        value={rectWidth}
                        placeholder="ширина"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*\.?\d*$/.test(value) || value === "") {
                            setRectWidth(value);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault(); // Manfiy sonlar va eksponent ("e") oldini oladi
                          }
                        }}
                      />
                      <p>см</p>
                    </div>
                  </div>
                ) : formFactor?.name === `${t("linear")}` ? (
                  <div className="flex items-center gap-x-[10px]">
                    <input
                      className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-1/5 px-[8px] py-[8px]"
                      type="number"
                      value={distanceFromCeilingLength}
                      placeholder="длина"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value) || value === "") {
                          setDistanceFromCeilingLength(value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                          e.preventDefault(); // Manfiy sonlar va eksponent ("e") oldini oladi
                        }
                      }}
                    />
                    <p>см</p>
                  </div>
                ) : (
                  ""
                )}

                {isOpenFormFactor && (
                  <ul className="absolute w-full bg-white border border-gray-400 rounded shadow-md mt-[95px] z-50">
                    {i18n.language === "uz"
                      ? themesUz.map((theme) => (
                          <li
                            key={theme.id}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectFormFactor(theme)}
                          >
                            {theme.name}
                          </li>
                        ))
                      : i18n.language === "ru"
                      ? themesRu.map((theme) => (
                          <li
                            key={theme.id}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectFormFactor(theme)}
                          >
                            {theme.name}
                          </li>
                        ))
                      : themesEn.map((theme) => (
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

              <div className="w-[1px] h-[100px] bg-gray-200"></div>

              <div className="relative  flex flex-col">
                <h5 className="font-semibold text-lg mb-[20px] flex-grow-1">
                  {t("Beam angle")}
                </h5>
                <div className="relative ">
                  <div
                    className="py-2 px-4 border border-gray-400 rounded cursor-pointer bg-white"
                    onClick={toggleDropdownAngle}
                  >
                    {selectedAngle || "Выберите угол"}
                  </div>

                  {isOpenAngle && (
                    <ul className="absolute w-full bg-white border border-gray-400 rounded shadow-md mt-1 z-50">
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

              <div className="w-[1px] h-[100px] bg-gray-200"></div>

              <div>
                <h5 className={"text-lg flex-grow-1 font-semibold mb-[20px]"}>
                  {t("Distance of the lamp from the ceiling")}
                </h5>

                <input
                  type="number"
                  className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-1/2 px-[8px] py-[8px]"
                  placeholder="введите"
                  value={distanceFromCeiling}
                  onChange={(e) => setDistanceFromCeiling(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <div className={"my-[50px]"}>
            <h5 className="font-bold text-lg">
              {t("Reflection coefficients")}
            </h5>

            <ReflectionCoefficient onSelectionChange={handleSelectionChange} />
          </div>
        </div>

        <div className="col-span-4 my-[50px]"></div>
        <div className={"col-span-12"}>
          <div className={"mb-[30px] text-lg"}>
            <div className={"mt-[15px]"}>
              <h5 className="font-bold">{t("Reserve coefficient")}</h5>

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
            {t("Calculate")}
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
