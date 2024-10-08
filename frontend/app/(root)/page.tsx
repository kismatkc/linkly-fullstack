import Main from "@/components/main";
import { linkDetails } from "@/data";
import Header from "@/components/header";
//test
export default function Home() {
  return (
    <>
      <Header />
      <Main linkDetails={linkDetails} />;
    </>
  );
}
