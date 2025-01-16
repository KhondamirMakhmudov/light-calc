import Title from "@/components/title";
import Image from "next/image";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";

const Index = () => {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get the string from localStorage
    const storedResponse = localStorage.getItem("calculationResponse");
    if (storedResponse) {
      // Parse it into an object
      const parsedResponse = JSON.parse(storedResponse);
      setData(parsedResponse); // Save it to state
    }
  }, []);
  console.log(data);

  if (!data) {
    return <div>No data available</div>;
  }

  const handleNewCalculation = () => {
    localStorage.removeItem("calculationResponse");

    router.push("/light-calculator");
  };

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

      <div className="grid grid-cols-12 mt-[50px]">
        <div className="col-span-7">
          <h4 className="font-semibold text-lg mb-[15px]">светильник</h4>
          <div className="flex gap-x-[15px]">
            <div className="bg-[#F8F8F8] inline-block">
              <Image
                src={"/images/light-2.webp"}
                alt="light"
                width={115}
                height={115}
              />
            </div>

            <div className="text-xl">
              <h3 className=" font-medium">ACON LED</h3>
              <p>{get(data, "data.tavsiya_qilinadi.lamp", "N/A")}</p>
            </div>
          </div>

          <div className="mt-[30px]">
            <h4 className="font-semibold text-lg mb-[15px]">характеристики</h4>

            <ul className=" grid grid-cols-3 gap-[20px] text-xl">
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
                <p className="font-medium">
                  {get(data, "data.room_width") * get(data, "data.room_length")}{" "}
                  м²
                </p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">коэффициенты отражения</h4>
                <p className="font-medium">
                  {get(data, "data.reflection_factors[0]")}{" "}
                  {get(data, "data.reflection_factors[1]")}{" "}
                  {get(data, "data.reflection_factors[2]")}{" "}
                </p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">освещенность</h4>
                <p className="font-medium">
                  {get(data, "data.illumination")} лк
                </p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">рабочая поверхность</h4>
                <p className="font-medium">
                  {get(data, "data.working_surface_height")}
                </p>
              </li>

              <li className="col-span-1">
                <h4 className="text-[#a7a7a7]">коэффициент запаса</h4>
                <p className="font-medium">
                  {get(data, "data.reserve_factor")} лк
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-5">
          <div className="">
            <h3 className="text-[70px] font-bold">
              {get(data, "data.tavsiya_qilinadi.number_of_lamps")}
            </h3>

            <p className="text-[#a7a7a7]">требуемое количество светильников</p>

            <button
              onClick={handleNewCalculation}
              className={
                "py-[10px] w-1/2 px-[50px] border border-black hover:bg-black hover:text-white rounded-full my-[15px]  transition-all duration-300"
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
