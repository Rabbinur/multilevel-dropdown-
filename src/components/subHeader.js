"use client";

const Menu = [
  {
    title: "Home",
    id: 1,
    link: "/home",
  },
  {
    title: "Products",
    id: 2,
    link: "/products",
    submenu: [
      {
        title: "Laptops",
        id: 3,
        link: "/laptops",
        submenu: [
          {
            title: "Asus",
            id: 4,
            link: "/asus",
          },
          {
            title: "Dell",
            id: 5,
            link: "/dell",
          },
        ],
      },
      {
        title: "Smartphones",
        id: 6,
        link: "/smartphones",
      },
    ],
  },
  {
    title: "About Us",
    id: 7,
    link: "/about",
  },
];
import React, { useState, useRef, useEffect } from "react";

const DropdownMenu = ({ item, depth, parentOffset }) => {
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const timeoutRef = useRef(null);
  const submenuOffset = depth === 1 ? parentOffset : "ml-0";
  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubMenuVisible(true);
    }
  };

  const handleMouseLeave = () => {
    // Add a delay before hiding the submenu
    timeoutRef.current = setTimeout(() => {
      setSubMenuVisible(false);
    }, 300); // Adjust the delay as needed
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

  return (
    <li
      className="relative group px-4 py-2 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={item.link} className="text-white">
        {item.title}
      </a>
      {item.submenu && subMenuVisible && (
        <ul
          className={`absolute  left-0 ${submenuOffset} top-10 
            
             bg-red-300 space-y-2 `}
          onMouseEnter={handleSubMenuEnter}
          onMouseLeave={handleSubMenuLeave}
          // Adjust the spacing between menu items
        >
          {" "}
          {item.submenu.map((subItem) => (
            <DropdownMenu
              key={subItem.id}
              item={subItem}
              depth={depth + 1}
              parentOffset={submenuOffset}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const Header = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex  space-x-4">
        {Menu.map((item) => (
          <DropdownMenu
            key={item.id}
            item={item}
            depth={0}
            parentOffset="-ml-10"
          />
        ))}
      </ul>
    </nav>
  );
};

export default Header;
