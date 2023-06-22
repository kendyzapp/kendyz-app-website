"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const unpublish = async (prestationId: string) => {
	"use server";
	console.log("prestationId", prestationId);
	const prestation = await prisma.prestation.update({
		where: {
			id: prestationId,
		},
		data: {
			status: "DRAFT",
		},
	});
	console.log("prestationId", prestation.status);
	redirect("/prestations" + prestationId);
};

export const publish = async (prestationId: string) => {
	"use server";
	console.log("prestationId", prestationId);
	const prestation = await prisma.prestation.update({
		where: {
			id: prestationId,
		},
		data: {
			status: "PUBLISHED",
		},
	});
	console.log("prestationId", prestation.status);
	redirect("/prestations" + prestationId);
};
