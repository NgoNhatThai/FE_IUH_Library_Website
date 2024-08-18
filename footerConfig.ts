import { OrganizationModel } from "@/models";
import { RootState } from "@/redux";
import { useSelector } from "react-redux";

// config/footer.ts
export const storeInfo = useSelector<RootState, OrganizationModel>(
  (state) => state?.storeStore?.storeInfo,
);
export const footerConfig = {
  companyName: storeInfo?.name,
  address: storeInfo?.address,
  phone: storeInfo?.phoneNumber,
  vat: storeInfo?.vat,
};
