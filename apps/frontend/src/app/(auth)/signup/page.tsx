// apps/frontend/app/(auth)/signup/page.tsx
"use client";

import React, { useState } from "react";
import { ActionButton } from "@deeprubric/ui";

interface SignupForm {
  email: string;
  password: string;
  requiredProcessing: boolean;
  ageVerification: boolean;
  termsAcceptance: boolean;
  emailNotifications?: boolean;
  aiGrading?: boolean;
  usageAnalytics?: boolean;
}

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    email: "",
    password: "",
    requiredProcessing: false,
    ageVerification: false,
    termsAcceptance: false,
    emailNotifications: true,
    aiGrading: true,
    usageAnalytics: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Required validations
    if (!form.email || !form.password) {
      setError("Email and Password are required.");
      return;
    }
    if (!form.requiredProcessing || !form.ageVerification || !form.termsAcceptance) {
      setError("All required consents must be accepted.");
      return;
    }

    setLoading(true);
    try {
      // Replace with your API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 max-w-md mx-auto text-center bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Check your email!</h2>
        <p>We've sent a verification link to {form.email}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create your account</h2>

      {error && <div className="text-red-600">{error}</div>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />

      {/* Required Consents */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="requiredProcessing"
            checked={form.requiredProcessing}
            onChange={handleChange}
          />
          <span>I consent to data processing (required)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="ageVerification"
            checked={form.ageVerification}
            onChange={handleChange}
          />
          <span>I confirm I am 13+ years old (required)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="termsAcceptance"
            checked={form.termsAcceptance}
            onChange={handleChange}
          />
          <span>I accept Terms & Privacy (required)</span>
        </label>
      </div>

      {/* Optional Consents */}
      <div className="space-y-2 mt-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="emailNotifications"
            checked={form.emailNotifications}
            onChange={handleChange}
          />
          <span>Email notifications (optional)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="aiGrading"
            checked={form.aiGrading}
            onChange={handleChange}
          />
          <span>AI grading (optional)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="usageAnalytics"
            checked={form.usageAnalytics}
            onChange={handleChange}
          />
          <span>Usage analytics (optional)</span>
        </label>
      </div>

      <ActionButton
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-4"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Sign Up"}
      </ActionButton>
    </form>
  );
}
