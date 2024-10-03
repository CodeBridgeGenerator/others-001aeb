import React from "react";
import { render, screen } from "@testing-library/react";

import ParentsDetailsPage from "../ParentsDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders parentsDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ParentsDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("parentsDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("parentsDetails-add-button")).toBeInTheDocument();
});
