/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { BottomNav } from './components/BottomNav';
import { DashboardScreen } from './screens/DashboardScreen';
import { QRScannerScreen } from './screens/QRScannerScreen';
import { AssetDetailScreen } from './screens/AssetDetailScreen';
import { AssetListScreen } from './screens/AssetListScreen';
import { RepairsScreen } from './screens/RepairsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ReactNativeExportModal } from './components/ReactNativeExportModal';
import { sampleAssets, primaryAsset, recentActivities } from './data/mockData';
import { ScreenTab, Asset, ActivityItem } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('home');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isCodeExportOpen, setIsCodeExportOpen] = useState(false);

  // Dynamic asset collection and activity log
  const [assetsList, setAssetsList] = useState<Asset[]>(sampleAssets);
  const [activitiesList, setActivitiesList] = useState<ActivityItem[]>(recentActivities);

  // Asset selection handler
  const handleSelectAssetById = (assetId: string) => {
    const found = assetsList.find((a) => a.id === assetId) || primaryAsset;
    setSelectedAsset(found);
  };

  const handleViewAssetDetail = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleUpdateAssetStatus = (updated: Asset) => {
    setAssetsList((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    // Add activity log
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      assetId: updated.id,
      assetName: updated.name,
      assetCode: updated.code,
      action: updated.status === 'repair'
        ? "Ta'mirga jo'natildi"
        : `${updated.assignee.name} ga qayta biriktirildi`,
      timestamp: 'Hozirgina',
      type: updated.status === 'repair' ? 'repair' : 'transfer',
      user: 'Sanobar K.',
      userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      badgeType: updated.status,
    };
    setActivitiesList((prev) => [newActivity, ...prev]);
  };

  // Determine current screen title for header indicator
  const getScreenTitle = () => {
    if (selectedAsset) return `Jihoz: ${selectedAsset.name}`;
    if (isScannerOpen) return 'QR & Barcode Skaner';
    switch (currentTab) {
      case 'home':
        return 'Mobile Dashboard (Bosh sahifa)';
      case 'list':
        return "Jihozlar Ro'yxati";
      case 'repair':
        return "Ta'mir & Servis";
      case 'profile':
        return 'Foydalanuvchi Profili';
      default:
        return 'InvenTrack';
    }
  };

  return (
    <MobileFrame
      activeScreenTitle={getScreenTitle()}
      onOpenCodeExport={() => setIsCodeExportOpen(true)}
      onResetToDashboard={() => {
        setSelectedAsset(null);
        setCurrentTab('home');
        setIsScannerOpen(false);
      }}
    >
      {/* If an asset is selected, show AssetDetailScreen (Screen 3) */}
      {selectedAsset ? (
        <AssetDetailScreen
          asset={selectedAsset}
          onBack={() => setSelectedAsset(null)}
          onUpdateAssetStatus={handleUpdateAssetStatus}
        />
      ) : (
        /* Tab Screens */
        <div className="flex-1 flex flex-col relative h-full overflow-hidden">
          {currentTab === 'home' && (
            <DashboardScreen
              onSelectAsset={handleSelectAssetById}
              onNavigateToTab={(tab) => {
                setSelectedAsset(null);
                setCurrentTab(tab);
              }}
              onOpenScanner={() => setIsScannerOpen(true)}
              activities={activitiesList}
              allAssets={assetsList}
            />
          )}

          {currentTab === 'list' && (
            <AssetListScreen
              assets={assetsList}
              onSelectAsset={handleSelectAssetById}
            />
          )}

          {currentTab === 'repair' && (
            <RepairsScreen
              onSelectAsset={handleSelectAssetById}
              allAssets={assetsList}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen onOpenCodeExport={() => setIsCodeExportOpen(true)} />
          )}

          {/* 4. Ekran pastida qotirilgan (fixed) Bottom Navigation Bar */}
          <BottomNav
            currentTab={currentTab}
            onTabChange={(tab) => {
              setSelectedAsset(null);
              setCurrentTab(tab);
            }}
            onOpenScanner={() => setIsScannerOpen(true)}
            repairCount={48}
          />
        </div>
      )}

      {/* 2. Markaziy QR Skaner (Bottom Nav'dagi markaziy tugma bosilganda) */}
      <QRScannerScreen
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onViewAssetDetail={handleViewAssetDetail}
        primaryAsset={primaryAsset}
        sampleAssets={assetsList}
      />

      {/* React Native Expo Code Exporter Modal */}
      <ReactNativeExportModal
        isOpen={isCodeExportOpen}
        onClose={() => setIsCodeExportOpen(false)}
      />
    </MobileFrame>
  );
}
