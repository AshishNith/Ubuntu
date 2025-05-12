# Ubuntu OS Replica

A web-based replica of the Ubuntu operating system interface built with React and Vite. This project aims to recreate the look and feel of Ubuntu 22.04 LTS in the browser.

![Ubuntu OS Replica Screenshot](screenshot.png)

## Features

- 🖥️ Authentic Ubuntu desktop environment
- 🪟 Draggable and resizable windows
- 🎨 System UI components (dock, top bar, menus)
- 📸 Working camera application
- 📁 File explorer interface
- ⌨️ Terminal emulator
- ⚙️ Settings panel
- 🌡️ Real-time weather updates
- 🕒 Live clock and date
- 📍 Location-based features

## Tech Stack

- React 19
- Vite 6
- TailwindCSS
- GSAP
- React Router DOM
- Remix Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/UbuntuOSReplica.git
```

2. Install dependencies:
```bash
cd UbuntuOSReplica
npm install
```

3. Add your API keys:
   - OpenWeatherMap API key for weather data
   - OpenCage API key for geocoding

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
UbuntuOSReplica/
├── src/
│   ├── components/     # Reusable UI components
│   ├── windows/        # Window applications
│   ├── contexts/       # React contexts
│   ├── hooks/         # Custom hooks
│   └── pages/         # Main pages
├── public/            # Static assets
└── ...config files
```

## Features in Detail

### Window Management
- Draggable windows using custom hooks
- Window focus management
- Z-index handling

### System Applications
- **Camera**: Access to device cameras, photo capture
- **Terminal**: Basic command emulation
- **Files**: File system navigation interface
- **Settings**: System settings interface

### System UI
- Dock with application shortcuts
- Top bar with system indicators
- Weather and location information
- Real-time clock and date

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ubuntu design team for the original interface design
- React team for the amazing framework
- TailwindCSS team for the utility-first CSS framework
