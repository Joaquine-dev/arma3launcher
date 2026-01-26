# Arma 3 Launcher

A modern, feature-rich launcher for Arma 3 built with Electron, React, and TypeScript.

## Features

- **Automatic Mod Synchronization** - Delta-based mod updates with parallel downloads (3x faster)
- **Server Status Monitoring** - Real-time player count, ping, and server info via Steam Query
- **Auto-Update** - Automatic launcher updates via GitHub releases
- **TFAR Integration** - One-click Task Force Radio plugin installation
- **Modern UI** - Responsive design with military-themed aesthetics
- **Multi-Language** - French interface with configurable settings

## Screenshots

The launcher features a clean, modern interface with:
- Home tab with server status and quick join
- News feed from server
- Mod management with progress tracking
- Useful links section
- Settings configuration

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- Windows OS (for building Windows executables)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Joaquine-dev/arma3launcher.git
   cd arma3launcher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Find the installer**
   The built installer will be located in:
   ```
   release/1.0.0/arma 3 Launcher-Windows-1.0.0-Setup.exe
   ```

### Publishing a Release

To publish a release with auto-update support:
```bash
npm run release
```

This requires a `GH_TOKEN` environment variable with a GitHub personal access token.

## Configuration

### Server Configuration

Edit `src/config/config.ts` to configure your server:

```typescript
export const config = {
  launcher: {
    name: "Your Launcher Name",
    version: "1.0.0",
  },
  servers: [
    {
      id: "1",
      name: "Your Server Name",
      ip: "your.server.ip",
      port: 2302,
      queryPort: 2303,
      maxSlots: 64,
      isDefault: true
    }
  ],
  mods: {
    folderName: "@YourMod",
    urlMods: "http://your-server/mods",
    urlRessources: "http://your-server/ressources",
    manifestUrl: "http://your-server/mods/manifest.json",
  },
  // ... other configuration
};
```

### Server-Side Setup

You need to host the mod files with a manifest. The `docker/` folder contains example configurations:

1. **Nginx** - Serves mod files and manifest
2. **Manifest Generator** - Generates SHA256 hashes for mod files
3. **File Watcher** - Auto-regenerates manifest when files change

## Architecture

```
arma3launcher/
├── src/                    # React frontend
│   ├── App.tsx            # Main application component
│   └── config/            # Configuration files
├── electron/              # Electron main process
│   ├── main.ts           # Entry point
│   ├── preload.ts        # IPC bridge
│   ├── ipcHandler.ts     # IPC handlers
│   └── services/         # Backend services
│       ├── ManifestService.ts    # Mod verification
│       ├── ModDownloadService.ts # Download with resume
│       ├── NewsService.ts        # News fetching
│       └── SteamQueryService.ts  # Server status
├── docker/               # Server infrastructure
└── release/              # Built installers
```

## Performance Optimizations

- **Parallel Downloads** - 3 concurrent downloads for faster mod sync
- **Steam Query Cache** - 60-second cache to reduce network requests
- **React useReducer** - Centralized state management for better performance
- **React.memo** - Memoized components to prevent unnecessary re-renders
- **Delta Updates** - Only download changed files based on manifest comparison

## Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Material-UI
- **Desktop**: Electron 28
- **Build**: Vite 5, electron-builder
- **Server Query**: steam-server-query (A2S protocol)
- **Auto-Update**: electron-updater

## License

This project is open source. See the repository for license details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/Joaquine-dev/arma3launcher/issues) page.
