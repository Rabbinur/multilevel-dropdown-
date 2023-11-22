"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Multilevel = () => {
  const [categoriesArray, setCategoriesArray] = useState([
    {
      category: "Category 1",
      subcategories: [
        { subcategory: "Subcategory 1.1" },
        { subcategory: "Subcategory 1.2" },
      ],
    },
    {
      category: "Category 2",
      subcategories: [
        {
          subcategory: "Subcategory 2.1",
          subsubcategories: [
            { subsubcategory: "Subsubcategory 2.1.1" },
            { subsubcategory: "Subsubcategory 2.1.2" },
          ],
        },
        { subcategory: "Subcategory 2.2" },
      ],
    },
    { category: "Category 3" },
  ]);

  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [subSubMenuVisible, setSubSubMenuVisible] = useState(false);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);
  const [clickedSubCategory, setClickedSubCategory] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSubMenuVisible(false);
      setSubSubMenuVisible(false);
    }, 300);
  };

  const handleSubMenuEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleSubMenuLeave = () => {
    if (!clickedSubCategory) {
      setSubMenuVisible(false);
      setSubSubMenuVisible(false);
    }
  };

  const handleSubSubMenuEnter = (subCategory) => {
    setHoveredSubCategory(subCategory);
    setSubMenuVisible(true);
    setSubSubMenuVisible(true);
  };

  const handleSubSubMenuLeave = () => {
    setSubSubMenuVisible(false);
  };

  const handleLinkClick = (subCategory) => {
    setClickedSubCategory(subCategory);
    setSubMenuVisible(true);
    setSubSubMenuVisible(true);
  };

  useEffect(() => {
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
                    className="dropdown px-3"
                    onMouseEnter={() => handleMouseEnter(item.category)}
                  >
                    <Link
                      href=""
                      style={{ navLinkStyles }}
                      to={`category/${item.category}`}
                    >
                      {item.category}
                    </Link>
                    {subMenuVisible && hoveredCategory === item.category && (
                      <div
                        className="absolute z-50 mt-2 py-2 bg-white border rounded shadow-lg"
                        onMouseEnter={handleSubMenuEnter}
                        onMouseLeave={handleSubMenuLeave}
                      >
                        {item.subcategories && (
                          <ul className="flex flex-col items-start">
                            {item.subcategories.map((subItem) => (
                              <li
                                key={subItem.subcategory}
                                className="dropdown-sub px-4 py-2"
                                onMouseEnter={() =>
                                  handleSubSubMenuEnter(subItem.subcategory)
                                }
                              >
                                <Link
                                  href=""
                                  to={`category/${item.category}/${subItem.subcategory}`}
                                  onClick={() =>
                                    handleLinkClick(subItem.subcategory)
                                  }
                                >
                                  {subItem.subcategory}
                                </Link>
                                {subSubMenuVisible &&
                                  hoveredSubCategory ===
                                    subItem.subcategory && (
                                    <div
                                      className="absolute z-50 mt-2 py-2 bg-white border rounded shadow-lg"
                                      onMouseEnter={handleSubSubMenuEnter}
                                      onMouseLeave={handleSubSubMenuLeave}
                                    >
                                      {subItem.subsubcategories && (
                                        <ul className="flex flex-col items-start">
                                          {subItem.subsubcategories.map(
                                            (subSubItem) => (
                                              <li
                                                key={subSubItem.subsubcategory}
                                                className="dropdown-sub-sub px-4 py-2"
                                              >
                                                <Link
                                                  href=""
                                                  to={`category/${item.category}/${subItem.subcategory}/${subSubItem.subsubcategory}`}
                                                >
                                                  {subSubItem.subsubcategory}
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  )}
                              </li>
                            ))}
                          </ul>
                        )}
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

export default Multilevel;
