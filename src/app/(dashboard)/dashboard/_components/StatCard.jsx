import React from "react";
import { Card } from "@heroui/react";

export const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <Card className="w-full  bg-[#161616] border border-[#232323] p-6 flex flex-col gap-5 rounded-2xl select-none">
      {/* Icon Wrapper */}
      <div className="w-10 h-10 flex items-center justify-center bg-[#222222] border border-[#2d2d2d] rounded-lg text-[#9ca3af]">
        {Icon && <Icon className="w-5 h-5" />}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-[#888888] tracking-wide">
          {title}
        </span>
        <h3 className="text-2xl font-semibold text-white tracking-tight">
          {value}
        </h3>
      </div>
    </Card>
  );
};
