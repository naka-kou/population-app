import { Prefecture } from "@/types/prefecture";

type SelectedPrefecturesProps = {
  selectedPrefectures: Prefecture[];
};

export default function SelectedPrefectures({
  selectedPrefectures,
}: SelectedPrefecturesProps) {
  return (
    <div className="selected-prefecture-list">
      {selectedPrefectures.map((pref) => (
        <span key={pref.prefCode} className="selected-prefecture-tag">
          {pref.prefName}
        </span>
      ))}
    </div>
  );
}
