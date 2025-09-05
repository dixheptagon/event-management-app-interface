"use client";

import { Calendar, MoreHorizontal, Ticket, User } from "lucide-react";
import { Sidebar } from "./sidebar";
import { useState } from "react";
import Header from "./header";
import Breadcrumb from "./breadcrumb";
import TabNavigation from "./tabnavigation";
import EmptyState from "./empty.state";
import EventCard from "./event.card";

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("event-aktif");
  const [activeSection, setActiveSection] = useState("tiket-saya");

  const tabs = [
    { id: "event-aktif", label: "Event Aktif" },
    { id: "event-lalu", label: "Event Lalu" },
  ];

  const sampleEvent = {
    title: "CINTA KALA SENJA - BARASUARA NADHIF BASALAMAH",
    date: "25 Sep 2025",
    ticketCount: 1,
    status: "expired",
    statusLabel: "Pesanan Kadaluarsa",
    purchaseInfo: "Pembelian pada 21 Aug 2025, 01:44",
  };

  const getPageTitle = () => {
    switch (activeSection) {
      case "jelajah-event":
        return "Jelajah Event";
      case "tiket-saya":
        return "Tiket Saya";
      case "informasi-dasar":
        return "Informasi Dasar";
      case "pengaturan":
        return "Pengaturan";
      case "event-creator":
        return "Event Creator";
      default:
        return "Dashboard";
    }
  };

  const renderContent = () => {
    if (activeSection !== "tiket-saya") {
      return (
        <EmptyState
          message={`Halaman ${getPageTitle()} sedang dalam pengembangan`}
        />
      );
    }

    return (
      <>
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />

        {activeTab === "event-aktif" ? (
          <EventCard event={sampleEvent} />
        ) : (
          <EmptyState message="Tidak ada event lalu ditemukan" />
        )}
      </>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1">
        <Header title={getPageTitle()} />

        <Breadcrumb currentPage={getPageTitle()} />

        <div className="p-6">{renderContent()}</div>

        <div className="mt-auto p-6 text-right">
          <p className="text-xs text-gray-400">
            © 2025 LOKET (PT Global Loket Sejahtera)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
