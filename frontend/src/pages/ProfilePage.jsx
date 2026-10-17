import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { authService } from "../services";
import { ROLE_LABELS, ROLE_COLORS } from "../constants/roles";
import { PHONE_PLACEHOLDER } from "../constants/validation";

function ProfileField({ label, value }) {
  return (
    <div className="flex flex-col border-b border-gray-200 py-3 last:border-b-0 sm:flex-row sm:justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value || "—"}</span>
    </div>
  );
}

function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await authService.getProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  const initials = profile
    ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <main className="bg-gray-100 min-h-screen py-12">
      <section className="container mx-auto max-w-2xl px-4">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          {!isAuthenticated ? (
            <p className="text-gray-600 text-center">
              Please log in to view your profile.
            </p>
          ) : isLoading ? (
            <p className="text-gray-600 text-center">Loading profile...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white">
                  {initials}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${ROLE_COLORS[profile.role] ?? "bg-gray-200 text-gray-700"}`}
                  >
                    {ROLE_LABELS[profile.role] ?? profile.role}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <ProfileField label="First name" value={profile.firstName} />
                <ProfileField label="Last name" value={profile.lastName} />
                <ProfileField label="Email" value={profile.email} />
                <ProfileField
                  label="Phone number"
                  value={
                    profile.phoneNumber === PHONE_PLACEHOLDER
                      ? null
                      : profile.phoneNumber
                  }
                />
                <ProfileField
                  label="Role"
                  value={ROLE_LABELS[profile.role] ?? profile.role}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
