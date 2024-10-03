import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammeChoiceCreateDialogComponent from "../ProgrammeChoiceCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programmeChoice create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammeChoiceCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programmeChoice-create-dialog-component")).toBeInTheDocument();
});
