import Brand from "./components/brand";
import MinusIcon from "./components/icons/minus";
import Title from "./components/title";
import PlusIcon from "./components/icons/plus";
import { useState } from "react";

export default function Home() {
  const [workSurface, setWorkSurface] = useState(0.8);
  const [safety, setSafety] = useState(1.4);

  const setSurface = (work) => {
    setWorkSurface(work);
  };

  const setSafetyFactor = (safety) => {
    setSafety(safety);
  };
  return (
    <div className="container my-[50px]">
      <Title>yoritish kalkulyatori</Title>

      <div className={"grid grid-cols-12 gap-x-[20px] mt-[30px]"}>
        <div className={"col-span-7"}>
          <div className={"flex justify-between items-start"}>
            <div>
              <h5 className={"text-sm"}>Chiroq</h5>

              <button
                className={
                  "py-[10px] px-[50px] border rounded-[10px] my-[15px] hover:bg-white hover:text-black  transition-all duration-300"
                }
              >
                Chiroqning turini tanlang
              </button>
            </div>

            <div>
              <h3 className={"text-[42px]"}>28 m²</h3>

              <p className={"text-sm"}>umumiy maydoni</p>
            </div>
          </div>

          <div className={"my-[50px] text-sm"}>
            <h5 className={"text-sm"}>Xona parametrlari</h5>
            <div className={"flex justify-between"}>
              {/* uzunligi */}
              <div className={"mt-[15px]"}>
                <h5>uzunligi</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    className={
                      "text-xl border rounded-full p-1 hover:bg-[#272623]"
                    }
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <p>5 m</p>

                  <button
                    className={
                      "text-xl border rounded-full p-1 hover:bg-[#272623]"
                    }
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
              {/* kengligi */}
              <div className={"mt-[15px]"}>
                <h5>kengligi</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    className={
                      "text-xl border rounded-full p-1 hover:bg-[#272623]"
                    }
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <p>5 m</p>

                  <button
                    className={
                      "text-xl border rounded-full p-1 hover:bg-[#272623]"
                    }
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
              {/* ship balandligi */}
              <div className={"mt-[15px]"}>
                <h5>ship balandligi</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    className={
                      "text-xl border rounded-full p-1 hover:bg-[#272623]"
                    }
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <p>5 m</p>

                  <button
                    className={
                      "text-xl border rounded-full p-1 hover:bg-[#272623]"
                    }
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={"my-[50px] text-sm"}>
            <h5>Aks ettirish koeffitsientlari</h5>
          </div>

          <div className={"my-[50px] text-sm"}>
            <h5>Yoritish parametrlari</h5>

            <div className={"flex justify-between"}>
              {/* yoritish */}
              <div className={"mt-[15px]"}>
                <h5>yoritish</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    className={
                      "text-xl border rounded-full p-1 hover:bg-[#272623]"
                    }
                  >
                    <MinusIcon color={"white"} />
                  </button>

                  <p>5 lk</p>

                  <button
                    className={
                      "text-xl border rounded-full p-1 hover:bg-[#272623]"
                    }
                  >
                    <PlusIcon color={"white"} />
                  </button>
                </div>
              </div>
              {/* ish yuzasi */}
              <div className={"mt-[15px]"}>
                <h5>ish yuzasi</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    onClick={() => setSurface(0)}
                    className={`text-xl border py-1 px-2 ${
                      workSurface === 0
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    } `}
                  >
                    <p>0 m</p>
                  </button>

                  <button
                    onClick={() => setSurface(0.8)}
                    className={`text-xl border py-1 px-2 ${
                      workSurface === 0.8
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    } `}
                  >
                    <p>0.8 m</p>
                  </button>
                </div>
              </div>
              {/* ship balandligi */}
              <div className={"mt-[15px]"}>
                <h5>xavfsizlik omili</h5>

                <div className={"my-[15px] flex gap-x-[20px] items-center"}>
                  <button
                    onClick={() => setSafetyFactor(1.4)}
                    className={`text-xl border py-1 px-2 ${
                      safety === 1.4
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    } `}
                  >
                    <p>1.4</p>
                  </button>

                  <button
                    onClick={() => setSafetyFactor(1.6)}
                    className={`text-xl border py-1 px-2 ${
                      safety === 1.6
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    } `}
                  >
                    <p>1.6</p>
                  </button>

                  <button
                    onClick={() => setSafetyFactor(1.7)}
                    className={`text-xl border py-1 px-2 ${
                      safety === 1.7
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    } `}
                  >
                    <p>1.7</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
