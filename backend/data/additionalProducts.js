const additionalProducts = [
  // ==================== WATCHES ====================
  {
    product: {
      name: 'boAt Wave Call 2 Smartwatch with Bluetooth Calling',
      brand: 'boAt',
      model: 'Wave Call 2',
      variant: 'Active Black Silicone Strap',
      category: 'Watches',
      description: '1.83 inch HD display with advanced Bluetooth calling, 700+ active sports modes, live cricket scores, and IP67 dust and water resistance.',
      specifications: {
        screenSize: '1.83 inch HD Display',
        calling: 'Advanced Bluetooth Calling with Dialpad',
        battery: 'Up to 5 Days, 2 Days with BT Calling',
        waterResistance: 'IP67 Rated'
      },
      images: [
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 115
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 1499,
        productUrl: 'https://www.amazon.in/s?k=boAt+Wave+Call+2&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 1599,
        productUrl: 'https://www.flipkart.com/search?q=boAt+Wave+Call+2',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 1699,
        productUrl: 'https://www.croma.com/searchB?q=boAt+Wave+Call+2',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Noise ColorFit Pulse 3 Bluetooth Calling Smart Watch',
      brand: 'Noise',
      model: 'Pulse 3',
      variant: 'Jet Black 1.96 inch TFT',
      category: 'Watches',
      description: 'Expansive 1.96-inch TFT display with Tru Sync Bluetooth calling, 24x7 heart rate and SpO2 monitoring, and 170+ cloud watch faces.',
      specifications: {
        screenSize: '1.96 inch TFT Display 550 nits',
        connectivity: 'Bluetooth 5.3 Tru Sync',
        battery: 'Up to 7 Days typical usage',
        healthSuite: 'Noise Health Suite (SpO2, HR, Stress)'
      },
      images: [
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 98
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 1599,
        productUrl: 'https://www.amazon.in/s?k=Noise+ColorFit+Pulse+3&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 1699,
        productUrl: 'https://www.flipkart.com/search?q=Noise+ColorFit+Pulse+3',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 1799,
        productUrl: 'https://www.tatacliq.com/search/?text=Noise+ColorFit+Pulse+3',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminium Case',
      brand: 'Apple',
      model: 'Watch Series 9',
      variant: '45mm Midnight Sport Band M/L',
      category: 'Watches',
      description: 'Powered by the S9 SiP enabling a magical Double Tap gesture. A brighter 2000-nit Always-On Retina display and precision finding for iPhone.',
      specifications: {
        caseSize: '45 mm Aluminium Case',
        processor: 'S9 SiP with 4-core Neural Engine',
        display: 'Always-On Retina up to 2000 nits',
        features: 'Double Tap gesture, ECG, Blood Oxygen, Fall Detection'
      },
      images: [
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 175
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 41900,
        productUrl: 'https://www.amazon.in/s?k=Apple+Watch+Series+9+45mm&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 42499,
        productUrl: 'https://www.flipkart.com/search?q=Apple+Watch+Series+9+45mm',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 44900,
        productUrl: 'https://www.croma.com/searchB?q=Apple+Watch+Series+9',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Fastrack Limitless FS1 Pro Smartwatch 1.96 inch AMOLED',
      brand: 'Fastrack',
      model: 'Limitless FS1 Pro',
      variant: 'Black Accent Curved AMOLED',
      category: 'Watches',
      description: 'Super-sharp 1.96-inch curved AMOLED display with 410x502 resolution. SingleSync Bluetooth calling with NitroFast quick charging.',
      specifications: {
        display: '1.96 inch Curved AMOLED 410x502',
        calling: 'SingleSync Bluetooth Calling',
        battery: '7 Days battery, 10 min charge for 1 day'
      },
      images: [
        'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 84
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 2195,
        productUrl: 'https://www.amazon.in/s?k=Fastrack+Limitless+FS1+Pro&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 2295,
        productUrl: 'https://www.flipkart.com/search?q=Fastrack+Limitless+FS1+Pro',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 2495,
        productUrl: 'https://www.tatacliq.com/search/?text=Fastrack+Limitless+FS1+Pro',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Casio Vintage Digital Gold Dial Watch A168WG-9WDF',
      brand: 'Casio',
      model: 'A168WG-9WDF',
      variant: 'Yellow Gold Ion Plated Stainless Steel',
      category: 'Watches',
      description: 'Retro 80s icon with electro-luminescent backlight, 1/100-second digital stopwatch, daily alarm, and auto-calendar in rich gold-tone plating.',
      specifications: {
        caseDimensions: '38.6 x 36.3 x 9.6 mm',
        illumination: 'Electro-luminescent backlight',
        waterResistance: 'Water Resistant splash proof'
      },
      images: [
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 92
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 4295,
        productUrl: 'https://www.amazon.in/s?k=Casio+Vintage+Gold+A168WG&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 4295,
        productUrl: 'https://www.tatacliq.com/search/?text=Casio+A168WG',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 4395,
        productUrl: 'https://www.flipkart.com/search?q=Casio+A168WG',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Timex Expedition Scout 40mm Watch Green Canvas Strap',
      brand: 'Timex',
      model: 'Expedition Scout',
      variant: 'Black Dial Green Nylon Slip-thru Strap',
      category: 'Watches',
      description: 'Rugged outdoor field watch featuring signature INDIGLO night-light dial, military 24-hour time marks, and 50m water resistance.',
      specifications: {
        caseDiameter: '40 mm',
        movement: 'Quartz Analog 3-Hand',
        strap: 'Durable Tactical Fabric Slip-thru',
        waterResistance: '50 Meters'
      },
      images: [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 78
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 4995,
        productUrl: 'https://www.amazon.in/s?k=Timex+Expedition+Scout&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 5195,
        productUrl: 'https://www.flipkart.com/search?q=Timex+Expedition+Scout',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 5495,
        productUrl: 'https://www.tatacliq.com/search/?text=Timex+Expedition+Scout',
        availability: true
      }
    ]
  },

  // ==================== SMARTPHONES ====================
  {
    product: {
      name: 'Apple iPhone 14 128GB Starlight',
      brand: 'Apple',
      model: 'iPhone 14',
      variant: '128GB Starlight',
      category: 'Smartphones',
      description: 'Super Retina XDR OLED display, A15 Bionic chip with 5-core GPU, Action mode for smooth handheld video, and all-day battery life.',
      specifications: {
        display: '6.1 inch Super Retina XDR OLED',
        chipset: 'Apple A15 Bionic 6-core',
        rearCamera: '12MP Main + 12MP Ultra-Wide',
        battery: 'Up to 20 hours video playback'
      },
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 160
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 58999,
        productUrl: 'https://www.amazon.in/s?k=Apple+iPhone+14+128GB&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 59499,
        productUrl: 'https://www.flipkart.com/search?q=Apple+iPhone+14+128GB',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 60900,
        productUrl: 'https://www.croma.com/searchB?q=iPhone+14',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Apple iPhone 13 128GB Midnight',
      brand: 'Apple',
      model: 'iPhone 13',
      variant: '128GB Midnight',
      category: 'Smartphones',
      description: 'Advanced dual-camera system with Sensor-shift OIS, Cinematic mode in 1080p at 30 fps, Ceramic Shield front, and lightning-fast A15 Bionic.',
      specifications: {
        display: '6.1 inch Super Retina XDR OLED',
        processor: 'A15 Bionic Chip with 4-core GPU',
        storage: '128GB',
        network: '5G Capable'
      },
      images: [
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 170
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 49999,
        productUrl: 'https://www.amazon.in/s?k=Apple+iPhone+13+128GB&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 50499,
        productUrl: 'https://www.flipkart.com/search?q=Apple+iPhone+13+128GB',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 51900,
        productUrl: 'https://www.reliancedigital.in/search?q=iPhone+13',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'OnePlus Nord CE4 5G 128GB Dark Chrome',
      brand: 'OnePlus',
      model: 'Nord CE4 5G',
      variant: '8GB RAM 128GB Dark Chrome',
      category: 'Smartphones',
      description: 'Powered by Snapdragon 7 Gen 3, ultra-fast 100W SUPERVOOC charging, and massive 5500 mAh battery with a 120Hz FHD+ AMOLED display.',
      specifications: {
        display: '6.7 inch 120Hz Fluid AMOLED',
        processor: 'Qualcomm Snapdragon 7 Gen 3',
        camera: '50MP Sony LYT-600 with OIS + 8MP Ultra-wide',
        charging: '100W SUPERVOOC fast charge'
      },
      images: [
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 135
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 24999,
        productUrl: 'https://www.amazon.in/s?k=OnePlus+Nord+CE4+5G&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 24999,
        productUrl: 'https://www.flipkart.com/search?q=OnePlus+Nord+CE4+5G',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 24999,
        productUrl: 'https://www.croma.com/searchB?q=OnePlus+Nord+CE4',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Samsung Galaxy M34 5G 128GB Prism Silver',
      brand: 'Samsung',
      model: 'Galaxy M34 5G',
      variant: '6GB RAM 128GB Prism Silver',
      category: 'Smartphones',
      description: 'Monster 6000 mAh battery with 120Hz Super AMOLED display and 50MP No Shake Cam (OIS) with 4 generations of OS upgrades.',
      specifications: {
        screen: '6.5 inch FHD+ Super AMOLED 120Hz',
        camera: '50MP Triple Camera with OIS',
        battery: '6000 mAh Lithium-ion',
        protection: 'Corning Gorilla Glass 5'
      },
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 110
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 16999,
        productUrl: 'https://www.amazon.in/s?k=Samsung+Galaxy+M34+5G&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 17499,
        productUrl: 'https://www.flipkart.com/search?q=Samsung+Galaxy+M34+5G',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 17999,
        productUrl: 'https://www.reliancedigital.in/search?q=Samsung+M34',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Redmi Note 13 Pro 5G 256GB Coral Purple',
      brand: 'Xiaomi',
      model: 'Redmi Note 13 Pro 5G',
      variant: '8GB RAM 256GB Coral Purple',
      category: 'Smartphones',
      description: 'Flagship 200MP camera with OIS, 1.5K 120Hz curved-edge AMOLED display, Snapdragon 7s Gen 2, and 67W Turbo Charge.',
      specifications: {
        display: '6.67 inch 1.5K AMOLED 120Hz Dolby Vision',
        sensor: '200MP Samsung ISOCELL HP3 with OIS',
        soc: 'Snapdragon 7s Gen 2 4nm',
        charging: '67W Turbo Charge 5100mAh'
      },
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 125
    },
    offers: [
      {
        merchantName: 'Flipkart',
        price: 25999,
        productUrl: 'https://www.flipkart.com/search?q=Redmi+Note+13+Pro+5G',
        availability: true
      },
      {
        merchantName: 'Amazon India',
        price: 26499,
        productUrl: 'https://www.amazon.in/s?k=Redmi+Note+13+Pro+5G&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 26999,
        productUrl: 'https://www.croma.com/searchB?q=Redmi+Note+13+Pro',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Nothing Phone (2a) 5G 128GB Black',
      brand: 'Nothing',
      model: 'Phone (2a)',
      variant: '8GB RAM 128GB Black',
      category: 'Smartphones',
      description: 'Iconic transparent design with Glyph Interface. Custom MediaTek Dimensity 7200 Pro chipset, 50MP dual cameras, and clean Nothing OS 2.5.',
      specifications: {
        processor: 'Dimensity 7200 Pro 4nm TSMC',
        display: '6.7 inch Flexible AMOLED 120Hz 1300 nits',
        camera: '50MP Main OIS + 50MP Ultra-wide 114°',
        battery: '5000 mAh with 45W Fast Charging'
      },
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 140
    },
    offers: [
      {
        merchantName: 'Flipkart',
        price: 23999,
        productUrl: 'https://www.flipkart.com/search?q=Nothing+Phone+2a',
        availability: true
      },
      {
        merchantName: 'Amazon India',
        price: 24499,
        productUrl: 'https://www.amazon.in/s?k=Nothing+Phone+2a&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 24999,
        productUrl: 'https://www.croma.com/searchB?q=Nothing+Phone+2a',
        availability: true
      }
    ]
  },

  // ==================== LAPTOPS ====================
  {
    product: {
      name: 'Apple MacBook Air 13-inch M1 Chip Space Grey',
      brand: 'Apple',
      model: 'MacBook Air M1',
      variant: '8GB RAM 256GB SSD Space Grey',
      category: 'Laptops',
      description: 'Remarkable silent fanless design with Apple M1 chip. 13.3-inch Retina display with P3 wide color, Magic Keyboard, Touch ID, and up to 18 hours battery life.',
      specifications: {
        chip: 'Apple M1 8-core CPU 7-core GPU',
        ram: '8GB Unified Memory',
        storage: '256GB High-Speed SSD',
        display: '13.3 inch 2560x1600 Retina Display',
        weight: '1.29 kg'
      },
      images: [
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 185
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 69990,
        productUrl: 'https://www.amazon.in/s?k=MacBook+Air+M1&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 70490,
        productUrl: 'https://www.flipkart.com/search?q=MacBook+Air+M1',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 72900,
        productUrl: 'https://www.croma.com/searchB?q=MacBook+Air+M1',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'HP Pavilion 15 12th Gen Intel Core i5 Laptop',
      brand: 'HP',
      model: 'Pavilion 15-eg2009TU',
      variant: '16GB DDR4 512GB SSD Natural Silver',
      category: 'Laptops',
      description: 'Reliable performance with 12th Gen Intel Core i5-1240P, micro-edge 15.6-inch FHD IPS anti-glare display, audio by B&O, and HP Fast Charge.',
      specifications: {
        processor: 'Intel Core i5-1240P 12 Cores 16 Threads',
        ram: '16GB DDR4-3200 MHz RAM',
        storage: '512GB PCIe NVMe M.2 SSD',
        display: '15.6 inch FHD IPS 250 nits',
        sound: 'Dual speakers Audio by B&O'
      },
      images: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 110
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 54990,
        productUrl: 'https://www.amazon.in/s?k=HP+Pavilion+15+i5&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 55990,
        productUrl: 'https://www.flipkart.com/search?q=HP+Pavilion+15+i5',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 56990,
        productUrl: 'https://www.reliancedigital.in/search?q=HP+Pavilion+15',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Acer Swift Go 14 OLED Intel Core i5 13th Gen',
      brand: 'Acer',
      model: 'Swift Go 14',
      variant: '16GB LPDDR5 512GB SSD Pure Silver',
      category: 'Laptops',
      description: 'Stunning 14-inch 2.8K 90Hz OLED display (100% DCI-P3, 500 nits) powered by 13th Gen Intel Core i5-13500H in an ultra-light 1.25kg aluminum chassis.',
      specifications: {
        display: '14.0 inch 2.8K (2880x1800) OLED 90Hz 500 nits',
        cpu: 'Intel Core i5-13500H 12 Cores 16 Threads up to 4.7GHz',
        weight: '1.25 kg Thin and Light',
        ports: 'Twin Thunderbolt 4 Type-C, HDMI 2.1'
      },
      images: [
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 95
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 59990,
        productUrl: 'https://www.amazon.in/s?k=Acer+Swift+Go+14+OLED&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 61490,
        productUrl: 'https://www.flipkart.com/search?q=Acer+Swift+Go+14+OLED',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 62990,
        productUrl: 'https://www.croma.com/searchB?q=Acer+Swift+Go',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Asus Vivobook 15 Intel Core i3 12th Gen',
      brand: 'Asus',
      model: 'Vivobook 15 X1502ZA',
      variant: '8GB RAM 512GB SSD Quiet Blue',
      category: 'Laptops',
      description: 'Slim everyday laptop with 180° lay-flat hinge, physical webcam privacy shield, antimicrobial guard treatment, and clear FHD anti-glare display.',
      specifications: {
        processor: 'Intel Core i3-1215U 6 Cores 8 Threads',
        ram: '8GB DDR4 onboard upgradeable',
        storage: '512GB M.2 NVMe PCIe 3.0 SSD',
        screen: '15.6 inch FHD 1920x1080 16:9 NanoEdge'
      },
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 88
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 36990,
        productUrl: 'https://www.amazon.in/s?k=Asus+Vivobook+15+i3&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 37490,
        productUrl: 'https://www.flipkart.com/search?q=Asus+Vivobook+15+i3',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 38990,
        productUrl: 'https://www.reliancedigital.in/search?q=Asus+Vivobook+15',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Lenovo Legion 5 Pro AMD Ryzen 7 RTX 3060 Gaming Laptop',
      brand: 'Lenovo',
      model: 'Legion 5 Pro 16ACH6H',
      variant: '16GB RAM 1TB SSD Storm Grey',
      category: 'Laptops',
      description: 'World-first 16-inch QHD 165Hz gaming display with 100% sRGB and 500 nits. Powered by AMD Ryzen 7 5800H and full 130W TGP NVIDIA GeForce RTX 3060.',
      specifications: {
        cpu: 'AMD Ryzen 7 5800H 8-core 16-thread up to 4.4GHz',
        gpu: 'NVIDIA GeForce RTX 3060 6GB GDDR6 130W TGP',
        display: '16.0 inch WQXGA (2560x1600) IPS 165Hz 500 nits',
        cooling: 'Legion Coldfront 3.0 thermal system'
      },
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 105
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 112990,
        productUrl: 'https://www.amazon.in/s?k=Lenovo+Legion+5+Pro&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 114990,
        productUrl: 'https://www.flipkart.com/search?q=Lenovo+Legion+5+Pro',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 116900,
        productUrl: 'https://www.croma.com/searchB?q=Lenovo+Legion+5+Pro',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Dell Inspiron 15 3520 Intel Core i5 12th Gen',
      brand: 'Dell',
      model: 'Inspiron 3520',
      variant: '16GB RAM 512GB SSD Carbon Black',
      category: 'Laptops',
      description: 'Thoughtfully designed 15.6-inch laptop with 120Hz FHD anti-glare narrow border display, ergonomic lift hinge, and ExpressCharge fast battery charging.',
      specifications: {
        processor: 'Intel Core i5-1235U 10 Cores up to 4.4 GHz',
        ram: '16GB DDR4 2666MHz',
        ssd: '512GB M.2 PCIe NVMe Solid State Drive',
        display: '15.6 inch FHD (1920x1080) 120Hz WVA Anti-Glare'
      },
      images: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 90
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 48990,
        productUrl: 'https://www.amazon.in/s?k=Dell+Inspiron+3520+i5&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 49490,
        productUrl: 'https://www.flipkart.com/search?q=Dell+Inspiron+3520+i5',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 50990,
        productUrl: 'https://www.reliancedigital.in/search?q=Dell+Inspiron+3520',
        availability: true
      }
    ]
  },

  // ==================== HEADPHONES ====================
  {
    product: {
      name: 'boAt Airdopes 141 Bluetooth Truly Wireless Earbuds',
      brand: 'boAt',
      model: 'Airdopes 141',
      variant: 'Bold Black 42H Playback',
      category: 'Headphones',
      description: 'India top-selling TWS earbuds offering 42 hours total playback, ENx Environmental Noise Cancellation technology for clear calls, and BEAST low-latency mode.',
      specifications: {
        driver: '8mm dynamic audio drivers',
        playbackTime: 'Up to 42 hours with charging case',
        fastCharging: 'ASAP Charge: 5 mins = 75 mins playtime',
        resistance: 'IPX4 water and sweat resistance'
      },
      images: [
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 190
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 1199,
        productUrl: 'https://www.amazon.in/s?k=boAt+Airdopes+141&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 1299,
        productUrl: 'https://www.flipkart.com/search?q=boAt+Airdopes+141',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 1399,
        productUrl: 'https://www.croma.com/searchB?q=boAt+Airdopes+141',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'boAt Rockerz 450 Bluetooth On Ear Headphones',
      brand: 'boAt',
      model: 'Rockerz 450',
      variant: 'Luscious Black 40mm Drivers',
      category: 'Headphones',
      description: 'Lightweight on-ear wireless headphones with custom 40mm dynamic drivers for boAt signature punchy bass, plush cushioned ear cups, and 15-hour battery.',
      specifications: {
        driverUnit: '40 mm Dynamic Audio Driver',
        batteryLife: 'Up to 15 hours playback',
        connectivity: 'Bluetooth v5.0 and 3.5mm AUX mode'
      },
      images: [
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 145
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 1499,
        productUrl: 'https://www.amazon.in/s?k=boAt+Rockerz+450&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 1599,
        productUrl: 'https://www.flipkart.com/search?q=boAt+Rockerz+450',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 1699,
        productUrl: 'https://www.tatacliq.com/search/?text=boAt+Rockerz+450',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Noise Buds VS102 Wireless In-Ear Earbuds',
      brand: 'Noise',
      model: 'VS102',
      variant: 'Jet Black Flybird Design',
      category: 'Headphones',
      description: 'Unique translucent Flybird design case delivering 50 hours of total playtime, 11mm speaker drivers, and Instacharge 10 min for 120 min music.',
      specifications: {
        driverSize: '11 mm Deep Bass Drivers',
        playtime: 'Up to 50 hours with case',
        connectivity: 'Hyper Sync Bluetooth v5.1',
        charging: 'Type-C Instacharge fast charging'
      },
      images: [
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 130
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 999,
        productUrl: 'https://www.amazon.in/s?k=Noise+Buds+VS102&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 1099,
        productUrl: 'https://www.flipkart.com/search?q=Noise+Buds+VS102',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 1199,
        productUrl: 'https://www.croma.com/searchB?q=Noise+Buds+VS102',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'JBL Tune 510BT Wireless On-Ear Headphones Pure Bass',
      brand: 'JBL',
      model: 'Tune 510BT',
      variant: 'Black Lightweight Foldable',
      category: 'Headphones',
      description: 'Features renowned JBL Pure Bass sound found in top venues worldwide. Up to 40 hours battery life with multi-point connections and hands-free calls.',
      specifications: {
        driver: '32 mm dynamic driver with Pure Bass',
        batteryLife: 'Up to 40 hours wireless playtime',
        speedCharge: '5 min charge gives 2 hours',
        weight: '160 g ultra-light foldable'
      },
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 160
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 2999,
        productUrl: 'https://www.amazon.in/s?k=JBL+Tune+510BT&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 3199,
        productUrl: 'https://www.flipkart.com/search?q=JBL+Tune+510BT',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 3299,
        productUrl: 'https://www.croma.com/searchB?q=JBL+Tune+510BT',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'OnePlus Bullets Wireless Z2 Bluetooth Neckband Earphones',
      brand: 'OnePlus',
      model: 'Bullets Wireless Z2',
      variant: 'Magico Black 12.4mm Drivers',
      category: 'Headphones',
      description: 'Massive 12.4mm bass drivers delivering rich acoustic detail. 30 hours of battery life with fast 10-minute charge providing 20 hours of immersive music.',
      specifications: {
        drivers: '12.4 mm Bass Drivers with titanium coating',
        batteryLife: 'Up to 30 hours playback',
        fastCharging: '10 min charge gives 20 hours',
        waterproof: 'IP55 water and sweat resistant'
      },
      images: [
        'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 175
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 1999,
        productUrl: 'https://www.amazon.in/s?k=OnePlus+Bullets+Wireless+Z2&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 1999,
        productUrl: 'https://www.flipkart.com/search?q=OnePlus+Bullets+Wireless+Z2',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 1999,
        productUrl: 'https://www.croma.com/searchB?q=OnePlus+Bullets+Wireless+Z2',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Sony WF-1000XM5 Wireless Noise Cancelling Earbuds',
      brand: 'Sony',
      model: 'WF-1000XM5',
      variant: 'Black Dynamic Driver X',
      category: 'Headphones',
      description: 'Best noise cancellation earbuds powered by Integrated Processor V2 and HD Noise Cancelling Processor QN2e. Custom Dynamic Driver X delivers rich vocals and deep bass.',
      specifications: {
        driverUnit: '8.4 mm Dynamic Driver X',
        processors: 'Sony V2 + QN2e Dual Chipsets',
        battery: '8 hours playback + 16 hours in case',
        codecs: 'LDAC, LC3, AAC, SBC Hi-Res Wireless'
      },
      images: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 140
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 21990,
        productUrl: 'https://www.amazon.in/s?k=Sony+WF-1000XM5&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 22490,
        productUrl: 'https://www.flipkart.com/search?q=Sony+WF-1000XM5',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 23990,
        productUrl: 'https://www.croma.com/searchB?q=Sony+WF-1000XM5',
        availability: true
      }
    ]
  },

  // ==================== FASHION ====================
  {
    product: {
      name: "Puma Smash v2 Men's Casual Leather Sneakers",
      brand: 'Puma',
      model: 'Smash v2 L',
      variant: 'White-Black UK 8',
      category: 'Fashion',
      description: 'The tennis-inspired icon updated with a clean leather upper, cushioned SoftFoam+ sockliner for supreme step-in comfort, and durable rubber outsole.',
      specifications: {
        upperMaterial: 'Smooth genuine and synthetic leather',
        insole: 'SoftFoam+ dual-density cushioned insole',
        outsole: 'Non-marking traction rubber outsole'
      },
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 130
    },
    offers: [
      {
        merchantName: 'Myntra',
        price: 2499,
        productUrl: 'https://www.myntra.com/puma-smash-v2',
        availability: true
      },
      {
        merchantName: 'Amazon India',
        price: 2599,
        productUrl: 'https://www.amazon.in/s?k=Puma+Smash+v2&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Ajio',
        price: 2699,
        productUrl: 'https://www.ajio.com/search/?text=Puma+Smash+v2',
        availability: true
      }
    ]
  },
  {
    product: {
      name: "Adidas Originals Stan Smith Men's White Sneakers",
      brand: 'Adidas',
      model: 'Stan Smith',
      variant: 'Cloud White / Green UK 9',
      category: 'Fashion',
      description: 'Timeless tennis shoe icon featuring perforated 3-Stripes, iconic green heel tab branding, and sustainable Primegreen recycled upper construction.',
      specifications: {
        upper: 'Synthetic leather Primegreen eco-friendly',
        closure: 'Lace closure with metal eyelets',
        outsole: 'Classic Stan Smith rubber cupsole'
      },
      images: [
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 155
    },
    offers: [
      {
        merchantName: 'Myntra',
        price: 5999,
        productUrl: 'https://www.myntra.com/adidas-stan-smith',
        availability: true
      },
      {
        merchantName: 'Ajio',
        price: 6299,
        productUrl: 'https://www.ajio.com/search/?text=Adidas+Stan+Smith',
        availability: true
      },
      {
        merchantName: 'Tata CLiQ',
        price: 6499,
        productUrl: 'https://www.tatacliq.com/search/?text=Adidas+Stan+Smith',
        availability: true
      }
    ]
  },
  {
    product: {
      name: "Levi's 512 Slim Taper Fit Stretchable Jeans",
      brand: "Levi's",
      model: '512 Slim Taper',
      variant: 'Mid Wash Blue W32 L32',
      category: 'Fashion',
      description: 'The perfect balance of slim and tapered. Sits below the waist with a slim fit through the thigh and a narrow tapered leg for modern styling.',
      specifications: {
        fit: 'Slim through thigh with tapered leg',
        composition: '98% Cotton, 2% Elastane stretch',
        wash: 'Mid indigo faded wash'
      },
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 120
    },
    offers: [
      {
        merchantName: 'Myntra',
        price: 2799,
        productUrl: 'https://www.myntra.com/levis-512-jeans',
        availability: true
      },
      {
        merchantName: 'Amazon India',
        price: 2899,
        productUrl: 'https://www.amazon.in/s?k=Levis+512+jeans&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Ajio',
        price: 2999,
        productUrl: 'https://www.ajio.com/search/?text=Levis+512+jeans',
        availability: true
      }
    ]
  },
  {
    product: {
      name: "Allen Solly Men's Slim Fit Casual Cotton Shirt",
      brand: 'Allen Solly',
      model: 'Sport Casual',
      variant: 'Light Blue Check Size 40 (M)',
      category: 'Fashion',
      description: 'Crafted from premium 100% breathable cotton yarn. Features a spread collar, curved hemline, button placket, and signature embroidered stag logo.',
      specifications: {
        fabric: '100% Fine Combed Cotton',
        pattern: 'Subtle Gingham Check',
        fit: 'Slim Fit tailored silhouette'
      },
      images: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 95
    },
    offers: [
      {
        merchantName: 'Myntra',
        price: 1299,
        productUrl: 'https://www.myntra.com/allen-solly-shirt',
        availability: true
      },
      {
        merchantName: 'Amazon India',
        price: 1399,
        productUrl: 'https://www.amazon.in/s?k=Allen+Solly+shirt&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Ajio',
        price: 1499,
        productUrl: 'https://www.ajio.com/search/?text=Allen+Solly+shirt',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'U.S. Polo Assn. Solid Cotton Pique Polo T-Shirt',
      brand: 'U.S. Polo Assn.',
      model: 'Classic Fit Polo',
      variant: 'Navy Blue Size L',
      category: 'Fashion',
      description: 'Authentic American sportswear staple crafted from soft, textured cotton pique. Styled with ribbed collar, two-button placket, and iconic pony chest embroidery.',
      specifications: {
        material: '100% Cotton Pique Knit',
        collar: 'Ribbed polo collar with dual buttons',
        sleeve: 'Short sleeves with ribbed armbands'
      },
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 110
    },
    offers: [
      {
        merchantName: 'Myntra',
        price: 1099,
        productUrl: 'https://www.myntra.com/us-polo-assn-tshirt',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 1199,
        productUrl: 'https://www.flipkart.com/search?q=US+Polo+Assn+polo',
        availability: true
      },
      {
        merchantName: 'Ajio',
        price: 1299,
        productUrl: 'https://www.ajio.com/search/?text=US+Polo+Assn+polo',
        availability: true
      }
    ]
  },
  {
    product: {
      name: "Woodland Men's Khaki Leather Casual Outdoor Shoes",
      brand: 'Woodland',
      model: 'GC 0399106',
      variant: 'Camel Khaki Nubuck Leather UK 8',
      category: 'Fashion',
      description: 'Heavy-duty rugged outdoor shoe engineered with premium nubuck leather upper, rust-resistant eyelets, and deep-groove rubber lugged sole for extreme grip.',
      specifications: {
        upper: 'Genuine Nubuck Leather',
        sole: 'Deep Cleated Thermo Plastic Rubber (TPR)',
        purpose: 'Trekking, hiking, and rough terrain casual wear'
      },
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 88
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 3795,
        productUrl: 'https://www.amazon.in/s?k=Woodland+shoes&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 3995,
        productUrl: 'https://www.flipkart.com/search?q=Woodland+shoes',
        availability: true
      },
      {
        merchantName: 'Myntra',
        price: 4195,
        productUrl: 'https://www.myntra.com/woodland-shoes',
        availability: true
      }
    ]
  },

  // ==================== HOME APPLIANCES ====================
  {
    product: {
      name: 'Philips Digital Air Fryer HD9252/90 4.1L with Rapid Air Tech',
      brand: 'Philips',
      model: 'HD9252/90',
      variant: 'Black Touch Screen 4.1 Litre',
      category: 'Home Appliances',
      description: 'Delicious fries with up to 90% less fat. Rapid Air Technology with unique starfish design circulates hot air to fry with little or no added oil. 7 preset touch menus.',
      specifications: {
        capacity: '4.1 Litres basket capacity',
        power: '1400 Watts high-speed heating',
        presets: '7 one-touch cooking presets + keep warm function'
      },
      images: [
        'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 155
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 8999,
        productUrl: 'https://www.amazon.in/s?k=Philips+Air+Fryer+HD9252&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 9299,
        productUrl: 'https://www.flipkart.com/search?q=Philips+Air+Fryer+HD9252',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 9499,
        productUrl: 'https://www.croma.com/searchB?q=Philips+Air+Fryer',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Dyson V8 Absolute Cordless Vacuum Cleaner',
      brand: 'Dyson',
      model: 'V8 Absolute',
      variant: 'Yellow/Nickel 2-Tier Radial Cyclones',
      category: 'Home Appliances',
      description: 'Engineered for homes with pets. Up to 40 minutes of fade-free suction with de-tangling Motorbar cleaner head that automatically clears wrapped hair.',
      specifications: {
        suctionPower: '115 AW powerful cyclonic suction',
        runTime: 'Up to 40 minutes cordless cleaning',
        filtration: 'Whole-machine advanced HEPA filtration captures 99.99% particles'
      },
      images: [
        'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 145
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 29900,
        productUrl: 'https://www.amazon.in/s?k=Dyson+V8+Absolute&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 31900,
        productUrl: 'https://www.croma.com/searchB?q=Dyson+V8',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 32900,
        productUrl: 'https://www.reliancedigital.in/search?q=Dyson+V8',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Kent Grand RO + UV + UF + TDS Control Water Purifier 8L',
      brand: 'Kent',
      model: 'Grand 11001',
      variant: 'White 8L Tank Wall-Mountable',
      category: 'Home Appliances',
      description: 'Multiple purification process of RO+UV+UF+TDS Control makes drinking water 100% pure. Suitable for purification of brackish, tap, and municipal corporation water.',
      specifications: {
        purificationTech: 'RO + UV + UF + Alkaline TDS Controller',
        storageCapacity: '8 Litres built-in storage tank',
        purificationCapacity: 'Up to 20 Litres/hour'
      },
      images: [
        'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 125
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 14999,
        productUrl: 'https://www.amazon.in/s?k=Kent+Grand+Water+Purifier&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 15499,
        productUrl: 'https://www.flipkart.com/search?q=Kent+Grand+Water+Purifier',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 15999,
        productUrl: 'https://www.croma.com/searchB?q=Kent+Grand',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Bajaj Rex 500W Mixer Grinder with 3 Stainless Steel Jars',
      brand: 'Bajaj',
      model: 'Rex 500W',
      variant: 'White 3 Jar Set (1.2L, 0.8L, 0.3L)',
      category: 'Home Appliances',
      description: 'Durable 500-watt Titan motor with multi-functional stainless steel blade system for liquidizing, wet/dry grinding, and chutney making.',
      specifications: {
        motorPower: '500 Watts 100% Copper Winding',
        jars: '1.2L Liquidizing, 0.8L Multi-purpose, 0.3L Chutney jar',
        speedControl: '3 Speed with incher pulse mode'
      },
      images: [
        'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 135
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 2199,
        productUrl: 'https://www.amazon.in/s?k=Bajaj+Rex+500W+Mixer+Grinder&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 2299,
        productUrl: 'https://www.flipkart.com/search?q=Bajaj+Rex+500W',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 2499,
        productUrl: 'https://www.reliancedigital.in/search?q=Bajaj+Rex',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'LG 7 Kg 5 Star Inverter Touch Front Load Washing Machine',
      brand: 'LG',
      model: 'FHM1207SDM',
      variant: 'Middle Silver 6 Motion Direct Drive',
      category: 'Home Appliances',
      description: 'AI Direct Drive provides 18% more fabric care. Steam wash removes 99.9% allergens. Smart Diagnosis and full touch waterproof control panel.',
      specifications: {
        capacity: '7.0 Kg front load fully automatic',
        energyRating: '5 Star Best-in-class energy efficiency',
        rpm: '1200 RPM high spin speed for quick drying',
        motor: 'Inverter Direct Drive with 10 Years Warranty'
      },
      images: [
        'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 165
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 28990,
        productUrl: 'https://www.amazon.in/s?k=LG+7Kg+Front+Load+Washing+Machine&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 29490,
        productUrl: 'https://www.flipkart.com/search?q=LG+7Kg+Front+Load+Washing+Machine',
        availability: true
      },
      {
        merchantName: 'Croma',
        price: 30490,
        productUrl: 'https://www.croma.com/searchB?q=LG+Front+Load+Washing+Machine',
        availability: true
      }
    ]
  },
  {
    product: {
      name: 'Morphy Richards 24L Convection Microwave Oven',
      brand: 'Morphy Richards',
      model: '24CG with Motorised Rotisserie',
      variant: 'Silver Mirror Finish 24 Litre',
      category: 'Home Appliances',
      description: 'Bake, grill, reheat, and roast with motorized rotisserie for even kebabs and tikkas. 300 auto-cook recipes and stainless steel interior cavity.',
      specifications: {
        capacity: '24 Litres suitable for middle sized families',
        modes: 'Convection, Grill, Microwave and Combination',
        features: 'Motorized Rotisserie, Stainless Steel Cavity, Child Lock'
      },
      images: [
        'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80'
      ],
      popularity: 110
    },
    offers: [
      {
        merchantName: 'Amazon India',
        price: 11490,
        productUrl: 'https://www.amazon.in/s?k=Morphy+Richards+24L+Microwave&tag=dealbridge-21',
        availability: true
      },
      {
        merchantName: 'Flipkart',
        price: 11990,
        productUrl: 'https://www.flipkart.com/search?q=Morphy+Richards+24L+Microwave',
        availability: true
      },
      {
        merchantName: 'Reliance Digital',
        price: 12490,
        productUrl: 'https://www.reliancedigital.in/search?q=Morphy+Richards+Microwave',
        availability: true
      }
    ]
  }
];

module.exports = additionalProducts;
