import React from "react";
import { render, screen } from "@testing-library/react";
import Admin from "../pages/Admin";
import axios from "axios";

jest.mock("axios");

describe("Admin component", () => {
  it("fetches and displays events", async () => {
    const mockEvents = [
      {
        id: 1,
        title: "Concert",
        description: "A great concert",
        type: "concert",
        minimumAge: 18,
        imageUrl: "www.example.com/image.jpg",
      },
      {
        id: 2,
        title: "Festival",
        description: "A fun festival",
        type: "festival",
        minimumAge: 16,
        imageUrl: "www.example.com/festival.jpg",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockEvents });

    render(<Admin />);

    const concertName = await screen.findByText("A great concert");
    const festivalName = await screen.findByText("A fun festival");

    expect(concertName).toBeInTheDocument();
    expect(festivalName).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:8000/api/eventss");
  });
});

