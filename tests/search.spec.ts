import { test, expect } from '@playwright/test';
import fs from "fs/promises"

test.use({
  locale: "en-US", 
  permissions: ["geolocation"], 
  geolocation: {latitude: 41.01384, longitude: 28.94966}
});

test.beforeEach(async ({context})=>{
    context.route(/forecast.*daily/, async route=>{
      const str = (await fs.readFile("./tests/data/mock-daily.json")).toString();
      const json = JSON.parse(str);
      console.log(json);
      route.fulfill({json});
    });
    context.route(/forecast.*hourly/, async route=>{
      const str = (await fs.readFile("./tests/data/mock-hourly.json")).toString();
      const json = JSON.parse(str);
      route.fulfill({json});
    });
    context.route(/forecast.*current/, async route=>{
      const str = (await fs.readFile("./tests/data/mock-current.json")).toString();
      const json = JSON.parse(str);
      route.fulfill({json});
    });
  })

test.describe("desktop search tests", ()=>{
    test("ctrl+k should trigger search on desktop", async ({page})=>{
        await page.goto("http://localhost:5173/weather-app");
        const trigger = page.getByTestId("desktop-search-trigger")
        const dialog = page.getByTestId("location-search-dialog");
        const input = page.getByTestId("desktop-search-input");
        await trigger.waitFor();
        await page.keyboard.press("Control+K");
        await dialog.waitFor({state: "attached"});
        await input.waitFor({state: "attached"});
        expect(dialog , "dialog should be open").toHaveAttribute("data-state", "open");
        expect(input , "input should be focused").toBeFocused();
    })
    test.describe("webkit only", ()=>{
        test.skip(({browserName}) => browserName!=="webkit", "webkit only");
        test("cmd+k should trigger search on desktop", async ({page})=>{
            await page.goto("http://localhost:5173/weather-app");
            const trigger = page.getByTestId("desktop-search-trigger")
            const dialog = page.getByTestId("location-search-dialog");
            const input = page.getByTestId("desktop-search-input");
            await trigger.waitFor();
            await page.keyboard.press("Meta+K");
            await dialog.waitFor({state: "attached"});
            await input.waitFor({state: "attached"});
            expect(dialog , "dialog should be open").toHaveAttribute("data-state", "open");
            expect(input , "input should be focused").toBeFocused();
        })
    })
})

test.describe("mobile search tests", ()=>{
    test.use({
        viewport: {width: 480, height: 800}
    })
    test("ctrl+k should trigger search on mobile", async ({page})=>{
        await page.goto("http://localhost:5173/weather-app");
        const input = page.getByTestId("mobile-search-input");
        const popover = page.getByTestId("mobile-search-popover");
        await input.waitFor({state:"attached"});
        await page.keyboard.press("Control+K");
        popover.waitFor({state: "attached"});
        expect(popover, "dialog should be open").toHaveAttribute("data-state", "open");
        expect(input, "input should be focused").toBeFocused();
    })
})