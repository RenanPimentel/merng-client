import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

function Navbar() {
  const { login, logout, user } = useContext(AuthContext);
  const history = useHistory();
  const [activeItem, setActiveItem] = useState("");
  const [menuItems] = useState([
    { name: "home", position: "left", location: "/" },
    { name: "login", position: "right", location: "/login" },
    { name: "register", position: "right", location: "/register" },
  ]);

  const handleItemClick = (_, { name }) => setActiveItem(name);

  useEffect(() => {
    const { pathname } = history.location;
    const item = menuItems.find(item => item.location.includes(pathname));
    setActiveItem(item ? item.name : "home");
  }, [history, menuItems]);

  if (user) {
    return (
      <div>
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Menu position="left">
            <Menu.Item
              name={user.username}
              active={true}
              onClick={handleItemClick}
              as={Link}
              to={"/"}
            />
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={logout} />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }

  return (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Menu position="left">
          {menuItems
            .filter(item => item.position === "left")
            .map(item => (
              <Menu.Item
                name={item.name}
                active={activeItem === item.name}
                onClick={handleItemClick}
                as={Link}
                to={item.location}
                key={item.location}
              />
            ))}
        </Menu.Menu>
        <Menu.Menu position="right">
          {menuItems
            .filter(item => item.position === "right")
            .map(item => (
              <Menu.Item
                name={item.name}
                active={activeItem === item.name}
                onClick={handleItemClick}
                as={Link}
                to={item.location}
                key={item.location}
              />
            ))}
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Navbar;
