import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammeChoicePage from "../ProgrammeChoicePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programmeChoice page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammeChoicePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programmeChoice-datatable")).toBeInTheDocument();
    expect(screen.getByRole("programmeChoice-add-button")).toBeInTheDocument();
});
