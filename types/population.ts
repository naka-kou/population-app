export type PopulationCategoryLabel =
  | "総人口"
  | "年少人口"
  | "生産年齢人口"
  | "老年人口";

export type PopulationPoint = {
  year: number;
  value: number;
};

export type PopulationCategory = {
  label: PopulationCategoryLabel;
  data: PopulationPoint[];
};

export type PopulationData = {
  prefCode: number;
  data: PopulationCategory[];
};

export type ChartDataItem = {
  year: number;
  [prefName: string]: number;
};
