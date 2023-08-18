import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}
const CheckBoxSet = ({items, checked, onChange}: Props) => {
  return (
    <>
      <FormGroup>
        {items.map((item) => (
          <FormControlLabel control={<Checkbox />} label={item} key={item} />
        ))}
      </FormGroup>
    </>
  );
};

export default CheckBoxSet;
