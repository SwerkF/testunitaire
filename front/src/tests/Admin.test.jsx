import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Admin from "../pages/Admin";
import axios from "axios";

jest.mock("axios");

describe("Admin component", () => {
  it("fetches and displays events", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        "hydra:member": [
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
        ],
      },
    });

    render(<Admin />);

    await waitFor(() => {
      expect(screen.getByText("A great concert")).toBeInTheDocument();
      expect(screen.getByText("A fun festival")).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/eventss");
  });
});
