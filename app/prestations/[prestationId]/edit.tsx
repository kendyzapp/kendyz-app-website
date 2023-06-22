"use client";

import Link from "next/link";
import { publish, unpublish } from "@/app/prestations/[prestationId]/edit/action";

type PrestationIdPublishButtonProps = {
	prestationId: string;
};

export const PrestationIdPublishButton = ({ prestationId }: PrestationIdPublishButtonProps) => {
	const onClick = () => {
		publish(prestationId);
	};
	return (
		<button onClick={onClick} className="p-4 text-center bg-purple-300 rounded-xl">
			Publier
		</button>
	);
};

export const PrestationIdUnpublishButton = ({ prestationId }: PrestationIdPublishButtonProps) => {
	const onClick = () => {
		unpublish(prestationId);
	};
	return (
		<button onClick={onClick} className="p-4 text-center bg-purple-300 rounded-xl">
			Dépublier
		</button>
	);
};

export const PrestationIdEditButton = ({ prestationId }: PrestationIdPublishButtonProps) => {
	return (
		<Link href={`/prestations/${prestationId}/edit`}>
			<button className="p-4 text-center bg-purple-300 rounded-xl">Modifier</button>
		</Link>
	);
};
