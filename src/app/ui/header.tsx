"use client";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarBrand,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Authorization from "../lib/authorized";
import ThemeSwitcher from "./themeSwitch";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [href, setHref] = useState("/login");
  useEffect(() => {
      isAuthorized();
    });
  
    async function isAuthorized() {
      if (await Authorization()) {
        setHref("/admin")
      }
    }
  
  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="bg-primary">
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1 className="text-left font-black text-2xl md:text-4xl">Plex Request</h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-5" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href={"/"}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"/requested"}>
            Requests
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"/collection"}>
            Library
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher/>
        <Button as={Link} variant="shadow" color="secondary" href={href}>Admin</Button>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="foreground" href={"/"}>
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" href={"/requested"}>
            Requests
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" href={"/collection"}>
            Library
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
