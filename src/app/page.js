import Headers from "@/components/Headers";
import Header from "@/components/subHeader";
import Image from "next/image";
import DropdownMenu from "./../components/dropdown";

import Multilevel from "./../components/multilevel";

export default function Home() {
  return (
    <>
      <Headers />
      <Header />
      <DropdownMenu />
      <Multilevel />
    </>
  );
}
