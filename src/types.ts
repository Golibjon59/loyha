export type AssetStatus = 'active' | 'repair' | 'broken';

export interface Asset {
  id: string;
  name: string;
  model: string;
  code: string; // Masalan: JIH-2024-00124
  category: 'Laptops' | 'Monitors' | 'Furniture' | 'Network' | 'Accessories';
  status: AssetStatus;
  statusText: string;
  image: string;
  purchaseDate: string;
  price: string;
  supplier: string;
  specs: {
    processor?: string;
    ram?: string;
    storage?: string;
    display?: string;
    warranty: string;
    serialNumber: string;
    condition?: string;
    customFields?: { label: string; value: string }[];
  };
  assignee: {
    name: string;
    role: string;
    room: string;
    department: string;
    avatar: string;
    phone: string;
    email: string;
  };
  location: string;
  qrCodeUrl?: string;
}

export interface ActivityItem {
  id: string;
  assetId: string;
  assetName: string;
  assetCode: string;
  action: string; // Masalan: "Sanobar K. tomonidan ro'yxatga olindi"
  timestamp: string;
  type: 'transfer' | 'repair' | 'check' | 'register';
  user: string;
  userAvatar: string;
  badgeType: AssetStatus;
}

export interface RepairItem {
  id: string;
  assetId: string;
  assetName: string;
  assetCode: string;
  issue: string;
  reportedDate: string;
  expectedDate: string;
  isOverdue: boolean;
  serviceCenter: string;
  stage: 'diagnostics' | 'parts_waiting' | 'in_progress' | 'ready';
  costEstimate: string;
}

export type ScreenTab = 'home' | 'list' | 'qr' | 'repair' | 'profile';
