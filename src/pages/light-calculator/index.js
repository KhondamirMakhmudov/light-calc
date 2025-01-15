import MinusIcon from "@/components/icons/minus";
import Title from "@/components/title";
import PlusIcon from "@/components/icons/plus";
import { useState } from "react";
import DarkModeButton from "@/components/darkmode-button";
import Image from "next/image";
import LightType from "@/components/light-type";
import RoomType from "@/components/light-type/room-type";
import ReflectionCoefficient from "@/components/light-type/reflection-coefficient";
import { useRouter } from "next/router";
import House3D from "@/components/light-type/room";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";

export default function Index() {
  const router = useRouter();
  const [workSurface, setWorkSurface] = useState(0.8);
  const [safety, setSafety] = useState(1.4);
  const [height, setHeight] = useState(3.0);
  const [length, setLength] = useState(5.0);
  const [width, setWidth] = useState(4.0);
  const [isOpen, setIsOpen] = useState(false);
  // for height
  const incrementHeight = () =>
    setHeight((prev) => parseFloat((prev + 1.0).toFixed(1)));
  const decrementHeight = () =>
    setHeight((prev) => Math.max(0, parseFloat((prev - 1.0).toFixed(1))));

  // for weight
  const incrementWidth = () =>
    setWidth((prev) => parseFloat((prev + 1.0).toFixed(1)));
  const decrementWidth = () =>
    setWidth((prev) => Math.max(0, parseFloat((prev - 1.0).toFixed(1))));

  //   for length
  const incrementLength = () => {
    setLength((prev) => parseFloat((prev + 1.0).toFixed(1)));
  };

  const decrementLength = () => {
    setLength((prev) => Math.max(0, parseFloat((prev - 1.0).toFixed(1))));
  };

  const setSurface = (work) => {
    setWorkSurface(work);
  };

  const area = (length * width).toFixed(2);

  const setSafetyFactor = (safety) => {
    setSafety(safety);
  };

  const { mutate: calculateTheLightBulb, isLoading } = usePostQuery({
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
          reflection_factors: [80, 30, 30],
          illumination: 300,
          working_surface_height: workSurface,
          reserve_factor: safety,
          lamp_watt: 8,
          lamp_lumen: 600,
        },
      },
      {
        onSuccess: () => {
          toast.success("Siz ro'yxatdan muvaffaqiyatli o'tdingiz", {
            position: "top-right",
          });
          router.push("/");
        },
      }
    );
  };
  return (
    <div className="container my-[50px]">
      <DarkModeButton />

      <button
        onClick={() => router.back()}
        className="flex gap-x-[10px] items-center bg-[#e9e9e9] p-2 rounded-full"
      >
        <Image src={"/icons/back.svg"} alt="back" width={20} height={20} />
      </button>
      <Title>калькулятор освещенности</Title>

      <div className={"grid grid-cols-12 gap-x-[70px] mt-[30px]"}>
        <div className={"col-span-7"}>
          <div className={"flex justify-between items-start"}>
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

            <RoomType />

            <div>
              <h3 className={"text-[42px]"}>{area} m²</h3>

              <p className={"text-sm"}>umumiy maydoni</p>
            </div>
          </div>

          <div className={"my-[50px] "}>
            <h5 className={"text-lg font-semibold"}>параметры помещения</h5>
            <div className={"flex justify-between"}>
              {/* uzunligi */}
              <div className={"mt-[15px]"}>
                <h5 className="text-lg font-normal">длина</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    onClick={decrementWidth}
                    className={
                      "text-xl border rounded-full p-1 bg-[#272623] hover:bg-[]"
                    }
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <p>{width}.0 м</p>

                  <button
                    onClick={incrementWidth}
                    className={
                      "text-xl border rounded-full p-1 bg-[#272623] hover:bg-[]"
                    }
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
              {/* kengligi */}
              <div className={"mt-[15px]"}>
                <h5 className="text-lg">ширина</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    onClick={decrementLength}
                    className={"text-xl border rounded-full p-1 bg-black"}
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <p>{length}.0 м</p>

                  <button
                    onClick={incrementLength}
                    className={"text-xl border rounded-full p-1 bg-black"}
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
                    className={"text-xl border rounded-full p-1 bg-black"}
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <p>{height}.0 м</p>

                  <button
                    onClick={incrementHeight}
                    className={"text-xl border rounded-full p-1 bg-black"}
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={"my-[50px]"}>
            <h5 className="font-bold text-lg">коэффициенты отражения</h5>

            <ReflectionCoefficient />
          </div>

          <div className={"my-[50px] text-lg"}>
            <h5 className="text-lg font-semibold">параметры освещения</h5>

            <div className={"flex justify-between"}>
              {/* yoritish */}
              <div className={"mt-[15px] "}>
                <h5>освещенность</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    className={"text-xl border rounded-full p-1 bg-[#272623]"}
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <p>5 lk</p>

                  <button
                    className={"text-xl border rounded-full p-1 bg-[#272623]"}
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
              {/* ish yuzasi */}
              <div className={"mt-[15px]"}>
                <h5>рабочая поверхность</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    onClick={() => setSurface(0)}
                    className={`text-xl border py-1 px-2 ${
                      workSurface === 0
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    } `}
                  >
                    <p>0 m</p>
                  </button>

                  <button
                    onClick={() => setSurface(0.8)}
                    className={`text-xl border py-1 px-2 ${
                      workSurface === 0.8
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    } `}
                  >
                    <p>0.8 m</p>
                  </button>
                </div>
              </div>
              {/* ship balandligi */}
              <div className={"mt-[15px]"}>
                <h5>коэффициент запаса</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    onClick={() => setSafetyFactor(1.4)}
                    className={`text-xl border py-1 px-2 ${
                      safety === 1.4
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    } `}
                  >
                    <p>1.4</p>
                  </button>

                  <button
                    onClick={() => setSafetyFactor(1.6)}
                    className={`text-xl border py-1 px-2 ${
                      safety === 1.6
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    } `}
                  >
                    <p>1.6</p>
                  </button>

                  <button
                    onClick={() => setSafetyFactor(1.7)}
                    className={`text-xl border py-1 px-2 ${
                      safety === 1.7
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    } `}
                  >
                    <p>1.7</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onSubmit}
            className={
              "py-[15px] px-[50px] text-lg w-1/2 bg-black text-white  border rounded-[10px]    transition-all duration-300"
            }
          >
            рассчитать
          </button>
          <p className="text-sm w-1/2 text-[#C4C4C4]">
            Onlayn kalkulyator yorug&apos;lik natijalariga ta&apos;sir qiluvchi
            ko&apos;plab omillarni hisobga olmaydi. Olingan natijalar dastlabki
            hisoblanadi
          </p>
        </div>

        <div className="col-span-5">
          <House3D
            width={width}
            height={height}
            length={length}
            workSurface={workSurface}
          />
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
