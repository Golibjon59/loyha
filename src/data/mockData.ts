import { Asset, ActivityItem, RepairItem } from '../types';

export const primaryAsset: Asset = {
  id: 'jih-00124',
  name: 'MacBook Pro 16"',
  model: 'Apple MacBook Pro 16" Space Black (2024)',
  code: 'JIH-2024-00124',
  category: 'Laptops',
  status: 'active',
  statusText: 'Faol',
  image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
  purchaseDate: '15 Yanvar, 2024',
  price: '$3,499.00',
  supplier: 'MacBro Tashkent LLC',
  specs: {
    processor: 'M3 Max (16-core CPU, 40-core GPU)',
    ram: '36 GB Unified',
    storage: '1 TB NVMe SSD',
    display: '16.2" Liquid Retina XDR (120Hz)',
    warranty: '2 yil (2026-yil 15-yanvargacha)',
    serialNumber: 'C02G87Q0MD6R',
    condition: "A'lo (Yangi holatda)"
  },
  assignee: {
    name: 'Nurmuhammad Y.',
    role: 'Lead Mobile & AI Engineer',
    room: '304-xona',
    department: 'Dasturiy ta\'minot bo\'limi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+998 90 123 45 67',
    email: 'nurmuhammad.y@company.uz'
  },
  location: 'Bosh bino, 3-qavat, 304-IT Lab'
};

export const sampleAssets: Asset[] = [
  primaryAsset,
  {
    id: 'jih-00125',
    name: 'Dell UltraSharp 27" 4K',
    model: 'Dell U2723QE IPS Black',
    code: 'JIH-2024-00125',
    category: 'Monitors',
    status: 'active',
    statusText: 'Faol',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    purchaseDate: '20 Fevral, 2024',
    price: '$650.00',
    supplier: 'Asaxiy Texnika',
    specs: {
      display: '27" IPS Black 4K UHD (3840 x 2160)',
      warranty: '3 yil rasmiy kafolat',
      serialNumber: 'CN-0K793N-74261',
      condition: "Yaxshi"
    },
    assignee: {
      name: 'Malika Rustamova',
      role: 'UI/UX Designer',
      room: '302-xona',
      department: 'Dizayn guruhi',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      phone: '+998 93 456 78 90',
      email: 'malika.r@company.uz'
    },
    location: 'Bosh bino, 3-qavat, Dizayn studio'
  },
  {
    id: 'jih-00089',
    name: 'Herman Miller Aeron Kursi',
    model: 'Aeron Remastered Graphite B',
    code: 'JIH-2023-00089',
    category: 'Furniture',
    status: 'repair',
    statusText: 'Ta\'mirda',
    image: 'https://images.unsplash.com/photo-1580481077195-c2f8263080ff?auto=format&fit=crop&w=1000&q=80',
    purchaseDate: '10 Noyabr, 2023',
    price: '$1,350.00',
    supplier: 'ErgoComfort Tashkent',
    specs: {
      warranty: '12 yil mexanizm kafolati',
      serialNumber: 'HM-2023-AER-9921',
      condition: 'Gaz-lift sozlash talab etiladi'
    },
    assignee: {
      name: 'Sherzod Aliyev',
      role: 'Product Manager',
      room: '201-xona',
      department: 'Mahsulotlar bo\'limi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      phone: '+998 97 789 01 23',
      email: 'sherzod.a@company.uz'
    },
    location: 'Servis markazida (Kechikmoqda)'
  },
  {
    id: 'jih-00045',
    name: 'ThinkPad X1 Carbon Gen 11',
    model: 'Lenovo ThinkPad X1 i7-1365U',
    code: 'JIH-2023-00045',
    category: 'Laptops',
    status: 'broken',
    statusText: 'Nosoz',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80',
    purchaseDate: '05 May, 2023',
    price: '$1,850.00',
    supplier: 'Radius Mobile',
    specs: {
      processor: 'Intel Core i7-1365U vPro',
      ram: '16 GB LPDDR5',
      storage: '512 GB SSD',
      warranty: '1 yil (Muddati tugagan)',
      serialNumber: 'PF4129XZ',
      condition: 'Ekran matritsasi singan'
    },
    assignee: {
      name: 'Omborxona (Hisobda)',
      role: 'IT zaxira fondi',
      room: '101-xona',
      department: 'Logistika',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      phone: '+998 71 200 00 01',
      email: 'warehouse@company.uz'
    },
    location: '1-qavat, Zaxira ombori'
  },
  {
    id: 'jih-00210',
    name: 'Cisco Catalyst 9200 Switch',
    model: 'C9200L-48P-4G-E Gigabit',
    code: 'JIH-2024-00210',
    category: 'Network',
    status: 'active',
    statusText: 'Faol',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
    purchaseDate: '12 Mart, 2024',
    price: '$2,900.00',
    supplier: 'NetTech Solutions',
    specs: {
      warranty: '5 yil',
      serialNumber: 'FCW2348A09Z',
      condition: 'O\'rnatilgan, yuklama 42%'
    },
    assignee: {
      name: 'Farrux Tojiyev',
      role: 'Network Admin',
      room: 'Server xonasi',
      department: 'Infratuzilma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      phone: '+998 90 999 88 77',
      email: 'farrux.t@company.uz'
    },
    location: 'Server xonasi, Rack #2'
  }
];

export const recentActivities: ActivityItem[] = [
  {
    id: 'act-1',
    assetId: 'jih-00124',
    assetName: 'MacBook Pro 16" (M3 Max)',
    assetCode: 'JIH-2024-00124',
    action: 'Nurmuhammad Y. ga qayta biriktirildi',
    timestamp: 'Bugun, 10:45',
    type: 'transfer',
    user: 'Sanobar K.',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    badgeType: 'active'
  },
  {
    id: 'act-2',
    assetId: 'jih-00089',
    assetName: 'Herman Miller Aeron Kursi',
    assetCode: 'JIH-2023-00089',
    action: "Diagnostika uchun ustaxonaga jo'natildi",
    timestamp: 'Bugun, 09:20',
    type: 'repair',
    user: 'Sherzod A.',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    badgeType: 'repair'
  },
  {
    id: 'act-3',
    assetId: 'jih-00125',
    assetName: 'Dell UltraSharp 27" 4K',
    assetCode: 'JIH-2024-00125',
    action: 'QR pasport tekshiruvi muvaffaqiyatli',
    timestamp: 'Kecha, 17:15',
    type: 'check',
    user: 'Sanobar K.',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    badgeType: 'active'
  },
  {
    id: 'act-4',
    assetId: 'jih-00045',
    assetName: 'ThinkPad X1 Carbon Gen 11',
    assetCode: 'JIH-2023-00045',
    action: 'Nosoz holat belgilandi va hisobdan chiqarishga berildi',
    timestamp: '10 Noyabr, 14:30',
    type: 'repair',
    user: 'Farrux T.',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    badgeType: 'broken'
  },
  {
    id: 'act-5',
    assetId: 'jih-00210',
    assetName: 'Cisco Catalyst 9200 Switch',
    assetCode: 'JIH-2024-00210',
    action: "Server xonasi Rack #2 ga o'rnatildi",
    timestamp: '08 Noyabr, 11:00',
    type: 'register',
    user: 'Farrux T.',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    badgeType: 'active'
  }
];

export const overdueRepairs: RepairItem[] = [
  {
    id: 'rep-1',
    assetId: 'jih-00089',
    assetName: 'Herman Miller Aeron Kursi',
    assetCode: 'JIH-2023-00089',
    issue: 'Gaz-lift mexanizmi va suyanchiq amortizatori',
    reportedDate: '28 Oktabr',
    expectedDate: '05 Noyabr (3 kun kechikmoqda)',
    isOverdue: true,
    serviceCenter: 'ErgoFix Servis',
    stage: 'parts_waiting',
    costEstimate: '$85.00'
  },
  {
    id: 'rep-2',
    assetId: 'jih-00099',
    assetName: 'Sony WH-1000XM5 Quloqchin',
    assetCode: 'JIH-2024-00099',
    issue: 'O\'ng dinamikda shovqin va ANC datchigi',
    reportedDate: '25 Oktabr',
    expectedDate: '02 Noyabr (6 kun kechikmoqda)',
    isOverdue: true,
    serviceCenter: 'AudioMaster Tashkent',
    stage: 'in_progress',
    costEstimate: '$45.00'
  },
  {
    id: 'rep-3',
    assetId: 'jih-00104',
    assetName: 'Epson EcoTank L3250 Printer',
    assetCode: 'JIH-2023-00104',
    issue: 'Rangli kallak qurigani va qog\'oz tortgich',
    reportedDate: '01 Noyabr',
    expectedDate: '07 Noyabr (4 kun kechikmoqda)',
    isOverdue: true,
    serviceCenter: 'PrintExpert Markazi',
    stage: 'diagnostics',
    costEstimate: '$30.00'
  }
];
