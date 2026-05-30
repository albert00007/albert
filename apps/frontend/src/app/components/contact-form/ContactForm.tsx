"use client";

import { useState, type FormEvent } from "react";
import Toast, { ToastType } from "../Toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || "/graphql";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [toast, setToast] = useState<{show: boolean, message: string, type: ToastType}>({
    show: false,
    message: "",
    type: "info"
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateInquiry($data: CreateInquiryInput!) {
              createInquiry(data: $data) {
                id
                name
                email
                createdAt
              }
            }
          `,
          variables: {
            data: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone || null,
              message: formData.message,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "Server error");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setToast({ show: true, message: "Message sent successfully!", type: "success" });
    } catch (err) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Failed to send message";
      setErrorMessage(msg);
      setToast({ show: true, message: msg, type: "error" });
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputBase =
    "w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] rounded-xl px-4 py-3 text-[15px] outline-none transition-all duration-300 ease-in-out";
  const inputError = "!border-red-500/50 focus:!shadow-[0_0_0_4px_rgba(239,68,68,0.15)]";

  if (status === "success") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center p-8 bg-white/5 border border-white/10 rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="11" fill="none" stroke="#34A853" strokeWidth="1.5" />
            <path d="M9.5 12.5l2 2 4-4" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-white text-[22px] font-bold tracking-tight">
          Message Sent!
        </h3>
        <p className="text-white/70 text-[16px] font-normal max-w-xs">
          Thanks for reaching out. Our team will get back to you shortly.
        </p>
        <button
          className="kinetic-gradient px-xl py-md rounded-xl font-headline-md text-white transition-transform hover:scale-105 active:scale-95 border-0 mt-4"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-white/50 text-[14px] font-medium" style={{ fontFamily: "var(--font)" }}>
            Name *
          </label>
          <input
            id="name"
            type="text"
            className={`${inputBase} ${errors.name ? inputError : ""}`}
            placeholder="Jane Doe"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            disabled={status === "submitting"}
          />
          {errors.name && <span className="text-red-500 text-[13px] font-medium" style={{ fontFamily: "var(--font)" }}>{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-white/50 text-[14px] font-medium" style={{ fontFamily: "var(--font)" }}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            className={`${inputBase} ${errors.email ? inputError : ""}`}
            placeholder="jane@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            disabled={status === "submitting"}
          />
          {errors.email && <span className="text-red-500 text-[13px] font-medium" style={{ fontFamily: "var(--font)" }}>{errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-white/50 text-[14px] font-medium" style={{ fontFamily: "var(--font)" }}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className={inputBase}
            placeholder="+374 XX XXX XXX"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            disabled={status === "submitting"}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-white/50 text-[14px] font-medium" style={{ fontFamily: "var(--font)" }}>
            Message *
          </label>
          <textarea
            id="message"
            className={`${inputBase} resize-y min-h-[120px] ${errors.message ? inputError : ""}`}
            placeholder="Tell us about your project..."
            rows={5}
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            disabled={status === "submitting"}
          />
          {errors.message && <span className="text-red-500 text-[13px] font-medium" style={{ fontFamily: "var(--font)" }}>{errors.message}</span>}
        </div>

        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-500 text-[14px]" style={{ fontFamily: "var(--font)" }}>
            {errorMessage || "Failed to send message. Please try again."}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary self-start mt-2 neon-glow-purple"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
      <Toast 
        isVisible={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(prev => ({...prev, show: false}))} 
      />
    </div>
  );
}
