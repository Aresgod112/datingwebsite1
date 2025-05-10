import { useState } from "react";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { adminLogin, createAdminSession, getAdminSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Login - Heartlink" },
    { name: "description", content: "Log in to the Heartlink admin panel" },
  ];
};

export async function loader({ request }: { request: Request }) {
  const session = await getAdminSession(request);
  if (session.adminId) {
    return redirect("/admin");
  }
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo") || "/admin";
  
  if (typeof email !== "string" || typeof password !== "string" || 
      typeof redirectTo !== "string") {
    return json({ 
      error: "Invalid form submission",
      fields: { email, password },
    }, { status: 400 });
  }
  
  const admin = await adminLogin(email, password);
  if (!admin) {
    return json({ 
      error: "Invalid email or password",
      fields: { email, password },
    }, { status: 400 });
  }
  
  return createAdminSession(admin.id, redirectTo);
}

export default function AdminLogin() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-600 mt-2">Log in to the Heartlink admin panel</p>
        </div>
        
        <Form method="post" className="space-y-6">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={actionData?.fields?.email || "admin@heartlink.com"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="admin@heartlink.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={actionData?.fields?.password || ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your password"
            />
          </div>
          
          {actionData?.error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {actionData.error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Log In
          </button>
        </Form>
      </div>
    </div>
  );
}
