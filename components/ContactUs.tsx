"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    alert("SUBMIT HANDLER WORKING");

  console.log("🔥 SUBMIT HANDLER WORKING");
    
  

    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log("Contact API response:", result);

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Something went wrong. Please try again."
        );
      }

      // Reset form after successful submission
      form.reset();

      // Success toast
      toast.success(
        "Your message has been sent successfully!"
      );
    } catch (err) {
      console.error("Contact form error:", err);

      // Error toast
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#071B3B] mt-10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ================= LEFT SIDE ================= */}
          <div>
            <h2 className="font-manrope text-white text-4xl md:text-5xl font-medium">
              Get in Touch
            </h2>

            <p className="font-lato text-gray-300 mt-5 font-normal text-sm md:text-base leading-8 max-w-xl">
              Have questions about Expense Tracker? We'd love to hear from you.
              Fill out the form below, and our team will get back to you as soon
              as possible.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >
              {/* ================= NAME ================= */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Full Name{" "}
                  <span className="text-red-400">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full h-12 rounded-md bg-white/10 border border-white/5 px-4 text-white placeholder:text-gray-400 outline-none focus:border-[#6C63FF] transition"
                />
              </div>

              {/* ================= EMAIL ================= */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email Address{" "}
                  <span className="text-red-400">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  required
                  className="w-full h-12 rounded-md bg-white/10 border border-white/5 px-4 text-white placeholder:text-gray-400 outline-none focus:border-[#6C63FF] transition"
                />
              </div>

              {/* ================= SUBJECT ================= */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  className="w-full h-12 rounded-md bg-white/10 border border-white/5 px-4 text-white placeholder:text-gray-400 outline-none focus:border-[#6C63FF] transition"
                />
              </div>

              {/* ================= MESSAGE ================= */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Enter your message..."
                  required
                  className="w-full rounded-md bg-white/10 border border-white/5 p-4 text-white placeholder:text-gray-400 outline-none resize-none focus:border-[#6C63FF] transition"
                />
              </div>

              {/* ================= SUBMIT BUTTON ================= */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#6C63FF] hover:bg-[#5d54ff] disabled:opacity-60 disabled:cursor-not-allowed text-white cursor-pointer px-10 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
              >
                {loading && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}

                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <motion.div
            className="hidden lg:flex justify-end items-center"
            initial={{
              opacity: 0,
              x: 100,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
          >
            <img
              src="/assets/illustration.png"
              alt="Contact Illustration"
              className="w-[420px] xl:w-[500px] h-auto object-contain"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;