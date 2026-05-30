// app/page.tsx 親コンポーネント
"use client";

import { useState, useEffect } from "react";
import { Prefecture } from "@/types/prefecture";
import CategorySelector from "../src/components/CategorySelector";
import SelectedPrefectures from "../src/components/SelectedPrefectures";
import PrefectureSelector from "../src/components/PrefectureSelector";
import PopulationChart from "../src/components/PopulationChart";
import {
  PopulationCategoryLabel,
  PopulationPoint,
  PopulationCategory,
  PopulationData,
  ChartDataItem,
} from "@/types/population";

export default function Page() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<PopulationCategoryLabel>("総人口");
  const categories: { label: PopulationCategoryLabel }[] = [
    { label: "総人口" },
    { label: "年少人口" },
    { label: "生産年齢人口" },
    { label: "老年人口" },
  ];

  // 都道府県の選択
  const handleChange = (prefCode: number) => {
    const isSelected = selectedPrefCodes.includes(prefCode);
    if (isSelected) {
      setSelectedPrefCodes(
        selectedPrefCodes.filter((code) => code !== prefCode),
      );
    } else {
      setSelectedPrefCodes([...selectedPrefCodes, prefCode]);
    }
  };

  useEffect(() => {
    fetch("/api/prefectures")
      .then((res) => res.json())
      .then((data) => {
        setPrefectures(data.result);
      });
  }, []);

  useEffect(() => {
    const fetchPopulationData = async () => {
      if (selectedPrefCodes.length === 0) {
        setPopulationData([]);
        return;
      }

      const results = await Promise.all(
        selectedPrefCodes.map(async (code) => {
          const response = await fetch(`/api/population?prefCode=${code}`);
          const data = await response.json();

          return {
            prefCode: code,
            data: data.result.data,
          };
        }),
      );

      setPopulationData(results);
    };

    fetchPopulationData();
  }, [selectedPrefCodes]);

  // 選択された都道府県
  const selectedPrefectures = (prefectures || []).filter((pref) =>
    selectedPrefCodes.includes(pref.prefCode),
  );

  // 選択されたカテゴリの人口データ
  const basePopulation = populationData[0]?.data.find(
    (category) => category.label === selectedCategory,
  );

  // チャートデータ
  const chartData =
    basePopulation?.data.map((item) => {
      const data: ChartDataItem = {
        year: item.year,
      };

      populationData.forEach((prefPopulation) => {
        const pref = prefectures.find(
          (pref) => pref.prefCode === prefPopulation.prefCode,
        );

        const population = prefPopulation.data.find(
          (category: PopulationCategory) => category.label === selectedCategory,
        );

        const populationByYear = population?.data.find(
          (populationItem: PopulationPoint) =>
            populationItem.year === item.year,
        );

        if (pref && populationByYear) {
          data[pref.prefName] = populationByYear.value;
        }
      });

      return data;
    }) || [];

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#ff0000",
    "#0088fe",
  ];

  return (
    <main className="app">
      <h1 className="app-title">人口構成アプリ</h1>

      <section className="section">
        <h2>■都道府県</h2>

        <PrefectureSelector
          prefectures={prefectures}
          selectedPrefCodes={selectedPrefCodes}
          handleChange={handleChange}
        />
      </section>

      <section className="section">
        <h2>■選択された都道府県</h2>

        <SelectedPrefectures selectedPrefectures={selectedPrefectures} />
      </section>

      <section className="section">
        <h2>■人口種別</h2>

        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      <section className="section">
        <h2>■グラフ表示</h2>

        <PopulationChart
          chartData={chartData}
          selectedPrefectures={selectedPrefectures}
          colors={colors}
        />
      </section>
    </main>
  );
}
