import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const sub = host.split(".")[0];

  if (sub !== "prelhe" && sub !== "www") {
    req.headers.set("x-client", sub);
    return NextResponse.rewrite(new URL("/_client", req.url));
  }

  return NextResponse.next();
}
