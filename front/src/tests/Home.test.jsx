import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Home from "../pages/home";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("Home Component", () => {
  const mockEvents = [
    {
      title: "Event 1",
      image: "image1.jpg",
      date: "2023-05-01",
      description: "Description 1",
      minimumAge: 18,
      buttonText: "Button 1",
      footerText: "Footer 1",
    },
    {
      title: "Event 2",
      image: "image2.jpg",
      date: "2023-06-01",
      description: "Description 2",
      minimumAge: 18,
      buttonText: "Button 2",
      footerText: "Footer 2",
    },
    {
      title: "Event 3",
      image: "image3.jpg",
      date: "2023-07-01",
      description: "Description 3",
      minimumAge: 18,
      buttonText: "Button 3",
      footerText: "Footer 3",
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        "hydra:member": mockEvents,
      },
    });
  });

  test("should render the Home component", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Vérifiez que le titre principal est rendu
    
    expect(screen.getByText(/RESERVER UNE PLACE POUR/i)).toBeInTheDocument();
    expect(screen.getByText(/NOS EVENEMENTS/i)).toBeInTheDocument();

  });

  test("should fetch and display events", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Attendez que les événements soient rendus
    await waitFor(() => {
      expect(screen.getByText(/Event 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Event 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Event 3/i)).toBeInTheDocument();
    });
  });

  test("should render the image and description of the history section", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Vérifiez que l'image et la description de l'histoire du Havre sont présentes
    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      "https://i-de.unimedias.fr/2023/12/07/detle-havre-archi21-lehavrecpatricelebris-otah-6571e6617e6f8.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=max&w=1050"
    );
    expect(screen.getByText(/Histoire du Havre/i)).toBeInTheDocument();
  });
});
