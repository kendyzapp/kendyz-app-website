import { PropsWithChildren, ReactNode } from "react";

type SearchLayoutProps = {
  categories: ReactNode;
} & PropsWithChildren;

export const SearchLayout = ({ categories, children }: SearchLayoutProps) => {
  return (
    <>
      {categories}
      {children}
    </>
  );
};

export default SearchLayout;
