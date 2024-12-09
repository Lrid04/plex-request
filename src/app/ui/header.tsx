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
import { useState } from "react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <Navbar shouldHideOnScroll isBordered onMenuOpenChange={setIsMenuOpen} maxWidth="full" className=" bg-primary">
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1 className="text-left">Plex Request</h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-5" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href={"/"} aria-current="page">
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
        <Button as={Link} href="#">Admin</Button>
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
