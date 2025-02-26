"use server";
import Image from "next/image";
import { allServices } from "@/constants/dummy-data";
import { get } from "lodash";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container grid grid-cols-12 md:gap-[30px] gap-[10px] my-[50px]">
      <div className="col-span-12">
        <h1 className="text-[32px] md:text-[40px] lg:text-[64px] font-semibold">
          наши сервисы
        </h1>
      </div>
      {allServices.map((service) => (
        <div
          onClick={() => router.push(`${get(service, "url")}`)}
          key={get(service, "id")}
          className=" col-span-12 md:col-span-6 bg-[#F8F8F8] p-[24px] cursor-pointer hover:bg-[#e9e9e9] transition-all duration-300"
        >
          <div className="flex justify-between mb-[24px]">
            <div></div>
            <Image
              src={`/icons/calculator${get(service, "id")}.svg`}
              width={120}
              height={120}
              className="float-right md:w-[120px] md:h-[120px] w-[80px] h-[80px]"
            />
          </div>

          <p className="lg:text-lg md:text-base text-sm font-medium">
            {get(service, "title")}
          </p>

          <p className="lg:text-xl md:text-lg text-base">
            {get(service, "desc")}
          </p>
        </div>
      ))}
    </div>
  );
}
