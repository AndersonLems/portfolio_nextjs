import type { NextRequest } from "next/server";
import { createContactResponse } from "@/lib/validators/contact";
import type { ContactFormInput } from "@/types/contact";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as ContactFormInput;
  const response = createContactResponse(payload);

  return Response.json(response, {
    status: response.success ? 200 : 400,
  });
}
