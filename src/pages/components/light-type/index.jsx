import LightCard from "../cards/light";

const LightType = () => {
  return (
    <div className="space-x-2 ">
      <button className="px-[20px] py-[8px] bg-black text-sm text-white rounded-full ">
        barcha tovarlar
      </button>
      <button className="px-[20px] py-[8px] bg-gray-100 rounded-full">
        ichki yoritish
      </button>
      <button className="px-[20px] py-[8px] bg-gray-100 rounded-full">
        tashqi yoritish
      </button>
      <button className="px-[20px] py-[8px] bg-gray-100 rounded-full">
        sanoatda yoritish
      </button>

      <button className="px-[20px] py-[8px] bg-gray-100 rounded-full">
        portlashga qarshi uskunalar
      </button>

      <div className="mt-[30px]">
        <input
          type="text"
          placeholder="Qidiruv"
          className="w-full py-[14px] border-b"
        />
      </div>

      <div className="overflow-y-scroll">
        <div className="grid grid-cols-12 gap-x-[20px] gap-y-[30px] mt-[30px] mr-[10px]">
          <LightCard />

          <LightCard />

          <LightCard />

          <LightCard />
          <LightCard />

          <LightCard />

          <LightCard />

          <LightCard />

          <LightCard />

          <LightCard />

          <LightCard />

          <LightCard />
        </div>
      </div>
    </div>
  );
};

export default LightType;
