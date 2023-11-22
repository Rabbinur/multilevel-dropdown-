"use client";

import { useEffect, useRef, useState } from "react";

const Menu = [
  {
    title: "laptop",
    id: 1,
    link: "/laptop",
    submenu: [
      {
        title: "All Laptop",
        id: 2,
        link: "/asus",
        submenu: [
          {
            title: "Asus",
            id: 3,
            link: "/asus",
          },
          {
            title: "HP",
            id: 4,
            link: "/dell",
          },
        ],
      },
      {
        title: "Dell",
        id: 5,
        link: "/dell",
        submenu: [
          {
            title: "md1",
            id: 6,
            link: "/asus",
          },
          {
            title: "md2",
            id: 7,
            link: "/dell",
          },
        ],
      },
    ],
  },
  {
    title: "Mouse",
    id: 8,
    link: "/laptop",
    submenu: [
      {
        title: "logisus",
        id: 9,
        link: "/asus",
      },
      {
        title: "hp k",
        id: 10,
        link: "/dell",
      },
    ],
  },

  {
    title: "TV",
    id: 11,
    link: "/tv",
    submenu: [],
  },
  {
    title: "Motion",
    id: 12,
    link: "/tv",
    submenu: [
      {
        title: "keyboard",
        id: 13,
        link: "/laptop",
        submenu: [
          {
            title: "asus",
            id: 14,
            link: "/asus",
          },
          {
            title: "Dell",
            id: 15,
            link: "/dell",
            submenu: [
              {
                title: "asus",
                id: 16,
                link: "/asus",
              },
              {
                title: "Dell",
                id: 17,
                link: "/dell",
              },
            ],
          },
        ],
      },
    ],
  },
];

const Headers = () => {
  const myref = useRef();
  const [menuStatus, setMenuStatus] = useState([]);
  useEffect(() => {
    function removeMenu(event) {
      if (myref.current && !myref.current.contains(event.target)) {
        setMenuStatus([]);
      }
    }

    // Add event listener when the component mounts
    window.addEventListener("mousedown", removeMenu);

    // Cleanup: remove event listener when the component unmounts
    return function cleanupListener() {
      window.removeEventListener("mousedown", removeMenu);
    };
  }, []);
  return (
    <div>
      <ul className="flex justify-center items-center ">
        {Menu.map((item, i) => {
          return (
            <CreateMenu
              item={item}
              depth={0}
              menuStatus={menuStatus}
              setMenuStatus={setMenuStatus}
              myref={myref}
            />
          );
        })}
      </ul>
    </div>
  );
};

const CreateMenu = ({ item, depth, menuStatus, setMenuStatus, myref }) => {
  const handleMouseEnter = (item, depth) => {
    if (depth == 0) {
      setMenuStatus([]);
    }
    if (item.submenu) {
      setMenuStatus((oldArray) => [...oldArray, item.id]); //pushing id array in array
    }
  };

  if (item.submenu) {
    return (
      <li
        ref={myref}
        onMouseEnter={(e) => handleMouseEnter(item, depth)}
        className="px-3 relative py-3 border-2
       border-gray-300 bg-black text-white "
      >
        {item.title}{" "}
        <ul
          className={` ${
            menuStatus && menuStatus.find((v) => v === item.id)
              ? "block"
              : "hidden"
          } ${
            depth == 0 ? "top-12 left-0" : "left-0 top-0 ml-[calc(100%)]"
          } absolute`}
        >
          {item.submenu.map((subitem) => {
            return (
              <CreateMenu
                key={subitem.id}
                item={subitem}
                depth={depth + 1}
                menuStatus={menuStatus}
                setMenuStatus={setMenuStatus}
                myref={myref}
              />
            );
          })}
        </ul>
      </li>
    );
  } else {
    return (
      <li
        onMouseEnter={(e) => handleMouseEnter(item, depth)}
        className="px-2 py-3 border-2  bg-black text-white"
      >
        {item.title}
      </li>
    );
  }
};
export default Headers;
