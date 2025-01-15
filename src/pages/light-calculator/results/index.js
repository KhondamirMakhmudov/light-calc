import { useResponse } from "@/context/responseProvider";

const Index = () => {
  const { response } = useResponse;
  console.log(response, "response");

  return <div>{response}</div>;
};

export default Index;
