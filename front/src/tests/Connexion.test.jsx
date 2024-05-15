import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Connexion from "../pages/Connexion";

describe("Connexion Component", () => {
    it("renders without crashing", () => {
        render(<Connexion />);
    });

    it("displays the login form", () => {
        const { getByLabelText } = render(<Connexion />);
        expect(getByLabelText("Email")).toBeInTheDocument();
        expect(getByLabelText("Password")).toBeInTheDocument();
    });

    it("updates the email input value", () => {
        const { getByLabelText } = render(<Connexion />);
        const emailInput = getByLabelText("Email");
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        expect(emailInput.value).toBe("test@example.com");
    });

    it("updates the password input value", () => {
        const { getByLabelText } = render(<Connexion />);
        const passwordInput = getByLabelText("Password");
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        expect(passwordInput.value).toBe("password123");
    });

    it("submits the form when the button is clicked", () => {
        const { getByLabelText, getByText } = render(<Connexion />);
        const emailInput = getByLabelText("Email");
        const passwordInput = getByLabelText("Password");
        const submitButton = getByText("Submit");

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);
    });
});