import { PropsWithChildren } from "react";
import { kv } from "@vercel/kv";
import { auth } from "@clerk/nextjs";

type PrestationDraft = {
	name?: string;
	description?: string;
};

const PrestationNewLayout = async ({ children }: PropsWithChildren) => {
	const { orgId } = auth();
	if (!orgId) {
		return <div>Vous devez être connecté pour acceder a cette page</div>;
	}
	return (
		<div className="flex py-8 px-12 gap-4">
			<div className="w-2/5 flex-col flex gap-8">
				<h1 className="text-3xl">Créer une nouvelle préstation</h1>
				<p className="text-gray-500">
					Ici vous pouvez creer une nouvelle prestation pour l'ajouter a notre catalogue Kendyz vous pourrez
					éditer votre préstation plus tard pour y changer des informations ou vos services
				</p>
			</div>
			{children}
		</div>
	);
};

export default PrestationNewLayout;
