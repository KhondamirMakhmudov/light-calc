const LightType = () => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm  z-50 hidden"
      // Close the modal when clicking outside
    >
      <div className="absolute right-0 w-1/2 ">
        <div className="bg-white rounded-lg p-6  relative right-0">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">Выбрать продукт</h2>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-black text-white rounded-full">
              все товары
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-full">
              внутреннее освещение
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-full">
              наружное освещение
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-full">
              взрывозащищенное оборудование
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightType;
