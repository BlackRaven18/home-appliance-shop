import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Summary from "../../../view/Summary/Summary";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ShoppingCartReducer, { clearShoppingCart } from "../../../redux/ShoppingCartReducer";
import axios from "axios";

describe("Summary component", () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore(ShoppingCartReducer);
    });

    afterEach(() => {
        store.dispatch(clearShoppingCart());
    });

    it("renders summary information correctly", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Summary />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("Podsumowanie")).toBeInTheDocument();
        expect(screen.getByText("Koszyk jest pusty")).toBeInTheDocument();
        expect(screen.getByText("Liczba produktów: 0")).toBeInTheDocument();
        expect(screen.getByText("Całkowity koszt: 0 zł")).toBeInTheDocument();
    });

    it("selects delivery method correctly", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Summary />
                </MemoryRouter>
            </Provider>
        );

        const odbiorOsobistyRadio = screen.getByLabelText("Odbiór osobisty");
        const kurierRadio = screen.getByLabelText("Kurier");

        fireEvent.click(kurierRadio);

        expect(odbiorOsobistyRadio).not.toBeChecked();
        expect(kurierRadio).toBeChecked();
        expect(screen.getByText("Metody dostawy:")).toBeInTheDocument();
    });

    it("dispatches clearShoppingCart action on successful transaction", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Summary />
                </MemoryRouter>
            </Provider>
        );

        const mockClearShoppingCart = jest.fn();
        store.dispatch = mockClearShoppingCart;

        const odbiorOsobistyRadio = screen.getByLabelText("Odbiór osobisty");
        const payButton = screen.getByRole("button", { name: "Zapłać" });

        fireEvent.click(odbiorOsobistyRadio);
        fireEvent.click(payButton);

        await waitFor(() => {
            expect(mockClearShoppingCart).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText("Payment Success")).toBeInTheDocument();
    });

    it("displays payment failure message on failed transaction", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Summary />
                </MemoryRouter>
            </Provider>
        );

        const mockAxiosPost = jest.spyOn(axios, "post");
        mockAxiosPost.mockRejectedValueOnce({
            response: {
                data: {
                    status: "failed",
                    message: "Payment failed!",
                },
            },
        });

        const odbiorOsobistyRadio = screen.getByLabelText("Odbiór osobisty");
        const payButton = screen.getByRole("button", { name: "Zapłać" });

        fireEvent.click(odbiorOsobistyRadio);
        fireEvent.click(payButton);

        await waitFor(() => {
            expect(screen.getByText("Payment failed!. Payment failed!")).toBeInTheDocument();
        });

        mockAxiosPost.mockRestore();
    });
});
