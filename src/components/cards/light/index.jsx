import Image from "next/image";

const LightCard = () => {
  return (
    <div className="col-span-3">
      <div className="bg-[#F8F8F8] p-[16px]">
        <Image
          src={"/images/light-1.webp"}
          alt="light"
          width={262}
          height={260}
        />
      </div>
      <p className="text-[#c5c5c5] mt-[16px] mb-[8px]">2 модели</p>
      <h3 className="text-lg font-semibold">ACORN LED</h3>
      <p className="line-clamp-2 text-lg">
        Светодиодные пылевлагозащищенные светильники для низких потолков
      </p>
    </div>
  );
};

export default LightCard;
