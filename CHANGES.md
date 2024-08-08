# v0.4.0
- Revamped mobile UI
- Visual improvements throughout the app
- Added a toggle to hide location information from tab title for improved privacy
- Enabled auto-update for PWA
- Search can be triggered with ⌘K or ^K

### Technical changes
- The reducer and context for user preferences has been dropped entirely.
- All shared state is now managed in Zustand stores.
- Weather state is now shared across components and not passed by prop drilling.
- User preferences are now persisted in a key named `prefs` in `localStorage`. The old `options` key will be automatically migrated and removed if it's present.

# v0.3.0
- App can now be installed as a Progressive Web App
- Added support for automatic location detection (if location permission is given)
- Added abbreviated directions in wind tab
- Location search now remembers recent searches, displays local administartions, shows country flags and is tab-navigable
- Dropped browser prompts and added error components

# v0.2.0
- Support automatic timezone detection and UTC time

# v0.1.1
- Dynamic page title (ex. "26°C Istanbul | Weather")
- Language switcher
- Link to source code

# v0.1.0
- Initial release