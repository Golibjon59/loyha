export const REACT_NATIVE_APP_CODE = `/**
 * InvenTrack - Korporativ Inventar Boshqaruv Tizimi
 * Texnologiyalar: React Native (Expo) + Tailwind CSS (NativeWind v4/v2) + Lucide Icons (lucide-react-native)
 * 
 * Ushbu kod barcha 4 ta asosiy ekranni o'z ichiga oladi:
 * 1. Mobile Dashboard (Bosh sahifa)
 * 2. Markaziy QR Skaner (Kamera ramkasi + Bottom Sheet)
 * 3. Jihoz Kartasi (Asset Detail + Sticky tugmalar)
 * 4. Qotirilgan Bottom Navigation Bar (5 ta tugmali)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  Home,
  Layers,
  QrCode,
  Wrench,
  User,
  Bell,
  Search,
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  Share2,
  Cpu,
  HardDrive,
  ShieldCheck,
  Calendar,
  Building,
  UserCheck,
  Phone,
  Mail,
  Zap,
  Camera,
  X,
  CheckCircle2,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// --- ASOSIY MA'LUMOTLAR VA STATISTIKA ---
const ASSET_DATA = {
  name: 'MacBook Pro 16"',
  model: 'Apple MacBook Pro 16" Space Black (M3 Max)',
  code: 'JIH-2024-00124',
  status: 'active',
  statusText: 'Faol',
  image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  specs: [
    { label: 'Protsessor', value: 'M3 Max', sub: '16-core CPU, 40 GPU' },
    { label: 'Operativ xotira (RAM)', value: '36 GB', sub: 'Unified Memory' },
    { label: 'Doimiy xotira (SSD)', value: '1 TB', sub: 'NVMe Ultra Fast' },
    { label: 'Rasmiy Kafolat', value: '2 yil', sub: '2026-yilgacha amal qiladi' },
  ],
  assignee: {
    name: 'Nurmuhammad Y.',
    role: 'Lead Mobile & AI Engineer',
    room: '304-xona',
    department: "Dasturiy ta'minot bo'limi",
    phone: '+998 90 123 45 67',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
};

const RECENT_ACTIVITIES = [
  {
    id: '1',
    name: 'MacBook Pro 16" (M3 Max)',
    code: 'JIH-2024-00124',
    action: "Nurmuhammad Y. ga biriktirildi",
    time: 'Bugun, 10:45',
    status: 'Faol',
    statusType: 'active',
  },
  {
    id: '2',
    name: 'Herman Miller Aeron Kursi',
    code: 'JIH-2023-00089',
    action: "Diagnostika uchun jo'natildi",
    time: 'Bugun, 09:20',
    status: "Ta'mirda",
    statusType: 'repair',
  },
  {
    id: '3',
    name: 'Dell UltraSharp 27" 4K',
    code: 'JIH-2024-00125',
    action: "QR pasport tekshiruvidan o'tdi",
    time: 'Kecha, 17:15',
    status: 'Faol',
    statusType: 'active',
  },
  {
    id: '4',
    name: 'ThinkPad X1 Carbon Gen 11',
    code: 'JIH-2023-00045',
    action: "Nosoz holat - omborga qaytdi",
    time: '10 Noyabr, 14:30',
    status: 'Nosoz',
    statusType: 'broken',
  },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'list' | 'repair' | 'profile'>('home');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedAssetModal, setScannedAssetModal] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'detail'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Status Badge Helper
  const renderStatusBadge = (type: string, text: string) => {
    let bg = 'bg-[#ECFDF5]';
    let textColor = 'text-[#065F46]';
    let borderColor = 'border-[#A7F3D0]';

    if (type === 'repair' || text === "Ta'mirda") {
      bg = 'bg-[#FFFBEB]';
      textColor = 'text-[#92400E]';
      borderColor = 'border-[#FDE68A]';
    } else if (type === 'broken' || text === 'Nosoz') {
      bg = 'bg-[#FEF2F2]';
      textColor = 'text-[#991B1B]';
      borderColor = 'border-[#FECACA]';
    }

    return (
      <View className={\`px-2.5 py-1 rounded-full border \${bg} \${borderColor}\`}>
        <Text className={\`text-xs font-semibold \${textColor}\`}>{text}</Text>
      </View>
    );
  };

  // 1. MOBILE DASHBOARD EKRANI
  const renderDashboardScreen = () => (
    <ScrollView className="flex-1 bg-[#F8FAFC]" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
      {/* Header */}
      <View className="px-5 pt-4 pb-3 flex-row items-center justify-between">
        <View>
          <Text className="text-xs font-medium text-slate-500 uppercase tracking-wider">InvenTrack Mobile</Text>
          <Text className="text-2xl font-bold text-[#0F172A] tracking-tight">Salom, Sanobar! 👋</Text>
        </View>
        <TouchableOpacity className="relative p-2.5 bg-white border border-[#E2E8F0] rounded-2xl active:bg-slate-100">
          <Bell size={20} color="#0F172A" />
          <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </TouchableOpacity>
      </View>

      {/* Qidiruv Maydoni */}
      <View className="px-5 mt-2">
        <View className="flex-row items-center bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 shadow-sm">
          <Search size={18} color="#64748B" />
          <TextInput
            placeholder="Jihoz nomi yoki inventar raqami..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-sm text-[#0F172A]"
          />
        </View>
      </View>

      {/* 2 ta Yonma-Yon Karta */}
      <View className="px-5 mt-4 flex-row justify-between space-x-3">
        {/* Karta 1: Jami jihozlar */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-1 bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm"
        >
          <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center mb-3">
            <Layers size={20} color="#2563EB" />
          </View>
          <Text className="text-xs font-semibold text-slate-500">Jami jihozlar</Text>
          <Text className="text-2xl font-extrabold text-[#0F172A] mt-1 tracking-tight">1,428</Text>
          <Text className="text-[11px] text-emerald-600 font-medium mt-1">● 98.4% hisobda</Text>
        </TouchableOpacity>

        {/* Karta 2: Faol */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-1 bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm"
        >
          <View className="w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center mb-3">
            <CheckCircle2 size={20} color="#059669" />
          </View>
          <Text className="text-xs font-semibold text-slate-500">Faol jihozlar</Text>
          <Text className="text-2xl font-extrabold text-[#065F46] mt-1 tracking-tight">1,190</Text>
          <Text className="text-[11px] text-slate-400 font-medium mt-1">Faol foydalanishda</Text>
        </TouchableOpacity>
      </View>

      {/* 1 ta To'liq Enli Ogohlantiruvchi Karta */}
      <View className="px-5 mt-3.5">
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 shadow-sm"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-2.5">
              <View className="w-9 h-9 rounded-xl bg-amber-500/20 items-center justify-center">
                <AlertTriangle size={20} color="#92400E" />
              </View>
              <View className="ml-2.5">
                <Text className="text-base font-bold text-[#92400E]">Ta'mirda (48)</Text>
                <Text className="text-xs font-semibold text-red-600 mt-0.5">⚠️ 3 ta kechikmoqda</Text>
              </View>
            </View>
            <View className="w-8 h-8 rounded-full bg-white/80 items-center justify-center">
              <ArrowRight size={16} color="#92400E" />
            </View>
          </View>
          <View className="mt-3 pt-3 border-t border-amber-200/60 flex-row justify-between items-center">
            <Text className="text-xs text-amber-900 font-medium">O'rtacha ta'mir muddati: 4.2 kun</Text>
            <Text className="text-xs font-bold text-[#2563EB]">Barchasi →</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* So'nggi Harakatlar Ro'yxati */}
      <View className="px-5 mt-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold text-[#0F172A]">So'nggi harakatlar</Text>
          <TouchableOpacity>
            <Text className="text-xs font-bold text-[#2563EB]">Barchasini ko'rish</Text>
          </TouchableOpacity>
        </View>

        <View className="space-y-3">
          {RECENT_ACTIVITIES.map((act) => (
            <TouchableOpacity
              key={act.id}
              activeOpacity={0.75}
              onPress={() => setActiveScreen('detail')}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">{act.code}</Text>
                {renderStatusBadge(act.statusType, act.status)}
              </View>

              <Text className="text-base font-bold text-[#0F172A]">{act.name}</Text>
              <Text className="text-xs text-slate-500 mt-1 font-medium">{act.action}</Text>

              <View className="mt-3 pt-2.5 border-t border-slate-100 flex-row justify-between items-center">
                <Text className="text-[11px] text-slate-400 font-medium">{act.time}</Text>
                <View className="flex-row items-center">
                  <Text className="text-xs font-semibold text-[#2563EB]">Tafsilotlar</Text>
                  <ArrowRight size={12} color="#2563EB" style={{ marginLeft: 3 }} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  // 3. JİHOZ KARTASI (ASSET DETAIL) EKRANI
  const renderDetailScreen = () => (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top Navbar */}
        <View className="px-5 pt-3 pb-3 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setActiveScreen('dashboard')}
            className="w-10 h-10 rounded-2xl bg-white border border-[#E2E8F0] items-center justify-center shadow-sm"
          >
            <ChevronLeft size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text className="text-base font-bold text-[#0F172A]">Jihoz Pasporti</Text>
          <TouchableOpacity className="w-10 h-10 rounded-2xl bg-white border border-[#E2E8F0] items-center justify-center shadow-sm">
            <Share2 size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Tepada Jihoz Rasmi / Kartasi */}
        <View className="px-5 mt-2">
          <View className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm items-center">
            <Image
              source={{ uri: ASSET_DATA.image }}
              className="w-full h-44 rounded-xl"
              resizeMode="cover"
            />
            <View className="w-full mt-4 flex-row items-start justify-between">
              <View className="flex-1 mr-2">
                <Text className="text-xl font-black text-[#0F172A]">{ASSET_DATA.name}</Text>
                <Text className="text-xs font-bold text-slate-400 mt-0.5 tracking-wider">{ASSET_DATA.code}</Text>
                <Text className="text-xs text-slate-500 mt-1">{ASSET_DATA.model}</Text>
              </View>
              {renderStatusBadge(ASSET_DATA.status, ASSET_DATA.statusText)}
            </View>
          </View>
        </View>

        {/* 2 ta Ustunli Grid Ro'yxat */}
        <View className="px-5 mt-5">
          <Text className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Texnik Xususiyatlari</Text>
          <View className="flex-row flex-wrap justify-between">
            {ASSET_DATA.specs.map((item, idx) => (
              <View
                key={idx}
                className="w-[48%] bg-white border border-[#E2E8F0] rounded-2xl p-3.5 mb-3 shadow-sm"
              >
                <Text className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{item.label}</Text>
                <Text className="text-base font-extrabold text-[#0F172A] mt-1">{item.value}</Text>
                <Text className="text-[11px] text-slate-500 font-medium mt-0.5">{item.sub}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mas'ul Shaxs Bloki */}
        <View className="px-5 mt-3">
          <Text className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Mas'ul Xodim</Text>
          <View className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center">
              <Image
                source={{ uri: ASSET_DATA.assignee.avatar }}
                className="w-13 h-13 rounded-2xl"
              />
              <View className="ml-3.5 flex-1">
                <Text className="text-base font-bold text-[#0F172A]">{ASSET_DATA.assignee.name}</Text>
                <Text className="text-xs text-slate-500 font-medium">{ASSET_DATA.assignee.role}</Text>
                <View className="flex-row items-center mt-1">
                  <Building size={12} color="#2563EB" />
                  <Text className="text-xs font-bold text-[#2563EB] ml-1">{ASSET_DATA.assignee.room}</Text>
                  <Text className="text-xs text-slate-400 ml-1.5">• {ASSET_DATA.assignee.department}</Text>
                </View>
              </View>
            </View>

            {/* Aloqa tugmalari */}
            <View className="mt-3.5 pt-3 border-t border-slate-100 flex-row space-x-3">
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <Phone size={14} color="#0F172A" />
                <Text className="text-xs font-bold text-[#0F172A] ml-2">Qo'ng'iroq</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <Mail size={14} color="#0F172A" />
                <Text className="text-xs font-bold text-[#0F172A] ml-2">Xabar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Ekranning eng pastida qotirilgan (sticky) ikkita tugma */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-[#E2E8F0] px-5 py-4 pb-7 flex-row space-x-3 shadow-lg">
        {/* Ta'mirga jo'natish (Outline) */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-1 py-3.5 px-4 rounded-2xl border-2 border-slate-300 bg-white items-center justify-center"
        >
          <Text className="text-sm font-bold text-[#0F172A]">Ta'mirga jo'natish</Text>
        </TouchableOpacity>

        {/* Qayta biriktirish (Solid Ko'k) */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-[#2563EB] items-center justify-center shadow-md shadow-blue-500/30"
        >
          <Text className="text-sm font-bold text-white">Qayta biriktirish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Asosiy Ekran Kontenti */}
      {activeScreen === 'dashboard' ? renderDashboardScreen() : renderDetailScreen()}

      {/* 4. QOTIRILGAN (FIXED) BOTTOM NAVIGATION BAR */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-4 py-2 pb-5 flex-row items-center justify-around shadow-xl">
        {/* 1. Asosiy (Home) */}
        <TouchableOpacity
          onPress={() => {
            setCurrentTab('home');
            setActiveScreen('dashboard');
          }}
          className="items-center py-1"
        >
          <Home size={22} color={currentTab === 'home' ? '#2563EB' : '#94A3B8'} />
          <Text className={\`text-[11px] font-semibold mt-1 \${currentTab === 'home' ? 'text-[#2563EB]' : 'text-slate-400'}\`}>
            Asosiy
          </Text>
        </TouchableOpacity>

        {/* 2. Jihozlar (List) */}
        <TouchableOpacity
          onPress={() => setCurrentTab('list')}
          className="items-center py-1"
        >
          <Layers size={22} color={currentTab === 'list' ? '#2563EB' : '#94A3B8'} />
          <Text className={\`text-[11px] font-semibold mt-1 \${currentTab === 'list' ? 'text-[#2563EB]' : 'text-slate-400'}\`}>
            Jihozlar
          </Text>
        </TouchableOpacity>

        {/* 3. Markaziy Katta Ko'k QR Tugma */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setIsScannerOpen(true);
            setScannedAssetModal(false);
          }}
          className="-top-5 w-14 h-14 rounded-full bg-[#2563EB] items-center justify-center shadow-lg shadow-blue-600/50 border-4 border-[#F8FAFC]"
        >
          <QrCode size={26} color="#FFFFFF" />
        </TouchableOpacity>

        {/* 4. Ta'mir (Wrench) */}
        <TouchableOpacity
          onPress={() => setCurrentTab('repair')}
          className="items-center py-1"
        >
          <Wrench size={22} color={currentTab === 'repair' ? '#2563EB' : '#94A3B8'} />
          <Text className={\`text-[11px] font-semibold mt-1 \${currentTab === 'repair' ? 'text-[#2563EB]' : 'text-slate-400'}\`}>
            Ta'mir
          </Text>
        </TouchableOpacity>

        {/* 5. Profil (User) */}
        <TouchableOpacity
          onPress={() => setCurrentTab('profile')}
          className="items-center py-1"
        >
          <User size={22} color={currentTab === 'profile' ? '#2563EB' : '#94A3B8'} />
          <Text className={\`text-[11px] font-semibold mt-1 \${currentTab === 'profile' ? 'text-[#2563EB]' : 'text-slate-400'}\`}>
            Profil
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2. MARKAZIY QR SKANER (FULL SCREEN MODAL + BOTTOM SHEET) */}
      <Modal visible={isScannerOpen} animationType="fade" transparent={false}>
        <View className="flex-1 bg-black">
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          
          {/* Top Bar */}
          <SafeAreaView className="flex-row justify-between items-center px-6 pt-4">
            <TouchableOpacity
              onPress={() => setIsScannerOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            >
              <X size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <Text className="text-white text-base font-bold">QR / Shtrix Kod Skaneri</Text>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
              <Zap size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Skaner Ramkasi (ViewFinder) */}
          <View className="flex-1 items-center justify-center">
            <View className="w-64 h-64 border-2 border-white/40 rounded-3xl items-center justify-center relative overflow-hidden">
              {/* Burchak Belgilari */}
              <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#2563EB] rounded-tl-xl" />
              <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#2563EB] rounded-tr-xl" />
              <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#2563EB] rounded-bl-xl" />
              <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#2563EB] rounded-br-xl" />

              {/* Lazer Chiziq */}
              <View className="w-full h-0.5 bg-[#2563EB] shadow-md shadow-blue-500" />

              <Text className="absolute bottom-4 text-xs font-semibold text-white/80 bg-black/50 px-3 py-1 rounded-full">
                Inventar kodini ramkaga to'g'rilang
              </Text>
            </View>

            {/* Test Triggeri (Skan qilishni simulyatsiya qilish) */}
            <TouchableOpacity
              onPress={() => setScannedAssetModal(true)}
              className="mt-8 px-6 py-3 bg-white/20 border border-white/40 rounded-2xl flex-row items-center"
            >
              <Camera size={18} color="#FFFFFF" />
              <Text className="text-white font-bold ml-2 text-sm">JIH-2024-00124 ni skan qilish (Test)</Text>
            </TouchableOpacity>
          </View>

          {/* Pastdan Chiqib Turuvchi "Bottom Sheet" (Modal) */}
          {scannedAssetModal && (
            <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl border-t border-[#E2E8F0]">
              <View className="w-12 h-1.5 bg-slate-300 rounded-full self-center mb-4" />
              
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider">Topilgan Jihoz Pasporti</Text>
                  <Text className="text-xl font-extrabold text-[#0F172A] mt-0.5">MacBook Pro 16"</Text>
                  <Text className="text-xs font-bold text-slate-500 mt-1">Inventar: JIH-2024-00124</Text>
                </View>
                {renderStatusBadge('active', 'Faol')}
              </View>

              <View className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex-row justify-between">
                <View>
                  <Text className="text-[11px] text-slate-400">Mas'ul xodim</Text>
                  <Text className="text-xs font-bold text-[#0F172A]">Nurmuhammad Y.</Text>
                </View>
                <View>
                  <Text className="text-[11px] text-slate-400">Joylashuv</Text>
                  <Text className="text-xs font-bold text-[#0F172A]">304-xona (IT Lab)</Text>
                </View>
              </View>

              {/* To'liq Ko'rish Ko'k Tugmasi */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  setScannedAssetModal(false);
                  setIsScannerOpen(false);
                  setActiveScreen('detail');
                }}
                className="mt-5 w-full py-4 bg-[#2563EB] rounded-2xl items-center justify-center shadow-lg shadow-blue-500/30"
              >
                <Text className="text-white text-base font-bold">To'liq ko'rish →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
`;
