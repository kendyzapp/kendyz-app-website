import { PropsWithChildren, ReactNode } from "react";

type BookingPageLayoutProps = {
	messages: ReactNode;
} & PropsWithChildren;

const BookingPageLayout = ({ children, messages }: BookingPageLayoutProps) => {
	return (
		<div className="flex">
			<div className="w-3/5">{children}</div>
			<div className="w-2/5">{messages}</div>
			<div>test</div>
		</div>
	);
};

export default BookingPageLayout;
