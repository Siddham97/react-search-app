import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Item } from "./types/Item";

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [sortState, setSortState] = useState<"default" | "asc" | "desc">(
    "default"
  );
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchItems = useCallback(
    async (reset = false) => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:9090/api/items`, {
          params: {
            search,
            page: reset ? 0 : page,
            size: 10,
            sortBy: sortState === "default" ? "id" : "price",
            direction: sortState === "desc" ? "desc" : "asc",
          },
        });

        const newItems = res.data.content;
        setItems((prev) => (reset ? newItems : [...prev, ...newItems]));
        setHasMore(!res.data.last);
        setPage((prev) => (reset ? 1 : prev + 1));
      } catch (err) {
        console.error("Error fetching items:", err);
      }
      setLoading(false);
    },
    [search, page, sortState]
  );

  const togglePriceSort = useCallback(() => {
    setSortState((prev) => {
      if (prev === "default") return "asc";
      if (prev === "asc") return "desc";
      return "default";
    });
    setPage(0);
    fetchItems(true);
  }, [fetchItems]);

  useEffect(() => {
    fetchItems(true);
  }, [search, sortState]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchItems();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchItems]
  );

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Item Search</h1>
      <button
        onClick={() => {
          togglePriceSort();
        }}
      >
        Sort By
      </button>
      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => {
          setPage(0);
          setSearch(e.target.value);
        }}
        style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
      />

      {items.map((item, index) => (
        <div
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "12px",
            padding: "12px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <img src={item.image} alt={item.name} width="100" />
          <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <strong>${item.price.toFixed(2)}</strong>
          </div>
        </div>
      ))}

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more items.</p>}
    </div>
  );
};

export default App;
