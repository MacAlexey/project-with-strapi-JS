import React, { useEffect, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import Layout from "../../layout";
import LayoutDashboard from "../layout";
import { API, BEARER } from "../../../../constants";
import { getToken } from "helpers";

const DashboardEditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [dataId, setDataId] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(`${API}/users/me`, {
          headers: { Authorization: `${BEARER} ${token}` },
        });

        // console.log(`${API}/users/me`);

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        console.log("Fetched data:", data);

        setDataId(data.id);

        setFormData((prev) => ({
          ...prev,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          currentPassword: "",
          newPassword: "",
        }));
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = getToken();
      if (!token) throw new Error("No token found");

      const userId = dataId;
      if (!userId) throw new Error("User ID not found");

      const response = await fetch(`${API}/users/me/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `${BEARER} ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      setSuccess("Profile updated successfully");
      // clear passwords after update
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <LayoutDashboard>
        <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <Label>First name</Label>
              <Input
                name="firstName"
                placeholder="Example Doe"
                type="text"
                className="mt-1"
                value={formData.firstName}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              <Label>Last name</Label>
              <Input
                name="lastName"
                placeholder="Doe"
                type="text"
                className="mt-1"
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              <Label>Current password</Label>
              <Input
                name="currentPassword"
                placeholder="***"
                type="password"
                className="mt-1"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              <Label>New password</Label>
              <Input
                name="newPassword"
                type="password"
                className="mt-1"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </label>
            <label className="block md:col-span-2">
              <Label>Email address</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <ButtonPrimary
              className="md:col-span-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update profile"}
            </ButtonPrimary>
          </form>

          {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && <div className="text-green-500 mt-2">{success}</div>}
        </div>
      </LayoutDashboard>
    </Layout>
  );
};

export default DashboardEditProfile;
