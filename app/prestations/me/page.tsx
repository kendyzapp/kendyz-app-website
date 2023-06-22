import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const getMyPrestations = async () => {
	const { orgId } = auth();
	if (!orgId) {
		redirect("/login");
	}
	const prestations = await prisma.prestation.findMany({
		where: {
			organizationId: orgId,
		},
	});
	return prestations;
};

const PrestationMePage = async () => {
	const prestations = await getMyPrestations();
	return (
		<div className="flex flex-col py-4 px-8 gap-4">
			<div className="flex gap-4">
				<div className="flex flex-col">
					<h2>Créer une nouvelle prestation</h2>
					<p className="text-gray-500">
						Vous pouvez créer une nouvelle prestation en cliquant sur le bouton ci-dessous
					</p>
				</div>
				<Link href="/prestations/new" className="bg-violet-200 rounded-xl p-4 text-center">
					Créer une nouvelle prestation
				</Link>
			</div>
			<p className="text-3xl">Mes préstations</p>
			<div className="grid grid-cols-4 gap-4">
				{prestations.map((prestation) => (
					<Link key={prestation.id} href={`/prestations/${prestation.id}`}>
						<div className="flex flex-col p-4 bg-violet-100 rounded-xl">
							<h2>{prestation.name}</h2>
							<h3>{prestation.description}</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default PrestationMePage;
