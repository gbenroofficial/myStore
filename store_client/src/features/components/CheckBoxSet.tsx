import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}
const CheckBoxSet = ({ items, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(val: string) {
    var currentIndex = checkedItems.findIndex((item) => item === val);
    let newCheckedItems = [];

    if (currentIndex === -1) newCheckedItems = [...checkedItems, val];
    else newCheckedItems = checkedItems.filter((item) => item !== val);

    setCheckedItems(newCheckedItems);
    onChange(newCheckedItems);
  }
  return (
    <>
      <FormGroup>
        {items.map((item) => (
          <FormControlLabel
            control={<Checkbox checked={checkedItems.indexOf(item) !== -1} onClick={() => {handleChecked(item)}}/>}
            label={item}
            key={item}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default CheckBoxSet;
