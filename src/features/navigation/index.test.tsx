import { cleanup, render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import App from "../../App";
import { IconClassnames } from "./types";
afterEach(cleanup);

it("check if navigation works correctly with routes", async ()=>{
    render(<App></App>)
    const user = userEvent.setup();
    
    
    // check for default route
    let links = screen.getAllByTestId("nav-link");
    let icons = screen.getAllByTestId("nav-icon");
    expect(icons.length, "do icons exist?").toBe(3);
    expect(links.length, "do links exist?").toBe(3);
    expect(icons[0].classList.contains(IconClassnames.HOME_ACTIVE), "is home icon filled?").toBe(true);
    expect(icons[1].classList.contains(IconClassnames.LOCATIONS_INACTIVE)).toBe(true);
    expect(icons[2].classList.contains(IconClassnames.SETTINGS_INACTIVE)).toBe(true);

    await user.click(links[1]);
    // check for locations route
    links = screen.getAllByTestId("nav-link");
    icons = screen.getAllByTestId("nav-icon");
    expect(icons.length, "do icons exist?").toBe(3);
    expect(links.length, "do links exist?").toBe(3);
    expect(icons[0].classList.contains(IconClassnames.HOME_INACTIVE)).toBe(true);
    expect(icons[1].classList.contains(IconClassnames.LOCATIONS_ACTIVE)).toBe(true);
    expect(icons[2].classList.contains(IconClassnames.SETTINGS_INACTIVE)).toBe(true);

    await user.click(links[2])
    // check for settings route
    links = screen.getAllByTestId("nav-link");
    icons = screen.getAllByTestId("nav-icon");
    expect(icons.length, "do icons exist?").toBe(3);
    expect(links.length, "do links exist?").toBe(3);
    expect(icons[0].classList.contains(IconClassnames.HOME_INACTIVE)).toBe(true);
    expect(icons[1].classList.contains(IconClassnames.LOCATIONS_INACTIVE)).toBe(true);
    expect(icons[2].classList.contains(IconClassnames.SETTINGS_ACTIVE), "is settings icon filled?").toBe(true);
}) 