import { Prefecture } from "@/types/prefecture";

type PrefectureSelectorProps = {
  prefectures: Prefecture[];
  selectedPrefCodes: number[];
  handleChange: (prefCode: number) => void;
};

export default function PrefectureSelector({
  prefectures,
  selectedPrefCodes,
  handleChange,
}: PrefectureSelectorProps) {
  return (
    <div className="prefecture-list">
      {prefectures.map((pref) => (
        <label key={pref.prefCode}>
          <input
            type="checkbox"
            checked={selectedPrefCodes.includes(pref.prefCode)}
            onChange={() => handleChange(pref.prefCode)}
          />
          {pref.prefName}
        </label>
      ))}
    </div>
  );
}
