const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

const galleryImages = [
  // Lawn Care
  { file: 'driveway-edging-lawn.png', alt: 'Professional driveway edging and lawn maintenance', category: 'lawn-care' },
  { file: 'zero-turn-mower-stone-wall.png', alt: 'Zero-turn mower on property with stone wall', category: 'lawn-care' },
  { file: 'fresh-paved-road-curbing.png', alt: 'Fresh paved road with professional curbing', category: 'lawn-care' },
  { file: 'fresh-paved-road-house.png', alt: 'Freshly paved road in front of house', category: 'lawn-care' },

  // Land Clearing
  { file: 'cleared-dirt-road-through-woods.png', alt: 'Cleared dirt road through wooded area', category: 'land-clearing' },
  { file: 'fallen-tree-land-clearing.png', alt: 'Land clearing with fallen tree removal', category: 'land-clearing' },
  { file: 'dirt-road-truck-tree-clearing.png', alt: 'Truck on dirt road during tree clearing project', category: 'land-clearing' },
  { file: 'trucks-parked-dirt-road-woods.png', alt: 'Work trucks parked on cleared dirt road', category: 'land-clearing' },
  { file: 'gravel-driveway-to-shed.png', alt: 'Gravel driveway installation leading to shed', category: 'land-clearing' },
  { file: 'gravel-parking-area-stop-sign.png', alt: 'Gravel parking area with stop sign', category: 'land-clearing' },
  { file: 'gravel-paving-work-building.png', alt: 'Gravel paving work near building', category: 'land-clearing' },
  { file: 'truck-gravel-driveway-worksite.png', alt: 'Work truck on gravel driveway at job site', category: 'land-clearing' },
  { file: 'work-truck-gravel-driveway.png', alt: 'Work truck on gravel driveway', category: 'land-clearing' },

  // Tree Services
  { file: 'tree-cutting-chainsaw-tractor.png', alt: 'Tree cutting with chainsaw from tractor', category: 'tree-services' },

  // Snow Removal
  { file: 'snow-clearing-narrow-path.png', alt: 'Snow clearing through narrow path', category: 'snow-removal' },
  { file: 'tractor-snow-clearing-path.png', alt: 'Tractor clearing snow on path', category: 'snow-removal' },
  { file: 'plow-trucks-parking-lot.png', alt: 'Plow trucks ready for snow removal', category: 'snow-removal' },

  // Drainage & Foundation
  { file: 'foundation-window-well-excavation.png', alt: 'Foundation window well excavation', category: 'drainage' },
  { file: 'egress-window-well-installation.png', alt: 'Egress window well installation', category: 'drainage' },
  { file: 'excavator-digging-near-building.png', alt: 'Excavator digging near building foundation', category: 'drainage' },
  { file: 'stone-walkway-drain-grate.png', alt: 'Stone walkway with drainage grate', category: 'drainage' },

  // Stone & Masonry
  { file: 'boulder-work-near-foundation.png', alt: 'Boulder placement near building foundation', category: 'stone-masonry' },
  { file: 'large-boulders-near-dumpster.png', alt: 'Large boulders for landscaping project', category: 'stone-masonry' },
  { file: 'stone-pile-house-background.png', alt: 'Stone materials for masonry work', category: 'stone-masonry' },
  { file: 'stone-retaining-wall-closeup.png', alt: 'Stone retaining wall close-up detail', category: 'stone-masonry' },
  { file: 'stone-wall-chain-link-fence.png', alt: 'Stone wall alongside chain link fence', category: 'stone-masonry' },
  { file: 'brick-patio-walkway.png', alt: 'Brick patio walkway installation', category: 'stone-masonry' },
  { file: 'stone-fire-pit-backyard-patio.png', alt: 'Stone fire pit on backyard patio', category: 'stone-masonry' },

  // Exterior Work
  { file: 'ladder-house-siding-chimney.png', alt: 'Exterior siding and chimney work', category: 'exterior' },
  { file: 'ladder-house-siding-chimney-2.png', alt: 'House exterior maintenance with ladder', category: 'exterior' },
  { file: 'ladder-house-siding-chimney-3.png', alt: 'Chimney and siding repair work', category: 'exterior' },
  { file: 'kubota-tractor-ladder-house.png', alt: 'Kubota tractor at exterior job site', category: 'exterior' },
  { file: 'kubota-tractor-ladder-house-2.png', alt: 'Equipment at house exterior project', category: 'exterior' },
  { file: 'house-rear-view-from-tractor.png', alt: 'House rear view from work equipment', category: 'exterior' },
  { file: 'house-christmas-lights-night.png', alt: 'Holiday light installation on house', category: 'exterior' },
  { file: 'house-christmas-lights-night-2.png', alt: 'Holiday lighting display on home exterior', category: 'exterior' },

  // Equipment & Other
  { file: 'kubota-excavator-worksite.png', alt: 'Kubota excavator at work site', category: 'equipment' },
  { file: 'red-enclosed-trailer-woods.png', alt: 'Enclosed work trailer', category: 'equipment' },
  { file: 'tractor-cab-dashboard-view.png', alt: 'View from tractor cab', category: 'equipment' },
  { file: 'glass-enclosure-installation.png', alt: 'Glass enclosure installation project', category: 'other' },
  { file: 'kitchen-renovation-in-progress.png', alt: 'Kitchen renovation in progress', category: 'other' },
  { file: 'wooden-sawhorses-lobster-traps-mulch.png', alt: 'Work materials and supplies on site', category: 'other' },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'lawn-care', label: 'Lawn Care' },
  { id: 'land-clearing', label: 'Land Clearing' },
  { id: 'tree-services', label: 'Tree Services' },
  { id: 'snow-removal', label: 'Snow Removal' },
  { id: 'drainage', label: 'Drainage & Foundation' },
  { id: 'stone-masonry', label: 'Stone & Masonry' },
  { id: 'exterior', label: 'Exterior Work' },
  { id: 'equipment', label: 'Equipment' },
];

app.get('/', (req, res) => {
  const featured = [
    galleryImages.find(img => img.file === 'stone-fire-pit-backyard-patio.png'),
    galleryImages.find(img => img.file === 'house-christmas-lights-night.png'),
    galleryImages.find(img => img.file === 'driveway-edging-lawn.png'),
    galleryImages.find(img => img.file === 'kubota-excavator-worksite.png'),
    galleryImages.find(img => img.file === 'snow-clearing-narrow-path.png'),
    galleryImages.find(img => img.file === 'stone-retaining-wall-closeup.png'),
  ];
  res.render('index', { currentPage: 'home', featured });
});

app.get('/gallery', (req, res) => {
  res.render('gallery', { currentPage: 'gallery', images: galleryImages, categories });
});

app.get('/about', (req, res) => {
  res.render('about', { currentPage: 'about' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
