# Physics Unit Converter

A modern, responsive web application for converting between SI, CGS, and atomic units for various physical quantities. Built with React and optimized for GitHub Pages deployment.

## 🚀 Live Demo

[Visit the Physics Unit Converter](https://your-username.github.io/unit-conversion-website)

## ✨ Features

- **Multiple Physical Quantities**: Convert length, energy, mass, time, velocity, electric field, magnetic field, force, pressure, and frequency
- **Three Unit Systems**: SI (International System), CGS (Centimeter-Gram-Second), and Atomic units
- **Real-time Conversion**: Enter a value in any unit system and see instant conversions to the other two
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Scientific Notation**: Handles very large and very small numbers
- **Educational Content**: Information about different unit systems and physical constants
- **Ad-Ready**: Prepared for monetization with Google AdSense

## 🧮 Supported Conversions

| Physical Quantity | SI Unit | CGS Unit | Atomic Unit |
|-------------------|---------|----------|-------------|
| Length | meters (m) | centimeters (cm) | Bohr radii (a₀) |
| Energy | Joules (J) | ergs (erg) | Hartree (Eh) |
| Mass | kilograms (kg) | grams (g) | electron masses (mₑ) |
| Time | seconds (s) | seconds (s) | atomic time units (ℏ/Eh) |
| Velocity | m/s | cm/s | atomic velocity units |
| Electric Field | V/m | statV/cm | atomic electric field units |
| Magnetic Field | Tesla (T) | Gauss (G) | atomic magnetic field units |
| Force | Newton (N) | dyne (dyn) | atomic force units |
| Pressure | Pascal (Pa) | dyne/cm² | atomic pressure units |
| Frequency | Hertz (Hz) | Hertz (Hz) | atomic frequency units |

## 🛠️ Technology Stack

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **CSS3** - Modern styling with gradients and animations
- **JavaScript** - Conversion calculations and logic

## 📦 Installation & Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/unit-conversion-website.git
cd unit-conversion-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 GitHub Pages Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   - Push your code to GitHub
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch or use GitHub Actions

3. **Automated Deployment** (Optional):
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## 💰 Monetization

The website is prepared for monetization with:
- Ad placement areas in the footer
- Google AdSense compatible structure
- SEO optimized for better search rankings
- Fast loading times for better ad performance

### Adding Google AdSense

1. Apply for Google AdSense approval
2. Add AdSense code to `index.html`
3. Replace the placeholder ad areas with actual ad units
4. Ensure compliance with AdSense policies

## 🔬 Physics Background

This converter supports three major unit systems:

### SI Units (International System)
The modern metric system used worldwide in science and engineering.

### CGS Units (Centimeter-Gram-Second)
A metric system commonly used in physics, especially in electromagnetic theory and astrophysics.

### Atomic Units
A system of natural units convenient for atomic physics and quantum chemistry. In this system:

- **Bohr radius (a₀)** = 5.29177 × 10⁻¹¹ m = 5.29177 × 10⁻⁹ cm
- **Hartree energy (Eh)** = 4.35974 × 10⁻¹⁸ J = 4.35974 × 10⁻¹¹ erg  
- **Electron mass (mₑ)** = 9.10938 × 10⁻³¹ kg = 9.10938 × 10⁻²⁸ g
- **Atomic time (ℏ/Eh)** = 2.41888 × 10⁻¹⁷ s

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Physical constants from NIST
- React and Vite communities
- Modern CSS design patterns
- Physics education resources

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**⭐ Star this repo if you find it useful!**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
