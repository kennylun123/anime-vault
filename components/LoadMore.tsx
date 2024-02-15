"use client";

import Image from "next/image";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fetchAnime } from "@/app/action";
import AnimeCard from "./AnimeCard";

let page = 2;

export type AnimeCard = React.JSX.Element;

function LoadMore() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    if (isInView) {
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [isInView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
