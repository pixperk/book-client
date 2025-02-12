import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookPlus, Users, Shield, ShieldOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getAllUsers, toggleUserRole } from "../queries/auth";


export default function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { mutate: handleRoleToggle, isPending: isToggling } = useMutation({
    mutationFn: toggleUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update user role!");
    },
  });

  const filteredUsers = selectedRole
    ? users?.filter((user) => user.role === selectedRole)
    : users;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-300 mb-8">
            Manage your books and users from one central location
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => navigate("/books/add")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-1 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 group"
            >
              <BookPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Add New Book
            </button>
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-1 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 group"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Manage Users
            </button>
          </div>

          {/* Role Filter */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedRole(null)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedRole === null
                  ? "bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setSelectedRole("admin")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedRole === "admin"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Admins
            </button>
            <button
              onClick={() => setSelectedRole("user")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedRole === "user"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Users
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Role
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading users...
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers?.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {user.name[0].toUpperCase()}
                          </div>
                          <span className="text-gray-200">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-pink-500/20 text-pink-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleRoleToggle(user._id)}
                          disabled={isToggling}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                        >
                          {user.role === "admin" ? (
                            <>
                              <ShieldOff className="w-4 h-4" />
                              Remove Admin
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4" />
                              Make Admin
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}