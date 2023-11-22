"use client";
import React, { useState, useRef, useEffect } from "react";
const categoriesArray = [
  {
    subcategories: ["Keyboard", "Keyboard And Mouse Combo"],
    category: "keyboard",
  },
  {
    subcategories: ["Joystick", "Gamepad"],
    category: "gaming simulation",
  },
  {
    subcategories: ["Headset"],
    category: "headset",
  },
  {
    subcategories: ["Mouse", "Mousepad", "Earphone", "Keyboard", "Headset"],
    category: "gaming",
  },
  {
    subcategories: ["Speaker"],
    category: "speaker",
  },
  {
    subcategories: ["Webcam"],
    category: "webcam",
  },
  {
    subcategories: ["Mouse"],
    category: "mouse",
  },
  {
    subcategories: ["Laser Pointer", "Mousepad"],
    category: "accessories",
  },
];
const DropdownMenu = () => {
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    // Keep the submenu open as long as the mouse is over the main button or the submenu
    timeoutRef.current = setTimeout(() => {
      setSubMenuVisible(false);
    }, 300);
  };

  const handleSubMenuEnter = () => {
    // Clear the timeout to prevent hiding the submenu
    clearTimeout(timeoutRef.current);
  };

  const handleSubMenuLeave = () => {
    // Continue with the regular leave logic
    setSubMenuVisible(false);
  };

  useEffect(() => {
    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutRef.current);
  }, []);
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "#006fba" : "black",
    };
  };
  return (
    <div className="py-5 max-w-screen-2xl mx-auto text-white max-sm:hidden sm:hidden md:block">
      <div className="flex justify-center items-center gap-10 z-10 text-gray-900 font-bold w-full">
        <div className="z-10">
          <div className="z-10">
            <div
              className="relative inline-block"
              onMouseLeave={handleMouseLeave}
            >
              <ul className="flex justify-center items-center capitalize gap-5 lg:gap-10 z-[500]">
                {categoriesArray?.map((item) => (
                  <li
                    key={item.category}
                    tabIndex={0}
                    className=" px-3"
                    onMouseEnter={() => handleMouseEnter(item.category)}
                  >
                    <p
                      style={{ navLinkStyles }}
                      to={`category/${item.category}`}
                    >
                      {item.category}
                    </p>
                    {subMenuVisible && hoveredCategory === item.category && (
                      <div
                        className="absolute z-50 mt-2 py-2 bg-white border rounded shadow-lg"
                        onMouseEnter={handleSubMenuEnter}
                        onMouseLeave={handleSubMenuLeave}
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white transition duration-300"
                        >
                          Item 1
                        </a>

                        {item.subcategories?.map((sub, idx) => (
                          <li className=" w-full px-2  mt-5 " key={idx}>
                            <p
                              style={{ navLinkStyles }}
                              to={{
                                pathname: `category/${item.category}`,
                                search: `?subcategory=${sub}`,
                              }}
                              className="flex items-center cursor-pointer my-2 font-bold  text-gray-800 hover:bg-blue-500  hover:text-white transition duration-300"
                            >
                              <span className=" font-bold text-sm ">
                                {sub}+
                              </span>
                            </p>
                          </li>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
