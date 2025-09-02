import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-100">
      {/* Newsletter Section */}
      <div className="text-center py-12 border-b border-gray-200 bg-white">
        <h2 className="text-2xl font-semibold text-gray-900">
          Never Miss a Blog!
        </h2>
        <p className="text-gray-600 mt-2 ">
          Subscribe to get the latest blog, new tech, and exclusive news.
        </p>

        <div className="flex justify-center mt-6">
          <input
            type="email"
            placeholder="Enter your email id"
            className="px-4 py-3 w-72 md:w-96 rounded-l-lg border border-gray-300 outline-none text-sm"
          />
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg text-sm
          cursor-pointer hover:bg-indigo-700 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 grid md:grid-cols-4 gap-8 text-gray-700">
        {/* Logo + About */}
        <div>
          <img src={assets.logo} alt="logo" className="w-36" />
          <p className="mt-4 text-sm text-gray-600 max-w-xs leading-relaxed">
            QuickBlog Helps You To Share Your Ideas, Insights, And Stories With The
            World. A Modern Blogging Platform Built For Creators and Readers.
          </p>
        </div>

        {/* Footer Links from footer_data */}
        {footer_data.map((section, index) => (
          <div key={index}>
            <h3 className="font-semibold text-gray-900 mb-3">{section.title}</h3>
            <ul className="space-y-2 text-sm">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm bg-white">
        Copyright © 2025 QuickBlog - All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
