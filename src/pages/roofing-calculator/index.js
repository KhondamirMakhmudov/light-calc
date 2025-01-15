import Title from "@/components/title";
import Image from "next/image";
import { useRouter } from "next/router";
const Index = () => {
  const router = useRouter();
  return (
    <div className="container my-[50px]">
      <button
        onClick={() => router.back()}
        className="flex gap-x-[10px] items-center bg-[#e9e9e9] p-2 rounded-full"
      >
        <Image src={"/icons/back.svg"} alt="back" width={20} height={20} />
      </button>
      <Title>Калькулятор расчета кровли</Title>
    </div>
  );
};

export default Index;
