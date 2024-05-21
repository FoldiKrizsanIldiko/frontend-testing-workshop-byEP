import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Home from "../../src/Home";
import Search from "../../src/Search";
import Country from "../../src/Country";

describe("Path should change", () => {
  test("after start exploring countries", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/country/:cca3" element={<Country />}></Route>
        </Routes>
      </MemoryRouter>
    );
    expect(
      screen.getByText("🌎 Start exploring countries")
    ).toBeInTheDocument();
    const startButton = screen.getByText("🌎 Start exploring countries");
    await userEvent.click(startButton);
    expect(
      await screen.findByPlaceholderText("Filter by name")
    ).toBeInTheDocument();
  });

  test("after selecting countrie", async () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/country/:cca3" element={<Country />}></Route>
        </Routes>
      </MemoryRouter>
    );
    expect(
      await screen.findByPlaceholderText("Filter by name")
    ).toBeInTheDocument();
    //search for Japan
    const japanButton = screen.getByText("Japan common");
    await userEvent.click(japanButton);
    expect(await screen.findByText("Country info")).toBeInTheDocument();
  });
});
