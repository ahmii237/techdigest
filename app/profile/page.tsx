import React from "react";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Profile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Handle case where user is not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Not Authenticated
          </h2>
          <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Profile Picture */}
          <div className="mb-6">
            {user.picture ? (
              <Image
                src={user.picture}
                alt="Profile"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-200"
                priority
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto bg-gray-300 flex items-center justify-center border-4 border-gray-200">
                <span className="text-2xl font-semibold text-gray-600">
                  {user.given_name?.[0] || user.family_name?.[0] || "?"}
                </span>
              </div>
            )}
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {user.given_name && user.family_name
                ? `${user.given_name} ${user.family_name}`
                : user.given_name || user.family_name || "User"}
            </h1>

            <div className="space-y-2">
              {user.given_name && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">
                    First Name
                  </span>
                  <span className="text-sm text-gray-800">
                    {user.given_name}
                  </span>
                </div>
              )}

              {user.family_name && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">
                    Last Name
                  </span>
                  <span className="text-sm text-gray-800">
                    {user.family_name}
                  </span>
                </div>
              )}

              {user.email && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">
                    Email
                  </span>
                  <span className="text-sm text-gray-800">{user.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
