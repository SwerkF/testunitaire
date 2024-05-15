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
        name: "Concert",
        description: "A great concert",
        type: "concert",
        ageMinimum: 18,
        imageUrl: "path/to/image1.jpg",
      },
      {
        id: 2,
        name: "Festival",
        description: "A fun festival",
        type: "festival",
        ageMinimum: 16,
        imageUrl: "path/to/image2.jpg",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockEvents });

    render(<Admin />);

    const concertName = await screen.findByText("A great concert");
    const festivalName = await screen.findByText("A fun festival");

    expect(concertName).toBeInTheDocument();
    expect(festivalName).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/events ");
  });
});


