"use server";

import { getPlaiceholder } from "plaiceholder";

import prisma from "@/lib/prisma";

export const getBlurDataUrl = async (imageUrl: string) => {
  const image = await prisma.image.findFirstOrThrow({
    where: { url: imageUrl },
    select: { url: true, blurDataUrl: true },
  });
  if (image.blurDataUrl) return image.blurDataUrl;
  const imageData = await fetch(image.url);
  const buffer = Buffer.from(await imageData.arrayBuffer());
  const { base64 } = await getPlaiceholder(buffer);
  await prisma.image.update({
    where: { url: image.url },
    data: { blurDataUrl: base64 },
  });
  return base64;
};
