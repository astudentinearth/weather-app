import { test, expect } from '@playwright/test';

test.use({
  locale: "en-US", 
  permissions: ["geolocation"], 
  geolocation: {latitude: 41.01384, longitude: 28.94966}
});


test('has title', async ({ page}) => {
  await page.goto('http://localhost:5173/weather-app');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Weather/);
});

test('title is private', async ({ page }) => {
  await page.goto('http://localhost:5173/weather-app');
  await expect(page).not.toHaveTitle(/\|/); // a non-private title would look like "temp location | Weather"
});


test('title privacy can be toggled', async ({page})=>{
  await page.goto('http://localhost:5173/weather-app');
  await page.getByTestId('desktop-settings-popover-trigger').click();
  await page.getByTestId('title-privacy-switch').click();
  expect(await page.getByTestId('title-privacy-switch')).toHaveAttribute("data-state", "checked");
  expect(page).toHaveTitle(/°/); // we expect a temperature
  const prefs = await page.evaluate(()=>JSON.parse(window.localStorage.getItem('prefs') ?? ""));
  expect(prefs.state.displayLocationOnTitle).toBe(true);
})