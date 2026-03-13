import type { Location } from "@/features/locations/types/location.types";

export const mockLocations: Location[] = [
  // İstanbul
  {
    id: "loc-1",
    city: "İstanbul",
    label: "İstanbul Havalimanı (IST)",
    type: "AIRPORT",
    address: "İstanbul Havalimanı, Arnavutköy, İstanbul",
    phone: "+90 212 444 1234",
  },
  {
    id: "loc-2",
    city: "İstanbul",
    label: "Sabiha Gökçen Havalimanı (SAW)",
    type: "AIRPORT",
    address: "Sabiha Gökçen Havalimanı, Pendik, İstanbul",
    phone: "+90 216 444 1234",
  },
  {
    id: "loc-3",
    city: "İstanbul",
    label: "Levent Ofis",
    type: "OFFICE",
    address: "Büyükdere Cad. No:185, Levent, İstanbul",
    phone: "+90 212 555 0101",
  },
  {
    id: "loc-4",
    city: "İstanbul",
    label: "Kadıköy Ofis",
    type: "OFFICE",
    address: "Bağdat Cad. No:42, Kadıköy, İstanbul",
    phone: "+90 216 555 0102",
  },
  // Ankara
  {
    id: "loc-5",
    city: "Ankara",
    label: "Esenboğa Havalimanı (ESB)",
    type: "AIRPORT",
    address: "Esenboğa Havalimanı, Çubuk, Ankara",
    phone: "+90 312 444 2345",
  },
  {
    id: "loc-6",
    city: "Ankara",
    label: "Kızılay Ofis",
    type: "OFFICE",
    address: "Atatürk Bulvarı No:120, Kızılay, Ankara",
    phone: "+90 312 555 0201",
  },
  // İzmir
  {
    id: "loc-7",
    city: "İzmir",
    label: "Adnan Menderes Havalimanı (ADB)",
    type: "AIRPORT",
    address: "Adnan Menderes Havalimanı, Gaziemir, İzmir",
    phone: "+90 232 444 3456",
  },
  {
    id: "loc-8",
    city: "İzmir",
    label: "Alsancak Ofis",
    type: "OFFICE",
    address: "Kıbrıs Şehitleri Cad. No:88, Alsancak, İzmir",
    phone: "+90 232 555 0301",
  },
  // Antalya
  {
    id: "loc-9",
    city: "Antalya",
    label: "Antalya Havalimanı (AYT)",
    type: "AIRPORT",
    address: "Antalya Havalimanı, Muratpaşa, Antalya",
    phone: "+90 242 444 4567",
  },
  {
    id: "loc-10",
    city: "Antalya",
    label: "Lara Ofis",
    type: "OFFICE",
    address: "Lara Cad. No:56, Muratpaşa, Antalya",
    phone: "+90 242 555 0401",
  },
  // Bodrum
  {
    id: "loc-11",
    city: "Bodrum",
    label: "Milas-Bodrum Havalimanı (BJV)",
    type: "AIRPORT",
    address: "Milas-Bodrum Havalimanı, Milas, Muğla",
    phone: "+90 252 444 5678",
  },
  {
    id: "loc-12",
    city: "Bodrum",
    label: "Bodrum Merkez Ofis",
    type: "OFFICE",
    address: "Neyzen Tevfik Cad. No:24, Bodrum, Muğla",
    phone: "+90 252 555 0501",
  },
  // Dalaman
  {
    id: "loc-13",
    city: "Dalaman",
    label: "Dalaman Havalimanı (DLM)",
    type: "AIRPORT",
    address: "Dalaman Havalimanı, Dalaman, Muğla",
    phone: "+90 252 444 6789",
  },
  {
    id: "loc-14",
    city: "Dalaman",
    label: "Dalaman Ofis",
    type: "OFFICE",
    address: "Atatürk Cad. No:15, Dalaman, Muğla",
    phone: "+90 252 555 0601",
  },
];
