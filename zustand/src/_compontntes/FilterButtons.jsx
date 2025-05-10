import { useFilterStore } from "../store/filterStore";

const filters = ["all", "active", "completed"];

export default function FilterButtons() {
  const { filter, setFilter } = useFilterStore();
  return (
    <div>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{ fontWeight: filter === f ? "bold" : "normal" }}
        >
          {f.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
