import { Typography, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import AppTextInput from "../../App/components/AppTextInput";
import { useForm } from "react-hook-form";

export default function AddressForm() {
    const {control, handleSubmit} = useForm();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput control={control} name="fullname" label="Full name"/>
        </Grid>
       
        <Grid item xs={12}>
        <AppTextInput control={control} name="Address1" label="Address1"/>
        </Grid>
        <Grid item xs={12}>
        <AppTextInput control={control} name="Address2" label="Address2"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name="city" label="city"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name="Region" label="Region"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name="Postcode" label="Postcode"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name="Country" label="Country"/>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </>
  );
}