import * as yup from "yup";
export const validationSchema = yup.object({
    fullName: yup.string().required("Full name is required"),
    address1: yup.string().required("Address is required"),
    address2: yup.string().required(),
    city: yup.string().required(),
    region: yup.string().required(),
    postCode: yup.string().required(),
    country: yup.string().required(),

})