import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { requireAdminId } from "~/utils/session.server";
import { getAdminByEmail } from "~/models/admin";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard - Heartlink" },
    { name: "description", content: "Heartlink admin dashboard" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const adminId = await requireAdminId(request);
  
  // In a real app, you would fetch the admin from the database
  const admin = getAdminByEmail("admin@heartlink.com");
  
  if (!admin) {
    return redirect("/admin/login");
  }
  
  return json({ admin: { id: admin.id, email: admin.email, name: admin.name } });
}

export default function AdminDashboard() {
  const { admin } = useLoaderData<typeof loader>();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-800">Heartlink Admin</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{admin.name}</span>
            <Form action="/admin/logout" method="post">
              <button 
                type="submit"
                className="text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </Form>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Management</h2>
            <p className="text-gray-600 mb-4">Manage user accounts, profiles, and permissions.</p>
            <Link 
              to="/admin/users"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Manage Users
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Approval</h2>
            <p className="text-gray-600 mb-4">Review and approve user-submitted photos and premium content.</p>
            <Link 
              to="/admin/content"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Review Content
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Reports & Analytics</h2>
            <p className="text-gray-600 mb-4">View platform statistics, user activity, and revenue reports.</p>
            <Link 
              to="/admin/reports"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              View Reports
            </Link>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    New user registration
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    john.doe@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    Content submission
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    jane.smith@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Pending Review
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    Premium subscription
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    robert.johnson@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function Form({ action, method, children }: { action: string; method: string; children: React.ReactNode }) {
  return (
    <form action={action} method={method}>
      {children}
    </form>
  );
}
