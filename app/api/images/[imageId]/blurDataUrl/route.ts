import { NextRequest, NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

import prisma from "@/lib/prisma";

type ImageBlurDataParams = {  
  params: {
    imageId: string;
  };
};

export async function GET(request: NextRequest, { params }: ImageBlurDataParams) {
  console.log("params", params);
  console.log("request", request);
  const image = await prisma.prestationImage.findFirstOrThrow({
    where: { id: Number(params.imageId) },
    select: { url: true, id: true },
  });
  const imageData = await fetch(image.url);
  const buffer = Buffer.from(await imageData.arrayBuffer());
  const { base64 } = await getPlaiceholder(buffer);
  await prisma.prestationImage.update({
    where: { id: image.id },
    data: { blurDataUrl: base64 },
  });
  return NextResponse.json({ blurDataUrl: base64 });
}