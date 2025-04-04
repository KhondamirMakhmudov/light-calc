import Title from "@/components/title";
import Image from "next/image";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LightCalculatorContext } from "@/context/responseProvider";

const Index = () => {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const router = useRouter();

  const { result } = useContext(LightCalculatorContext);

  const lampsCount = get(data, "data.tavsiya_qilinadi.number_of_lamps", 1);
  const lampWidth = 100; // Har bir lampaning eni (o'zgartirish mumkin)
  const gap = 20;

  console.log(result, "response state management");
  useEffect(() => {
    if (result) {
      // Assuming `result` is an object, directly set it as the data
      setData(result.response);
      setInputValue(result.inputValues);
    }
  }, [result]);

  if (!result) {
    return <p>Loading...</p>;
  }

  const exportToExcel = (data) => {
    if (!data || data.length === 0) {
      alert("Yuklab olish uchun ma'lumot mavjud emas!");
      return;
    }

    const formattedData = data.map((item, index) => ({
      "№": index + 1,
      Hudud: item.material_region_name,
      "Korxona nomi": item.company_name,
      "Resurs kodi": item.material_name_id,
      "Resurs nomi": item.material_name,
      "O‘lchov birligi": item.material_measure,
      "Narxi (QQSsiz)": item.material_price,
      "Narxi (QQS)": (item.material_price * 1.12).toFixed(2),
      "Oxirgi o‘zgarish": dayjs(item.material_updated_date).format(
        "DD.MM.YYYY HH:mm"
      ),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Materials");

    XLSX.writeFile(workbook, "materials.xlsx");
  };

  const area = get(data, "data.room_width") * get(data, "data.room_length");
  return (
    <div className="container my-[50px]">
      <Title>калькулятор освещенности</Title>

      <p className="text-lg font-medium">результаты расчета</p>

      <p className="text-xl my-[15px]">
        Ваш запрос успешно обработан! Для выполнения заданных требований по
        освещенности рекомендовано использовать оптимальное количество
        светильников, которые обеспечат необходимый уровень освещения и
        энергоэффективность.
      </p>

      <button
        onClick={() => exportToExcel(data)}
        className="bg-[#00733BFF] py-[10px] flex gap-2 text-white px-[30px] rounded-[10px]"
      >
        <Image src={"/icons/excel.svg"} alt="excel" width={24} height={24} />
        <p>Excel</p>
      </button>

      {/* <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] mt-[12px]">
        <table className="w-full border-collapse border-[#D7D9E7]">
          <thead className="text-black text-start rounded-[10px]">
            <tr className="rounded-[10px]">
              <th
                className={
                  "px-4 py-2 text-[16px] rounded-tl-[10px] bg-white  text-gray-900  font-bold "
                }
              >
                Фото
              </th>
              <th className=" text-[16px]  text-start  bg-white text-gray-900  font-bold ">
                название
              </th>

              <th className=" text-center text-[16px]   bg-white text-gray-900  font-bold ">
                мощность, Вт
              </th>
              <th className=" text-center text-[16px]   bg-white text-gray-900  font-bold  rounded-tr-[10px]">
                световой поток, лм
              </th>
              <th className=" text-[16px]  text-center  bg-white text-gray-900  font-bold ">
                длина, мм
              </th>
              <th className=" text-[16px]  text-center  bg-white text-gray-900  font-bold rounded-tr-[10px]">
                вес, кг
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-center">
                <div className="bg-[#F8F8F8] inline-block">
                  <Image
                    src={"/images/light-2.webp"}
                    alt="light"
                    width={115}
                    height={115}
                  />
                </div>
              </td>

              <td>
                <div className="text-xl">
                  <p>{get(data, "data.tavsiya_qilinadi.lamp", "N/A")}</p>
                </div>
              </td>
              <td className="text-center">
                <p>{get(data, "data.tavsiya_qilinadi.watt", "N/A")} В</p>
              </td>
              <td className="text-center">
                <p>{get(data, "data.tavsiya_qilinadi.lumen", "N/A")}</p>
              </td>
              <td className="text-center">
                <p>{get(data, "data.tavsiya_qilinadi.diameter", "N/A")} В</p>
              </td>
              <td className="text-center">
                <p>{get(data, "data.tavsiya_qilinadi.weight", "N/A")}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}

      <div className="grid grid-cols-12 gap-x-[20px] mt-[50px]">
        <div className="col-span-7">
          {/* <h4 className="font-semibold text-lg mb-[15px]">светильник</h4> */}

          <div className="mt-[30px]">
            <h4 className="font-semibold text-lg mb-[15px]">характеристики</h4>

            <ul className=" grid grid-cols-3 gap-[20px] text-xl">
              <li className="col-span-3">
                <h4 className="text-[#a7a7a7]">
                  Параметры выбранной вами лампочки
                </h4>
                <p className="font-medium">{get(inputValue, "formFactor")}</p>

                {get(inputValue, "formFactor") === "Круглый" ? (
                  <p className="font-medium">
                    Диаметер: {get(inputValue, "diameter", "")} см
                  </p>
                ) : get(inputValue, "formFactor") === "Четырёхугольник" ? (
                  <div>
                    <p className="font-medium">
                      Ширина: {get(inputValue, "rectWidth", "")} см
                    </p>
                    <p className="font-medium">
                      Длина: {get(inputValue, "rectLength", "")} см
                    </p>
                  </div>
                ) : get(inputValue, "formFactor") === "Четырёхугольник" ? (
                  <p className="font-medium">
                    {get(inputValue, "distanceFromCeilingLength", "")} см
                  </p>
                ) : (
                  ""
                )}
              </li>
              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">длина помещения</h4>
                <p className="font-medium">{get(data, "data.room_length")} м</p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">ширина помещения</h4>
                <p className="font-medium">{get(data, "data.room_width")} м</p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">высота потолка</h4>
                <p className="font-medium">{get(data, "data.room_height")} м</p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">общая площадь</h4>
                <p className="font-medium">{area.toFixed(2)} м²</p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">световой поток</h4>
                <p className="font-medium">
                  {get(data, "data.tavsiya_qilinadi.lumen")} лумен
                </p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">эффективность</h4>
                <p className="font-medium">
                  {get(data, "data.tavsiya_qilinadi.watt")} w
                </p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">пульсация</h4>
                <p className="font-medium">{get(inputValue, "ripple")}</p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">Индекс цветопередачи</h4>
                <p className="font-medium">
                  {get(inputValue, "colorRendering")}
                </p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">Угол рассеивания</h4>
                <p className="font-medium">
                  {get(inputValue, "selectedAngle")}
                </p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">
                  Расстояние светильника от потолка
                </h4>
                <p className="font-medium">
                  {get(inputValue, "distanceFromCeiling")} см
                </p>
              </li>

              {/* <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">коэффициенты отражения</h4>
                <p className="font-medium">
                  {get(data, "data.reflection_factors[0]")}{" "}
                  {get(data, "data.reflection_factors[1]")}{" "}
                  {get(data, "data.reflection_factors[2]")}{" "}
                </p>
              </li> */}

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">освещенность</h4>
                <p className="font-medium">
                  {get(data, "data.illumination")} лк
                </p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">рабочая поверхность</h4>
                <p className="font-medium">{get(data, "data.table_height")}</p>
              </li>

              {/* <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">коэффициент запаса</h4>
                <p className="font-medium">
                  {get(data, "data.reserve_factor")} лк
                </p>
              </li> */}
            </ul>

            <div className="w-full bg-gray-200 h-[1px] my-[30px]"></div>

            <ul className="grid grid-cols-2 gap-[20px] text-lg">
              {/* <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">
                  Параметры выбранной вами лампочки
                </h4>
                <p className="font-medium">{get(inputValue, "formFactor")}</p>

                {get(inputValue, "formFactor") === "Круглый" ? (
                  <p className="font-medium">
                    Диаметер: {get(inputValue, "diameter", "")}
                  </p>
                ) : get(inputValue, "formFactor") === "Четырёхугольник" ? (
                  <div>
                    <p className="font-medium">
                      Ширина: {get(inputValue, "rectWidth", "")}
                    </p>
                    <p className="font-medium">
                      Длина: {get(inputValue, "rectLength", "")}
                    </p>
                  </div>
                ) : get(inputValue, "formFactor") === "Четырёхугольник" ? (
                  <p className="font-medium">
                    {get(inputValue, "distanceFromCeilingLength", "")}
                  </p>
                ) : (
                  ""
                )}
              </li> */}
            </ul>
          </div>
        </div>

        <div className="col-span-5 border bg-[#324539FF] rounded-lg flex flex-col ">
          <div className="relative flex-grow">
            {Array.from({ length: lampsCount }).map((_, index) => (
              <div>
                <Image
                  key={index}
                  src={"/images/lamp.png"}
                  alt="lamp"
                  width={lampWidth}
                  height={150}
                  className="absolute"
                  style={{
                    top: 0, // Shiftning yuqorisida joylashadi
                    left: `${index * 30}px`, // Chapdan o‘ngga ketma-ket joylashish
                  }}
                />
              </div>
            ))}
          </div>
          <div className="text-white p-[20px]">
            <h3 className="text-[70px] font-bold">
              {get(data, "data.tavsiya_qilinadi.number_of_lamps")} шт
            </h3>

            <p className="text-[#a7a7a7]">требуемое количество светильников</p>

            <button
              onClick={() => router.push("/light-calculator")}
              className={
                "py-[10px] w-1/2 px-[50px] border border-whie hover:bg-[#506E5BFF] hover:text-white rounded-full my-[15px]  transition-all duration-300"
              }
            >
              новый расчет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
