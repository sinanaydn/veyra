import type { FAQItem } from "@/features/faq/types/faq.types";

export const mockFAQItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Rezervasyon nasıl yapılır?",
    answer: "Web sitemiz üzerinden alış/dönüş lokasyonu ve tarih seçerek uygun araçları listeleyebilirsiniz. Aracınızı seçtikten sonra sürücü bilgilerinizi girerek rezervasyonunuzu tamamlayabilirsiniz.",
    category: "BOOKING",
    order: 1,
  },
  {
    id: "faq-2",
    question: "Ödeme hangi yöntemlerle yapılabilir?",
    answer: "Kredi kartı ve banka kartı ile ödeme kabul ediyoruz. Kurumsal müşteriler için havale/EFT seçeneği de mevcuttur. Tüm ödemeler güvenli altyapı üzerinden işlenir.",
    category: "PAYMENT",
    order: 2,
  },
  {
    id: "faq-3",
    question: "Depozito ne kadar ve ne zaman iade edilir?",
    answer: "Depozito tutarı araç segmentine göre değişmektedir. Aracın hasarsız iade edilmesi durumunda depozito, iade tarihinden itibaren 3-5 iş günü içinde kartınıza geri yüklenir.",
    category: "DEPOSIT",
    order: 3,
  },
  {
    id: "faq-4",
    question: "Sigorta paketleri neleri kapsıyor?",
    answer: "Temel Kasko tüm kiralamalara dahildir ve standart hasar güvencesi sağlar. Tam Koruma paketi muafiyetsiz koruma, cam ve lastik hasarını kapsar. Premium Koruma ise ek sürücü güvencesi ve havalimanı acil destek içerir.",
    category: "INSURANCE",
    order: 4,
  },
  {
    id: "faq-5",
    question: "Havalimanı teslim/teslimat nasıl çalışır?",
    answer: "Havalimanı lokasyonlarında aracınız terminal çıkışında sizi bekler. Teslimat personelimiz sizi karşılar ve araç teslim işlemini hızlıca gerçekleştirir. İade sırasında aracı havalimanı park alanına bırakmanız yeterlidir.",
    category: "AIRPORT",
    order: 5,
  },
  {
    id: "faq-6",
    question: "Rezervasyonumu iptal edebilir miyim?",
    answer: "Alış tarihinden 48 saat öncesine kadar ücretsiz iptal yapılabilir. 48 saat içinde yapılan iptallerde 1 günlük kiralama bedeli tahsil edilir. No-show durumunda iade yapılmaz.",
    category: "CANCELLATION",
    order: 6,
  },
  {
    id: "faq-7",
    question: "Kilometre limiti ne kadar?",
    answer: "Günlük kilometre limiti araç segmentine göre 250-400 km arasında değişir. Limit aşımında km başına ek ücret uygulanır. Sınırsız km paketleri kurumsal müşterilere özel olarak sunulmaktadır.",
    category: "MILEAGE",
    order: 7,
  },
  {
    id: "faq-8",
    question: "Araç kiralamak için hangi belgeler gerekli?",
    answer: "Geçerli bir ehliyet (en az 1 yıllık), kimlik belgesi veya pasaport ve ödeme için kredi kartı gerekmektedir. Yabancı uyruklu müşteriler için uluslararası ehliyet önerilir.",
    category: "DOCUMENTS",
    order: 8,
  },
  {
    id: "faq-9",
    question: "Farklı şehirde iade yapabilir miyim?",
    answer: "Evet, tek yön kiralama hizmetimiz mevcuttur. Farklı şehirlerdeki ofis ve havalimanı lokasyonlarımızda iade yapabilirsiniz. Tek yön ücreti lokasyona göre değişmektedir.",
    category: "BOOKING",
    order: 9,
  },
  {
    id: "faq-10",
    question: "Ek sürücü ekleyebilir miyim?",
    answer: "Evet, rezervasyon sırasında veya teslim noktasında ek sürücü ekleyebilirsiniz. Ek sürücünün de geçerli ehliyete sahip olması gerekmektedir. Günlük ek sürücü ücreti uygulanır.",
    category: "BOOKING",
    order: 10,
  },
];
