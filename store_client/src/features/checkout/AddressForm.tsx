import { Typography, Grid } from "@mui/material";
import AppTextInput from "../../App/components/AppTextInput";
import { useFormContext } from "react-hook-form";
import AppCheckBox from "../../App/components/AppCheckBox";

export default function AddressForm() {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput control={control} name="fullName" label="Full name" />
        </Grid>

        <Grid item xs={12}>
          <AppTextInput control={control} name="address1" label="Address1" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput control={control} name="address2" label="Address2" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="city" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="region" label="Region" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="postCode" label="Postcode" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="country" label="Country" />
        </Grid>
        <Grid item xs={12}>
          <AppCheckBox name="saveAddress" label="Save as default address" control={control}/>
        </Grid>
      </Grid>
    </>
  );
}
