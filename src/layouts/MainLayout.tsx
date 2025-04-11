/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Container } from "@/layouts/Container";
import Navbar from "@/layouts/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Container className="py-6">
        <Outlet />
      </Container>
    </>
  );
}
