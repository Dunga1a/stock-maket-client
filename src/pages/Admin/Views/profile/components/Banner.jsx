import React from "react";

import Card from "../../../../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const Banner = () => {
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(/assets/images/banner.png)` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src="/assets/images/avatar4.png"
            alt=""
          />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Adela Parkson
        </h4>
        <p className="text-base font-normal text-gray-600">Product Manager</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
          <p className="text-sm font-normal text-gray-600">Posts</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <FontAwesomeIcon icon={faPenToSquare} className=" h-6 w-6" />
          <p className="text-sm mt-1 font-bold text-navy-700 dark:text-white">
            Chỉnh sửa
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
