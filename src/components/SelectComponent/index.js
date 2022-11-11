import React from "react";
import {
  SelectStyles,
  SelectedItem,
  SelectList,
  ListItem,
  SelectContainer
} from "./styles";

const Select = ({ data }) => {
  const [selected, setSelected] = React.useState(null);

  const handleItemClick = listItem => {
    setSelected(listItem);
  };

  return (
    <SelectStyles>
      <SelectContainer className="select-box">
        <SelectedItem className="current-selected" tabIndex="0">
          <p>{selected ? selected.label : ""}</p>
        </SelectedItem>
        <SelectList className="select-item-list">
          {data.map(item => (
            <ListItem
              key={`select-option-${item.value}`}
              onClick={() => handleItemClick(item)}
            >
              <span className="option-item-label">{item.label}</span>
            </ListItem>
          ))}
        </SelectList>
      </SelectContainer>
    </SelectStyles>
  );
};

export default Select;
