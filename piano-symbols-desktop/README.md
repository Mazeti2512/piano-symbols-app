# Piano Symbols Desktop

A small offline desktop app for beginner piano students to learn sheet music symbols.

## No npm on your computer? Use GitHub Actions

You do not need to install Node.js or npm if you only want GitHub to build the Windows installer for you.

1. Create a new GitHub repository.
2. Upload all files from this project into that repository.
3. Go to the repository's **Actions** tab.
4. Open **Build Windows Installer**.
5. Click **Run workflow**.
6. Wait until the build finishes.
7. Download the generated artifact named `piano-symbols-windows-installer`.
8. Inside it, you will find `Piano-Symbols-Setup-1.0.0.exe`.

## Local development

If you want to run this app on your computer, install Node.js first. npm is included with Node.js.

```bash
npm install
npm run dev
```

## Run as desktop app locally

```bash
npm run electron:dev
```

## Build Windows installer locally

```bash
npm run dist
```

The installer will appear in the `release` folder.

## Notes

This app does not use external icon libraries. Progress is stored locally using `localStorage`.
