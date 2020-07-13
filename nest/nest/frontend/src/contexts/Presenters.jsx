import React from "react";

export const sumObjectValuesByKey = (arr, key) => {
  return arr.reduce((a, b) => a + (b[key] || 0), 0);
};

export const formatBooleanText = (condition) => {
  return condition ? (
    <span className="badge" style={{ backgroundColor: "#32CD32" }}>
      Yes
    </span>
  ) : (
    <span className="badge" style={{ backgroundColor: "#CCCCCC" }}>
      No
    </span>
  );
};

export const displayItemDetails = (list) => {
  if (list.length === 0) return;
  const details = [];
  let len = list.length;
  while (len--) {
    const { product_name: name, quantity: qty } = list[len];
    details.push(
      <span
        className="label label-info"
        style={{
          margin: "0 2px 2px",
          borderRadius: ".7em",
          fontWeight: "normal",
        }}
        key={len}
      >
        {qty} - {name}
      </span>
    );
  }
  return details;
};
