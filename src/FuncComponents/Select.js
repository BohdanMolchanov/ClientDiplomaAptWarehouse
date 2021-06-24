import React from "react";
import Form from "react-bootstrap/Form";
const CustomSelect = ({ list, keyText, reference, onChange, value }) => (
  <select
    ref={reference}
    value={value}
    onChange={onChange}
    className="border border-info custom-select"
  >
    <option>Оберіть відділення</option>
    {list.map((doc) => (
      
      <option key={doc.id} value={doc.id}>
        {doc.name}
      </option>
    ))}
  </select>
);
export default CustomSelect;
