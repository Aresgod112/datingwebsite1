import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { getAdminByEmail, validateAdminPassword } from "~/models/admin";

// This would be an environment variable in a real app
const sessionSecret = "super-secret-key";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "heartlink_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export async function createAdminSession(adminId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("adminId", adminId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getAdminSession(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return {
    adminId: session.get("adminId"),
  };
}

export async function requireAdminId(
  request: Request,
  redirectTo: string = "/admin/login"
) {
  const session = await getAdminSession(request);
  if (!session.adminId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/admin/login?${searchParams}`);
  }
  return session.adminId;
}

export async function adminLogin(email: string, password: string) {
  const admin = getAdminByEmail(email);
  if (!admin) return null;
  
  const isValidPassword = validateAdminPassword(admin, password);
  if (!isValidPassword) return null;
  
  return { id: admin.id, email: admin.email };
}

export async function logout(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
