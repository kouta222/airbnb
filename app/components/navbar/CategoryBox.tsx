"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType, icons } from "react-icons";
import qs from "query-string";

interface CategoryProps {
  icon: IconType;
  label: string;
  selected?: boolean | null;
}

const CategoryBox: React.FC<CategoryProps> = ({
  icon: Icon,
  label,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "",
        query: updatedQuery
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      hover:text-neutral-500
      transition
      cursor-pointer
      ${selected ? "border-b-neutral-500" : "border-transparent"}
      ${selected ? "border-neutral-500" : "text-neutral-500"}
      `}
    >
      <Icon size={25} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
