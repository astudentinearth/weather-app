import { getIconSourceFromWeatherCode } from "./Weathercode";

const prefix = "icons";

it("check if correct time variant of icons are returned",()=>{
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023,0,1,20,0,0)); // January 1st, 2023, 8PM
    expect(getIconSourceFromWeatherCode(0),"should return night variant in evening (clear)").toBe(`${prefix}/clear_night.svg`);
    expect(getIconSourceFromWeatherCode(1),"should return night variant in evening (mainly clear)").toBe(`${prefix}/clear_night.svg`);
    expect(getIconSourceFromWeatherCode(2),"should return night variant in evening (partly cloudy)").toBe(`${prefix}/partly_cloudy_night.svg`);

    vi.setSystemTime(new Date(2023,0,1,4,0,0)); // January 1st, 2023, 4AM
    expect(getIconSourceFromWeatherCode(0),"should return night variant at night (clear)").toBe(`${prefix}/clear_night.svg`);
    expect(getIconSourceFromWeatherCode(1),"should return night variant at night (mainly clear)").toBe(`${prefix}/clear_night.svg`);
    expect(getIconSourceFromWeatherCode(2),"should return night variant at night (partly cloudy)").toBe(`${prefix}/partly_cloudy_night.svg`);

    vi.setSystemTime(new Date(2023,0,1,8,0,0)); // January 1st, 2023, 8AM
    expect(getIconSourceFromWeatherCode(0),"should return day variant in daytime (clear)").toBe(`${prefix}/clear.svg`);
    expect(getIconSourceFromWeatherCode(1),"should return night variant in daytime (mainly clear)").toBe(`${prefix}/clear.svg`);
    expect(getIconSourceFromWeatherCode(2),"should return day variant in daytime (partly cloudy)").toBe(`${prefix}/partly_cloudy.svg`);
})

it("check if non-time dependent icons are returned correctly",()=>{
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023,0,1,20,0,0)); // January 1st, 2023, 8PM
    expect(getIconSourceFromWeatherCode(63),"returns correctly in evening").toBe(`${prefix}/rain_2.svg`);
    vi.setSystemTime(new Date(2023,0,1,4,0,0)); // January 1st, 2023, 4AM
    expect(getIconSourceFromWeatherCode(63),"returns correctly in morning").toBe(`${prefix}/rain_2.svg`);
})