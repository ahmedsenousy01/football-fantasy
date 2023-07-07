import { FC, PropsWithChildren } from "react";
import { Navbar } from "@/components/Navbar";
import { useSelector } from "react-redux";
import { selectIsLoadingUserDetails } from "@/store/User/User.slice";
import PageLoader from "@/components/PageLoader/PageLoader";

const Page: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const loadingUserDetails = useSelector(selectIsLoadingUserDetails);

  return (
    <>
      <Navbar />
      {loadingUserDetails ? <PageLoader /> : props.children}
    </>
  );
};

export default Page;
