import useGetQuery from "@/hooks/api/useGetQuery";
import LightCard from "../cards/light";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get, groupBy } from "lodash";
import { useState } from "react";
import Image from "next/image";
import { useSelectedItemStore } from "@/store";

const LightType = () => {
  const setSelectedItem = useSelectedItemStore(
    (state) => state.setSelectedItem
  );

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedName(null);
  };

  const [selectedName, setSelectedName] = useState(null);
  const { data } = useGetQuery({
    key: KEYS.lightPanels,
    url: URLS.lightPanels,
  });
  console.log(data, "data");
  const products = get(data, "data", []);

  const groupedByName = groupBy(products, "name");

  console.log(groupedByName, "groupedByName");

  return (
    <div className="h-screen overflow-hidden flex flex-col px-4">
      {/* Qidiruv input */}
      <div className="mt-[30px]">
        <input
          type="text"
          placeholder="Qidiruv..."
          className="w-full py-[14px] px-[16px] border-b"
        />
      </div>

      {/* Agar item tanlangan bo‘lsa, jadvalni ustiga chiqarish */}
      {selectedName && (
        <div className="mt-6 mb-6 bg-white p-4 rounded shadow border sticky top-0 z-50 overflow-y-auto">
          <button
            onClick={() => setSelectedName(null)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
          >
            ← Ortga
          </button>
          <h2 className="text-xl font-bold mb-4">
            {selectedName} — {groupedByName[selectedName].length} моделей
          </h2>
          <div className="overflow-x-auto overflow-y-scroll border rounded">
            <table className="min-w-[1000px] w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-100">
                  <th className="sticky left-0 bg-gray-100 border px-4 py-2 z-10 w-[200px]">
                    Model
                  </th>
                  <th className="border px-4 py-2">Quvvat (W)</th>
                  <th className="border px-4 py-2">Rang harorati</th>
                  <th className="border px-4 py-2">Kuchlanish</th>
                  <th className="border px-4 py-2">Tok</th>
                  <th className="border px-4 py-2">Chastota</th>
                  <th className="border px-4 py-2">Yorug'lik oqimi</th>
                  <th className="border px-4 py-2">Effektivligi</th>
                  <th className="border px-4 py-2">CRI</th>
                  <th className="border px-4 py-2">O‘lchamlari</th>
                  <th className="border px-4 py-2">Nur burchagi</th>
                </tr>
              </thead>
              <tbody>
                {groupedByName[selectedName].map((item, index) => (
                  <tr
                    key={index}
                    className="text-center hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <td className="sticky left-0  border px-4 py-2 z-10 text-left">
                      {item.name}
                    </td>
                    <td className="border px-4 py-2">{item.power}</td>
                    <td className="border px-4 py-2">
                      {item.color_temperature}
                    </td>
                    <td className="border px-4 py-2">{item.voltage}</td>
                    <td className="border px-4 py-2">{item.current}</td>
                    <td className="border px-4 py-2">{item.frequency}</td>
                    <td className="border px-4 py-2">{item.luminous_flux}</td>
                    <td className="border px-4 py-2">{item.efficiency}</td>
                    <td className="border px-4 py-2">
                      {item.color_rendering_index}
                    </td>
                    <td className="border px-4 py-2">{item.dimensions}</td>
                    <td className="border px-4 py-2">{item.beam_angle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Kartochkalar gridi */}
      <div className="overflow-y-scroll h-[700px]">
        <div className="grid grid-cols-12 gap-x-[20px] gap-y-[30px] mt-[30px] mr-[10px]">
          {Object.entries(groupedByName).map(([name, items]) => (
            <div
              key={name}
              className="border col-span-3 p-4 rounded shadow cursor-pointer hover:bg-gray-100 flex flex-col"
              onClick={() => setSelectedName(name)}
            >
              <div className="w-full h-[260px] relative mb-[10px]">
                <Image
                  src={items[0]?.image}
                  alt={name}
                  // loader={() => items[0]?.image}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <p className="text-sm text-gray-600">{items.length} моделей</p>
              <h3 className="text-lg font-semibold">{name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LightType;
