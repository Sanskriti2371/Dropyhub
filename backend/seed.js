const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const MerchantOffer = require('./models/MerchantOffer');
const Click = require('./models/Click');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dealbridge';

const productsData = [
  // ==================== WATCHES ====================
  {
    product: {
      name: "Casio G-Shock GA-2100 'CasiOak' All-Black Resin Watch",
      brand: 'Casio',
      model: 'GA-2100-1A1DR',
      variant: 'All Black Carbon Core Guard',
      category: 'Watches',
      description: 'The octagonal bezel and carbon-infused resin core guard case offer extreme shock resistance in a sleek, slim profile. Features analog-digital display and 200m water resistance.',
      specifications: {
        caseDiameter: '45.4 mm',
        movement: 'Quartz Analog-Digital',
        waterResistance: '200 Meters / 20 Bar',
        batteryLife: 'Approx. 3 years on SR726W x 2',
        weight: '51 g'
      },
      images: [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 88
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 7995,
        productUrl: 'https://www.amazon.in/dp/B07VPW8D65?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 8195,
        productUrl: 'https://www.flipkart.com/casio-ga-2100-1a1dr-g-shock-analog-digital-watch-men/p/itm4b29bb804473b',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 8495,
        productUrl: 'https://www.tatacliq.com/casio-g-shock-ga-2100-1a1dr-analog-digital-watch/p-mp000000006240224',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Fossil Gen 6 Smartwatch 44mm Smoke Stainless Steel',
      brand: 'Fossil',
      model: 'FTW4059',
      variant: 'Smoke Stainless Steel 44mm',
      category: 'Watches',
      description: 'Powered by Snapdragon Wear 4100+ for fast app response and improved battery longevity. Measures SpO2, heart rate, and steps with built-in GPS and Wear OS.',
      specifications: {
        screenSize: '1.28 inch Color AMOLED',
        processor: 'Qualcomm Snapdragon Wear 4100+',
        connectivity: 'Bluetooth 5.0 LE, Wi-Fi, NFC, GPS',
        battery: '24 hours + multi-day extended mode',
        os: 'Wear OS by Google'
      },
      images: [
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 54
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 14995,
        productUrl: 'https://www.amazon.in/dp/B09B2SKZ4W?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 15499,
        productUrl: 'https://www.flipkart.com/fossil-gen-6-smartwatch/p/itm8ec36da9bf6a7',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 15990,
        productUrl: 'https://www.croma.com/fossil-gen-6-smartwatch-with-activity-tracker/p/244342',
        availability: true
      }
    ]
  },
  {
    product: {
      name: "Titan Neo Analog Blue Dial Men's Stainless Steel Watch",
      brand: 'Titan',
      model: '1805QM01',
      variant: 'Sunray Navy Blue Dial Metal Strap',
      category: 'Watches',
      description: 'A timeless dress watch crafted with a stainless steel case and link bracelet. The rich sunray blue dial features clean stick hour markers and dual-tone detailing.',
      specifications: {
        movement: 'Quartz',
        caseThickness: '8.8 mm',
        dialColor: 'Blue',
        strapMaterial: 'Stainless Steel',
        warranty: '2 Years Manufacturer Warranty'
      },
      images: [
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 42
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 5495,
        productUrl: 'https://www.amazon.in/dp/B07D3H52P8?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 5295,
        productUrl: 'https://www.tatacliq.com/titan-1805qm01-neo-analog-watch/p-mp000000004512991',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 5495,
        productUrl: 'https://www.flipkart.com/titan-neo-analog-watch-men/p/itmf3z8hgwchgz9g',
        availability: true
      }
    ]
  },
  {
    product: {
      name: "Seiko 5 Sports Automatic Black Dial Watch 'Suit Style'",
      brand: 'Seiko',
      model: 'SRPD55K1',
      variant: 'Black Dial Stainless Steel 42.5mm',
      category: 'Watches',
      description: 'Iconic entry-level automatic sports watch featuring Calibre 4R36 automatic movement with manual winding capacity, day-date window, and 100m water resistance.',
      specifications: {
        movement: 'Calibre 4R36 Automatic with manual winding',
        powerReserve: 'Approx. 41 hours',
        jewels: '24 Jewels',
        crystal: 'Hardlex Crystal',
        caseSize: '42.5 mm diameter, 13.4 mm thickness'
      },
      images: [
        'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 95
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 23500,
        productUrl: 'https://www.amazon.in/dp/B07WGNK448?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 24000,
        productUrl: 'https://www.tatacliq.com/seiko-5-sports-srpd55k1-automatic-watch/p-mp000000005781902',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 23900,
        productUrl: 'https://www.flipkart.com/seiko-5-sports-analog-watch-men/p/itmfgzz7qfh4y5c9',
        availability: true
      }
    ]
  },

  // ==================== SMARTPHONES ====================
  {
    product: {
      name: 'Apple iPhone 15 128GB Blue',
      brand: 'Apple',
      model: 'iPhone 15',
      variant: '128GB Blue',
      category: 'Smartphones',
      description: 'Dynamic Island brings alerts and live activities forward. Features a 48MP main camera with 2x Telephoto, durable color-infused glass back, and universal USB-C charging.',
      specifications: {
        display: '6.1-inch Super Retina XDR OLED',
        chip: 'A16 Bionic with 5-core GPU',
        camera: '48MP Main + 12MP Ultra Wide',
        storage: '128GB',
        connector: 'USB-C with USB 2 support'
      },
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 165
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 69900,
        productUrl: 'https://www.amazon.in/dp/B0CHX1W1XY?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 70499,
        productUrl: 'https://www.flipkart.com/apple-iphone-15-blue-128-gb/p/itmbf55532c9e77b',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 71900,
        productUrl: 'https://www.croma.com/apple-iphone-15-128gb-blue-/p/300652',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Samsung Galaxy S24 5G 256GB Onyx Black',
      brand: 'Samsung',
      model: 'Galaxy S24',
      variant: '8GB RAM 256GB Storage Onyx Black',
      category: 'Smartphones',
      description: 'Galaxy AI is here. Circle to Search, Live Call Translate, and Generative Photo Edit wrapped in an Armor Aluminum frame with compact 6.2-inch Dynamic AMOLED 2X 120Hz display.',
      specifications: {
        screen: '6.2-inch FHD+ Dynamic AMOLED 2X 120Hz',
        processor: 'Exynos 2400 Deca-Core',
        camera: '50MP Dual Pixel Wide + 10MP Tele 3x + 12MP Ultra-wide',
        battery: '4000 mAh with 25W Fast Charging',
        os: 'One UI 6.1 with Android 14'
      },
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 130
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 74999,
        productUrl: 'https://www.amazon.in/dp/B0CQYHQFVP?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 75499,
        productUrl: 'https://www.flipkart.com/samsung-galaxy-s24-5g-onyx-black-256-gb/p/itm3d2568686dff7',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 76999,
        productUrl: 'https://www.reliancedigital.in/samsung-galaxy-s24-256gb-onyx-black/p/494352123',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'OnePlus 12 5G 256GB Silky Black',
      brand: 'OnePlus',
      model: '12 5G',
      variant: '12GB RAM 256GB Silky Black',
      category: 'Smartphones',
      description: 'Elite performance with Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System with 3x periscope telephoto, and ultra-fast 100W SUPERVOOC wired charging.',
      specifications: {
        chipset: 'Qualcomm Snapdragon 8 Gen 3',
        display: '6.82 inch 2K 120Hz ProXDR LTPO',
        battery: '5400 mAh dual-cell with 100W charging',
        rearCamera: '50MP Sony LYT-808 + 64MP Periscope + 48MP Ultra-wide',
        cooling: 'Dual Cryo-velocity VC Cooling'
      },
      images: [
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 110
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 64999,
        productUrl: 'https://www.amazon.in/dp/B0CQPNR347?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 64499,
        productUrl: 'https://www.flipkart.com/oneplus-12-silky-black-256-gb/p/itmff175d2757277',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 64999,
        productUrl: 'https://www.croma.com/oneplus-12-5g-12gb-ram-256gb-silky-black/p/304419',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Google Pixel 8a 128GB Bay Blue',
      brand: 'Google',
      model: 'Pixel 8a',
      variant: '8GB RAM 128GB Bay',
      category: 'Smartphones',
      description: 'The AI-first phone with Google Tensor G3. Best Take, Magic Editor, and Audio Magic Eraser combined with a 120Hz Actua display and 7 years of OS and security updates.',
      specifications: {
        screen: '6.1-inch Actua OLED 120Hz',
        soc: 'Google Tensor G3 with Titan M2 security',
        camera: '64MP Quad PD wide + 13MP ultra-wide',
        updates: '7 years of OS, security, and Feature Drops',
        durability: 'IP67 water and dust resistance'
      },
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 76
    },
    offers: [
      {
        merchantName: 'Flipkart',
        price: 47999,
        productUrl: 'https://www.flipkart.com/google-pixel-8a-bay-128-gb/p/itmd5bfa9230571d',
        availability: true
      },
      {
        merchantName: 'Amazon India',
        price: 48499,
        productUrl: 'https://www.amazon.in/dp/B0D18X19B5?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 49999,
        productUrl: 'https://www.reliancedigital.in/google-pixel-8a-128gb-bay/p/494401824',
        availability: true
      }
    ]
  },

  // ==================== LAPTOPS ====================
  {
    product: {
      name: 'Apple MacBook Air 13.6-inch M2 Midnight',
      brand: 'Apple',
      model: 'MacBook Air M2',
      variant: '8GB Unified Memory 256GB SSD Midnight',
      category: 'Laptops',
      description: 'Strikingly thin design with an aluminum unibody, 13.6-inch Liquid Retina display, MagSafe 3 charging port, 1080p FaceTime HD camera, and up to 18 hours of battery life.',
      specifications: {
        processor: 'Apple M2 8-core CPU and 8-core GPU',
        ram: '8GB Unified Memory',
        storage: '256GB SSD',
        display: '13.6-inch 2560x1664 Liquid Retina with True Tone',
        weight: '1.24 kg'
      },
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 140
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 89990,
        productUrl: 'https://www.amazon.in/dp/B0B3B7V4K6?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 91990,
        productUrl: 'https://www.flipkart.com/apple-macbook-air-m2-8-gb-256-gb-ssd-mac-os-monterey-mly33hn-a/p/itmd4507b99c7d41',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 92900,
        productUrl: 'https://www.croma.com/apple-macbook-air-2022-m2-8gb-256gb-ssd-13-6-inch-midnight/p/256711',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Dell XPS 13 9315 Intel Core i7 12th Gen',
      brand: 'Dell',
      model: 'XPS 13 9315',
      variant: '16GB LPDDR5 512GB SSD Platinum Silver',
      category: 'Laptops',
      description: 'Ultra-portable flagship ultrabook constructed from CNC machined aluminum. Includes 13.4-inch FHD+ InfinityEdge 500 nits anti-glare display and quad speakers.',
      specifications: {
        cpu: 'Intel Core i7-1250U 10 Cores up to 4.7 GHz',
        memory: '16GB 5200MHz LPDDR5 Dual Channel',
        drive: '512GB PCIe NVMe x2 Solid State Drive',
        displayPanel: '13.4 inch FHD+ (1920 x 1200) InfinityEdge Non-Touch 500 nits',
        weight: '1.17 kg'
      },
      images: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 72
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 114990,
        productUrl: 'https://www.amazon.in/dp/B0B5GXRQ4L?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 116500,
        productUrl: 'https://www.reliancedigital.in/dell-xps-13-intel-core-i7-16gb-512gb-ssd/p/493177112',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 115990,
        productUrl: 'https://www.flipkart.com/dell-xps-core-i7-12th-gen-16-gb-512-gb-ssd-windows-11-home-9315-thin-light-laptop/p/itm09bf7fef5ee67',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'ASUS ROG Zephyrus G14 Gaming Laptop RTX 4060',
      brand: 'ASUS',
      model: 'GA402XY',
      variant: 'Ryzen 9 16GB 1TB SSD RTX 4060 Eclipse Gray',
      category: 'Laptops',
      description: 'Compact 14-inch gaming powerhouse with AMD Ryzen 9 7940HS and NVIDIA GeForce RTX 4060 8GB GDDR6. ROG Nebula Display 165Hz QHD+ with 100% DCI-P3.',
      specifications: {
        processor: 'AMD Ryzen 9 7940HS 8-Core 16-Thread',
        graphics: 'NVIDIA GeForce RTX 4060 8GB GDDR6 MUX Switch + NVIDIA Advanced Optimus',
        screen: '14-inch QHD+ 16:10 (2560 x 1600) 165Hz 3ms',
        storage: '1TB PCIe 4.0 NVMe M.2 SSD',
        memory: '16GB DDR5 on board'
      },
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 91
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 149990,
        productUrl: 'https://www.amazon.in/dp/B0BVW12Q7G?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 151990,
        productUrl: 'https://www.flipkart.com/asus-rog-zephyrus-g14-2023-ryzen-9-octa-core-7940hs-16-gb-1-tb-ssd-rtx-4060/p/itmd5012a6401662',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 152000,
        productUrl: 'https://www.croma.com/asus-rog-zephyrus-g14-ryzen-9-16gb-1tb-ssd-rtx4060/p/301289',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Lenovo IdeaPad Slim 3 15-inch Intel Core i5 12th Gen',
      brand: 'Lenovo',
      model: 'IdeaPad Slim 3 15IAH8',
      variant: '16GB RAM 512GB SSD Arctic Grey',
      category: 'Laptops',
      description: 'Ideal everyday laptop for productivity, study, and multitasking. Features 15.6-inch FHD Anti-Glare display, privacy shutter webcam, and Dolby Audio speakers.',
      specifications: {
        cpu: 'Intel Core i5-12450H 8 Cores 12 Threads up to 4.4GHz',
        ram: '16GB LPDDR5-4800 soldered',
        storage: '512GB SSD M.2 2242 PCIe 4.0x4 NVMe',
        display: '15.6 inch FHD (1920x1080) TN 250nits Anti-glare',
        battery: '47Wh with Rapid Charge Boost'
      },
      images: [
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 63
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 49990,
        productUrl: 'https://www.amazon.in/dp/B0CRH7T2G3?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 50490,
        productUrl: 'https://www.flipkart.com/lenovo-ideapad-slim-3-intel-core-i5-12th-gen-16-gb-512-gb-ssd/p/itm129df9804b901',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 51990,
        productUrl: 'https://www.reliancedigital.in/lenovo-ideapad-slim-3-core-i5-16gb-512gb/p/493838201',
        availability: true
      }
    ]
  },

  // ==================== HEADPHONES ====================
  {
    product: {
      name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
      brand: 'Sony',
      model: 'WH-1000XM5',
      variant: 'Black Over-Ear ANC',
      category: 'Headphones',
      description: 'Industry-leading noise cancellation powered by two processors and 8 microphones. Specially designed 30mm driver unit delivers unmatched high-resolution sound quality.',
      specifications: {
        driverUnit: '30 mm Carbon Fiber composite dome',
        anc: 'Auto NC Optimizer with V1 and QN1 dual processors',
        batteryLife: 'Up to 30 hours with ANC on, 40 hours with ANC off',
        codecs: 'LDAC, AAC, SBC',
        weight: '250 g'
      },
      images: [
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 150
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 28990,
        productUrl: 'https://www.amazon.in/dp/B09XS7JWHH?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 29490,
        productUrl: 'https://www.flipkart.com/sony-wh-1000xm5-bluetooth-headset/p/itmc5c1ba7407a16',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 29990,
        productUrl: 'https://www.croma.com/sony-wh-1000xm5-bluetooth-headphone-with-mic-black/p/261899',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Apple AirPods Pro (2nd Generation) MagSafe USB-C',
      brand: 'Apple',
      model: 'AirPods Pro 2',
      variant: 'White MagSafe Case USB-C',
      category: 'Headphones',
      description: 'Powered by the H2 chip. Up to 2x more active noise cancellation than previous gen, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking.',
      specifications: {
        audioTech: 'Custom high-excursion Apple driver & high dynamic range amplifier',
        caseCharging: 'MagSafe (USB-C), Apple Watch charger, or Qi wireless',
        batteryLife: 'Up to 6 hours listening with ANC enabled, 30 hours with case',
        waterResistance: 'IP54 dust, sweat, and water resistant for AirPods and case',
        connectivity: 'Bluetooth 5.3'
      },
      images: [
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 180
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 20990,
        productUrl: 'https://www.amazon.in/dp/B0CHX32BBP?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 21490,
        productUrl: 'https://www.flipkart.com/apple-airpods-pro-2nd-generation-magsafe-case-usb-c-bluetooth-headset/p/itm5a3b934be94b4',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 22900,
        productUrl: 'https://www.reliancedigital.in/apple-airpods-pro-2nd-gen-usb-c/p/493839211',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Bose QuietComfort 45 Bluetooth Wireless Headphones',
      brand: 'Bose',
      model: 'QC45',
      variant: 'Triple Black Over-Ear',
      category: 'Headphones',
      description: 'High-fidelity audio with proprietary TriPort acoustic architecture. Quiet and Aware modes let you switch between full noise cancellation and situational awareness seamlessly.',
      specifications: {
        dimensions: '18.4 cm H x 15.24 cm W x 7.62 cm D',
        batteryLife: 'Up to 22 hours per charge via USB-C',
        fastCharge: '15-minute quick charge yields up to 3 hours playtime',
        bluetoothRange: 'Up to 9 meters (30 feet) Bluetooth 5.1',
        cushions: 'Smooth synthetic leather with minimal clamping force'
      },
      images: [
        'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 85
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 24900,
        productUrl: 'https://www.amazon.in/dp/B098FKXT8L?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 25490,
        productUrl: 'https://www.croma.com/bose-quietcomfort-45-bluetooth-headphone-with-mic-triple-black/p/243657',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 25999,
        productUrl: 'https://www.tatacliq.com/bose-quietcomfort-45-wireless-headphones/p-mp00000000982711',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Sennheiser Momentum 4 Wireless Noise-Cancelling Headphones',
      brand: 'Sennheiser',
      model: 'Momentum 4',
      variant: 'Denim Special Edition',
      category: 'Headphones',
      description: 'Exceptional 60-hour battery life with audiophile-inspired 42mm transducer system. Adaptive Noise Cancellation with adjustable Transparency mode and smart pause feature.',
      specifications: {
        speakerType: 'Dynamic 42mm diameter',
        frequencyResponse: '6 Hz to 22 kHz',
        batteryRuntime: 'Up to 60 hours music playback via Bluetooth with ANC',
        codecsSupported: 'aptX, aptX adaptive, AAC, SBC',
        weight: '293 g'
      },
      images: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 67
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 24990,
        productUrl: 'https://www.amazon.in/dp/B0B6GHW1XQ?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 25990,
        productUrl: 'https://www.flipkart.com/sennheiser-momentum-4-wireless-bluetooth-headset/p/itmd5f7253507119',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 26490,
        productUrl: 'https://www.croma.com/sennheiser-momentum-4-wireless-headphone-black/p/262590',
        availability: true
      }
    ]
  },

  // ==================== FASHION ====================
  {
    product: {
      name: "Levi's 511 Slim Fit Mid Rise Stretch Jeans",
      brand: "Levi's",
      model: '511 Slim Fit',
      variant: 'Dark Indigo W32 L32',
      category: 'Fashion',
      description: 'A modern slim with room to move. Added stretch provides all-day comfort and mobility. Features classic 5-pocket styling and signature red tab stitching.',
      specifications: {
        fit: 'Slim through thigh with slim leg opening',
        rise: 'Mid rise sits below waist',
        fabric: '99% Cotton, 1% Elastane Stretch Denim',
        washCare: 'Machine wash cold inside out with like colors'
      },
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 92
    },
    offers: [
      {
        merchantName: 'Myntra',
        price: 2399,
        productUrl: 'https://www.myntra.com/jeans/levis/levis-men-blue-511-slim-fit-stretchable-jeans/11245012/buy',
        availability: true
      },
      {
        merchantName: 'Amazon India',
        price: 2499,
        productUrl: 'https://www.amazon.in/dp/B079Z5J2R5?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Ajio',
        price: 2599,
        productUrl: 'https://www.ajio.com/levis-511-slim-fit-mid-rise-jeans/p/461284901_blue',
        availability: true
      }
    ]
  },
  {
    product: {
      name: "Nike Air Force 1 '07 Men's Low-Top Sneakers",
      brand: 'Nike',
      model: "Air Force 1 '07",
      variant: 'Triple White UK 9',
      category: 'Fashion',
      description: 'The radiance lives on in the Nike Air Force 1 07. Crisp leather edges, stitched overlays for durability and support, and Nike Air cushioning designed for all-day comfort.',
      specifications: {
        soleMaterial: 'Rubber cupsole with pivot circle traction pattern',
        upperMaterial: 'Real and synthetic leather with perforated toe box',
        cushioning: 'Encapsulated Nike Air sole unit',
        styleCode: 'CW2288-111'
      },
      images: [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 145
    },
    offers: [
      {
        merchantName: 'Myntra',
        price: 7495,
        productUrl: 'https://www.myntra.com/casual-shoes/nike/nike-men-white-air-force-1-07-sneakers/13594892/buy',
        availability: true
      },
      {
        merchantName: 'Ajio',
        price: 7495,
        productUrl: 'https://www.ajio.com/nike-air-force-1-07-low-top-sneakers/p/462947112_white',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 7895,
        productUrl: 'https://www.tatacliq.com/nike-air-force-1-07-white-sneakers/p-mp00000000781299',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Ray-Ban Aviator Classic Polarized Sunglasses',
      brand: 'Ray-Ban',
      model: 'RB3025',
      variant: 'Gold Metal Frame Green Classic G-15 Polarized 58mm',
      category: 'Fashion',
      description: 'Originally designed for U.S. aviators in 1937. Combines great aviator styling with exceptional quality, performance, and 100% UV protection against harmful rays.',
      specifications: {
        frameMaterial: 'Polished Metal Gold',
        lensColor: 'Green Classic G-15 Polarized',
        lensWidth: '58 mm',
        bridgeWidth: '14 mm',
        templeLength: '135 mm'
      },
      images: [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 60
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 8590,
        productUrl: 'https://www.amazon.in/dp/B0014GVR7Q?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 8890,
        productUrl: 'https://www.tatacliq.com/ray-ban-rb3025-aviator-classic-sunglasses/p-mp00000000389100',
        availability: true
      },
      {
        merchantName: 'Myntra',
        price: 8990,
        productUrl: 'https://www.myntra.com/sunglasses/ray-ban/ray-ban-unisex-aviator-sunglasses/2109481/buy',
        availability: true
      }
    ]
  },
  {
    product: {
      name: "Tommy Hilfiger Men's Classic Regular Fit Pique Polo Shirt",
      brand: 'Tommy Hilfiger',
      model: 'Classic Ivy Polo',
      variant: 'Navy Blue 100% Cotton Medium',
      category: 'Fashion',
      description: 'Signature short-sleeve polo shirt cut in breathable organic cotton pique. Accented with the iconic embroidered flag logo on the chest and two-button placket.',
      specifications: {
        material: '100% Organic Cotton Pique Knit',
        fit: 'Regular Fit',
        neckline: 'Ribbed polo collar with dual button closure',
        careInstructions: 'Machine wash at 30 degrees Celsius'
      },
      images: [
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 38
    },
    offers: [
      {
        merchantName: 'Myntra',
        price: 3299,
        productUrl: 'https://www.myntra.com/tshirts/tommy-hilfiger/tommy-hilfiger-men-navy-blue-polo-collar-tshirt/15294021/buy',
        availability: true
      },
      {
        merchantName: 'Ajio',
        price: 3399,
        productUrl: 'https://www.ajio.com/tommy-hilfiger-regular-fit-polo-tshirt/p/461947291_navy',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 3499,
        productUrl: 'https://www.tatacliq.com/tommy-hilfiger-mens-solid-polo/p-mp00000000492812',
        availability: true
      }
    ]
  },

  // ==================== HOME APPLIANCES ====================
  {
    product: {
      name: 'Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner',
      brand: 'Dyson',
      model: 'V12 Detect Slim',
      variant: 'Total Clean Yellow/Iron',
      category: 'Home Appliances',
      description: 'Dyson’s most compact and intelligent cordless vacuum. Features a Fluffy Optic cleaner head revealing invisible dust, piezo acoustic dust sensor, and LCD scientific count.',
      specifications: {
        suctionPower: '150 Air Watts in Boost mode',
        runTime: 'Up to 60 minutes in Eco mode',
        binVolume: '0.35 Liters with hygienic point-and-shoot emptying',
        filtration: 'Whole-machine filtration capturing 99.99% of particles to 0.3 microns',
        weight: '2.2 kg'
      },
      images: [
        'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 112
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 49900,
        productUrl: 'https://www.amazon.in/dp/B09S3S3X4P?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 52900,
        productUrl: 'https://www.croma.com/dyson-v12-detect-slim-total-clean-cordless-vacuum-cleaner/p/249912',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 53900,
        productUrl: 'https://www.reliancedigital.in/dyson-v12-detect-slim-vacuum-cleaner/p/492850192',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Philips HD9252/90 4.1L Digital Touchscreen Air Fryer',
      brand: 'Philips',
      model: 'HD9252/90',
      variant: '4.1L 1400W Rapid Air Black',
      category: 'Home Appliances',
      description: 'Healthy frying with Rapid Air technology. Delicious fries with up to 90% less fat. Features 7 preset touch menus for frozen snacks, chicken, fish, chops, and vegetables.',
      specifications: {
        capacity: '4.1 Liters (0.8 kg food capacity)',
        power: '1400 Watts',
        temperatureControl: 'Adjustable 60 to 200 degrees Celsius',
        presets: '7 one-touch cooking programs',
        cleaning: 'QuickClean basket with non-stick coating, dishwasher safe'
      },
      images: [
        'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 84
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 7999,
        productUrl: 'https://www.amazon.in/dp/B096894TXB?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 8299,
        productUrl: 'https://www.flipkart.com/philips-hd9252-90-air-fryer/p/itme3bf5a278912c',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 8499,
        productUrl: 'https://www.croma.com/philips-essential-4-1-litres-air-fryer-hd9252-90-black/p/240182',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'LG 28 L Convection Microwave Oven Charcoal Grey',
      brand: 'LG',
      model: 'MC2886BRUM',
      variant: '28 Litre Floral Charcoal Grey',
      category: 'Home Appliances',
      description: 'All-in-one convection microwave with Charcoal Lighting Heater and 251 auto cook menu options including Indian rotis, pasteurized milk, ghee, and curd preparation.',
      specifications: {
        capacity: '28 Liters suitable for families with 4 to 6 members',
        cookingModes: 'Baking, Grilling, Reheating, Defrosting, Cooking',
        interiorCavity: 'Stainless Steel with antibacterial EasyClean coating',
        safety: 'Child Lock and tact dial controls'
      },
      images: [
        'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 58
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 14490,
        productUrl: 'https://www.amazon.in/dp/B07G3N5CVC?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 14990,
        productUrl: 'https://www.flipkart.com/lg-28-l-convection-microwave-oven-mc2886brum/p/itm5b0c95029e248',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 15290,
        productUrl: 'https://www.reliancedigital.in/lg-28-l-convection-microwave-oven-mc2886brum/p/491583199',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Instant Pot Duo 7-in-1 Multi-Use Programmable Pressure Cooker',
      brand: 'Instant Pot',
      model: 'Duo 60',
      variant: '6 Quart 5.7 Liters Stainless Steel',
      category: 'Home Appliances',
      description: 'Replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer. Speeds up cooking by up to 70%.',
      specifications: {
        capacity: '6 Quarts (5.7 Litres)',
        power: '1000 Watts heating element',
        innerPot: 'Food-grade 304 (18/8) stainless steel 3-ply bottom',
        safetyFeatures: '10+ proven safety mechanisms including overheat protection'
      },
      images: [
        'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 79
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 9499,
        productUrl: 'https://www.amazon.in/dp/B00FLYWNYQ?tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 9999,
        productUrl: 'https://www.flipkart.com/instant-pot-duo-60-electric-pressure-cooker/p/itmd51a8904712bb',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 10499,
        productUrl: 'https://www.tatacliq.com/instant-pot-duo-6-quart-multi-cooker/p-mp00000000847192',
        availability: true
      }
    ]
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to database:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB. Clearing existing collections...');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      MerchantOffer.deleteMany({}),
      Click.deleteMany({})
    ]);

    console.log('Existing data cleared.');

    // 1. Seed Users
    console.log('Creating admin and standard users...');
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const userPasswordHash = await bcrypt.hash('user123', 10);

    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@dealbridge.com',
      password: adminPasswordHash,
      role: 'admin'
    });

    const standardUser = await User.create({
      name: 'Alex Johnson',
      email: 'user@dealbridge.com',
      password: userPasswordHash,
      role: 'user',
      wishlist: []
    });

    console.log(`Users created:\n  - Admin: ${adminUser.email}\n  - User: ${standardUser.email}`);

    // 2. Seed Products and Merchant Offers
    console.log(`Seeding ${productsData.length} products across 6 categories...`);

    const createdProductDocs = [];
    const createdOfferDocs = [];

    for (const item of productsData) {
      const product = new Product(item.product);
      await product.save();
      createdProductDocs.push(product);

      for (const off of item.offers) {
        const offer = new MerchantOffer({
          product: product._id,
          merchantName: off.merchantName,
          price: off.price,
          productUrl: off.productUrl,
          availability: off.availability,
          lastUpdated: new Date()
        });
        await offer.save();
        createdOfferDocs.push(offer);
      }
    }

    console.log(`Successfully seeded ${createdProductDocs.length} products and ${createdOfferDocs.length} merchant offers.`);

    // 3. Add a few products to standard user's wishlist
    if (createdProductDocs.length >= 3) {
      standardUser.wishlist = [
        createdProductDocs[0]._id,
        createdProductDocs[4]._id,
        createdProductDocs[8]._id
      ];
      await standardUser.save();
      console.log(`Added 3 sample products to user wishlist: ${standardUser.email}`);
    }

    // 4. Seed sample Clicks for analytics demonstration
    console.log('Seeding initial click tracking events for analytics...');
    const sampleClicks = [];
    const now = Date.now();

    // Create 45 sample clicks distributed among top products
    for (let i = 0; i < 45; i++) {
      const offer = createdOfferDocs[i % createdOfferDocs.length];
      const randomMinutesAgo = Math.floor(Math.random() * 60 * 24 * 7); // within last 7 days
      sampleClicks.push({
        product: offer.product,
        offer: offer._id,
        merchantName: offer.merchantName,
        timestamp: new Date(now - randomMinutesAgo * 60 * 1000)
      });
    }

    await Click.insertMany(sampleClicks);
    console.log(`Seeded ${sampleClicks.length} affiliate click tracking events.`);

    console.log('\n--- SEED COMPLETED SUCCESSFULLY ---');
    console.log(`Total Products: ${createdProductDocs.length}`);
    console.log(`Total Offers:   ${createdOfferDocs.length}`);
    console.log(`Total Clicks:   ${sampleClicks.length}`);
    console.log('\nDefault Credentials:');
    console.log('  Admin: admin@dealbridge.com / admin123');
    console.log('  User:  user@dealbridge.com / user123');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error during database seeding:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedDatabase();
