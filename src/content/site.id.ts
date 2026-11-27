import type { SiteContent } from "./types";
import { shared } from "./shared";

export const siteId: SiteContent = {
  meta: {
    homeTitle: "Disatu — Jasa Pembuatan Website & Aplikasi",
    homeDescription:
      "Disatu membuat website company profile, aplikasi mobile, sistem backend, dan web app seperti e-commerce, sesuai kebutuhan bisnismu.",
    aboutTitle: "Tentang Disatu",
    aboutDescription:
      "Disatu menyediakan jasa pembuatan website, aplikasi mobile, sistem backend, dan web app. Berdiri sejak 2024, didirikan oleh Putu Bagus Raditya.",
  },
  ui: {
    menuOpen: "Buka menu",
    menuClose: "Tutup menu",
    skipToContent: "Lewati ke konten",
    themeLight: "Tema terang",
    themeDark: "Tema gelap",
    themeSystem: "Tema ikut sistem",
    switchLanguage: "Ganti bahasa",
    experienceTitle: "Pengalaman",
    skillsTitle: "Keahlian",
    educationTitle: "Pendidikan",
    whatsapp: "WhatsApp",
    email: "Email",
    consult: "Konsultasi",
    seeServices: "Lihat layanan",
    aboutCta: "Konsultasikan proyekmu",
  },
  brand: {
    name: "Disatu",
    tagline: "Website dan aplikasi yang dibangun sesuai kebutuhanmu.",
  },
  nav: [
    { label: "Layanan", page: "home", hash: "services" },
    { label: "Portofolio", page: "home", hash: "portfolio" },
    { label: "Proses", page: "home", hash: "process" },
    { label: "Produk", page: "home", hash: "products" },
    { label: "Tentang", page: "about" },
  ],
  hero: {
    eyebrow: "Disatu · Jasa Website & Aplikasi",
    title: "Website dan aplikasi yang dibangun sesuai kebutuhan bisnismu.",
    subtitle:
      "Dari company profile sampai aplikasi mobile dan sistem backend, Disatu merancang dan membangun produk digitalmu, dari konsultasi pertama sampai setelah rilis.",
  },
  services: {
    title: "Layanan Disatu",
    subtitle:
      "Dari company profile sampai sistem backend, kami bantu wujudkan produk digital sesuai kebutuhanmu.",
    contactLead: "Punya proyek? Hubungi kami.",
    items: [
      {
        title: "Website Company Profile",
        description:
          "Website profil perusahaan yang rapi, cepat, dan mencerminkan brand bisnismu.",
        icon: shared.serviceIcons[0],
      },
      {
        title: "Aplikasi Mobile",
        description:
          "Aplikasi mobile yang dirancang sesuai kebutuhan bisnis dan penggunanya.",
        icon: shared.serviceIcons[1],
      },
      {
        title: "Sistem Backend",
        description:
          "API dan sistem di balik layar yang andal dan siap dikembangkan.",
        icon: shared.serviceIcons[2],
      },
      {
        title: "Web App dan E-Commerce",
        description:
          "Web app sesuai kebutuhan, seperti toko online, dashboard, dan sistem bisnis lainnya.",
        icon: shared.serviceIcons[3],
      },
    ],
  },
  portfolio: {
    tag: "Portofolio",
    title: "Proyek yang sudah kami bangun",
    subtitle:
      "Website company profile dan dashboard manajemen organisasi, masing-masing untuk kebutuhan yang berbeda.",
    items: [
      {
        id: "captivad",
        name: "Captivad",
        kind: "Website company profile",
        description:
          "Website company profile untuk agensi digital yang menghubungkan merek dengan audiens lewat data, media, dan pengalaman berbasis AI. Tampilannya gelap dan tegas, dengan satu pesan utama di halaman depan supaya pengunjung langsung paham apa yang ditawarkan.",
        highlights: [
          "Pesan utama berukuran besar di halaman depan",
          "Menu langsung ke profil, layanan, karya, AI Experience, dan kontak",
          "Tampilan gelap yang menonjolkan sisi teknologi",
        ],
        imageAlt:
          'Halaman depan website Captivad: judul besar "Where Reach Meets Intelligence" di latar gelap',
        visit: "Kunjungi captivad.co",
      },
      {
        id: "geoarthasemesta",
        name: "PT GEO Artha Semesta",
        kind: "Website company profile",
        description:
          "Website company profile perusahaan nasional di bidang layanan dan solusi lepas pantai dan bawah laut, dari operasi dan pemeliharaan (O&M) sampai dukungan konstruksi. Layanan, peralatan, dan pengalaman proyek ditata agar calon klien di industri minyak & gas bisa menilai kemampuan perusahaan dengan cepat.",
        highlights: [
          "Foto operasi lepas pantai sebagai pembuka halaman",
          "Bagian layanan, peralatan, dan pengalaman proyek",
          "Pilihan bahasa langsung dari menu",
        ],
        imageAlt:
          "Halaman depan website PT GEO Artha Semesta: foto kapal dan anjungan lepas pantai dengan judul solusi bawah laut",
        visit: "Kunjungi geoarthasemesta.com",
      },
      {
        id: "organization-dashboard",
        name: "Dashboard Manajemen Organisasi",
        kind: "Aplikasi web",
        description:
          "Dashboard untuk mengelola organisasi dalam satu tempat: data anggota, keuangan, serta surat masuk dan keluar. Pengurus mencatat pembukuan, pinjaman, dan iuran anggota, lalu melihat ringkasan keuangan per periode.",
        highlights: [
          "Manajemen anggota, peran, dan hak akses",
          "Keuangan: pembukuan, pinjaman, dan iuran anggota",
          "Pembuatan surat masuk dan keluar",
          "Ringkasan keuangan per periode yang bisa diekspor",
        ],
        imageAlt:
          "Halaman Ringkasan Keuangan pada dashboard organisasi: total kas, saldo akun kas, dan transaksi terbaru",
      },
    ],
  },
  process: {
    tag: "Cara kami bekerja",
    title: "Lima langkah dari ide sampai rilis",
    subtitle:
      "Setiap proyek berjalan dengan urutan yang sama, supaya kamu selalu tahu apa yang sedang dikerjakan dan apa berikutnya.",
    stepWord: "Langkah",
    next: "Langkah berikutnya",
    cta: "Mulai konsultasi",
    steps: [
      {
        id: "discovery",
        label: "Konsultasi kebutuhan",
        title: "Pahami dulu apa yang kamu butuhkan",
        description:
          "Kita mulai dari ngobrol: tujuan bisnismu, siapa penggunanya, dan masalah apa yang ingin diselesaikan.",
        points: [
          {
            label: "Tujuan dan pengguna",
            text: "Apa yang ingin dicapai, dan siapa yang akan memakainya.",
          },
          {
            label: "Kebutuhan fitur",
            text: "Fitur yang wajib ada sejak awal, dan fitur yang bisa menyusul.",
          },
        ],
      },
      {
        id: "proposal",
        label: "Rancangan & penawaran",
        title: "Rencana yang jelas sebelum mulai",
        description:
          "Kebutuhan tadi kami susun menjadi rancangan: cakupan pekerjaan, tahapan, dan penawaran.",
        points: [
          {
            label: "Cakupan pekerjaan",
            text: "Apa saja yang dikerjakan, dan apa yang tidak.",
          },
          {
            label: "Tahapan dan jadwal",
            text: "Urutan pengerjaan dan perkiraan waktu tiap tahap.",
          },
        ],
      },
      {
        id: "build",
        label: "Desain & pengembangan",
        title: "Dirancang dulu, lalu dibangun bertahap",
        description:
          "Tampilan dirancang lebih dulu, lalu dibangun bagian demi bagian. Kamu bisa melihat hasilnya dan memberi masukan di setiap tahap.",
        points: [
          {
            label: "Desain tampilan",
            text: "Rancangan halaman dan alur yang kamu setujui sebelum dibangun.",
          },
          {
            label: "Pengembangan bertahap",
            text: "Fitur dikerjakan sedikit demi sedikit, bukan langsung jadi di akhir.",
          },
          {
            label: "Masukan berkala",
            text: "Kamu meninjau progres secara rutin, jadi tidak ada kejutan di akhir.",
          },
        ],
      },
      {
        id: "launch",
        label: "Uji & rilis",
        title: "Diuji dulu, baru dirilis",
        description:
          "Sebelum dipakai pengguna, semua fitur diuji. Setelah siap, produkmu dirilis.",
        points: [
          {
            label: "Pengujian",
            text: "Fitur diuji agar berjalan sesuai rancangan di berbagai perangkat.",
          },
          {
            label: "Rilis",
            text: "Website online di domainmu, aplikasi terbit di toko aplikasi.",
          },
        ],
      },
      {
        id: "support",
        label: "Dukungan setelah rilis",
        title: "Tetap didampingi setelah rilis",
        description:
          "Rilis bukan akhir. Kami bantu perbaikan dan pengembangan lanjutan saat kebutuhanmu bertambah.",
        points: [
          {
            label: "Perbaikan",
            text: "Kendala yang muncul setelah rilis kami bantu tangani.",
          },
          {
            label: "Pengembangan lanjutan",
            text: "Fitur baru bisa ditambahkan saat bisnismu berkembang.",
          },
        ],
      },
    ],
  },
  products: {
    tag: "Produk Disatu",
    title: "Produk yang kami bangun sendiri",
    subtitle:
      "Disatu juga membangun dan menjalankan produk digitalnya sendiri.",
    items: [
      {
        id: "chartlab",
        name: "ChartLab",
        badge: "Dibangun oleh Disatu",
        description:
          "Platform trading crypto untuk menganalisa market dan menguji sistem trading. Semua fiturnya gratis.",
        features: [
          "Backtesting gratis dengan Bar Replay",
          "Statistik hasil backtest",
          "Rekomendasi R:R terbaik",
        ],
        cta: "Kunjungi ChartLab",
      },
    ],
  },
  aboutTeaser: {
    tag: "Tentang Disatu",
    title: "Berdiri sejak 2024",
    text: "Disatu didirikan oleh Putu Bagus Raditya, seorang software engineer.",
    cta: "Selengkapnya tentang Disatu",
  },
  contactCta: {
    title: "Punya proyek? Ceritakan ke kami",
    subtitle:
      "Ceritakan kebutuhanmu lewat WhatsApp atau email. Kami bantu cari solusi yang paling pas.",
  },
  about: {
    company: {
      title: "Tentang Disatu",
      tag: "Berdiri sejak 2024",
      intro:
        "Disatu menyediakan jasa pembuatan website company profile, aplikasi mobile, sistem backend, dan web app seperti e-commerce. Kami juga mengembangkan ChartLab, platform trading crypto yang gratis dipakai.",
      principleTitle: "Kebutuhan klien nomor satu",
      principle:
        "Disatu selalu mengutamakan kebutuhan klien dan mencarikan solusi terbaik untuk setiap proyek.",
      facts: [
        { label: "Berdiri", value: shared.foundedYear },
        { label: "Founder", value: "Putu Bagus Raditya" },
      ],
    },
    founder: {
      name: "Putu Bagus Raditya",
      role: "Founder Disatu",
      summary:
        "Trader crypto, sekaligus software engineer di NoLimit Indonesia.",
      location: "Kota Bandung, Jawa Barat",
      photo: shared.founderPhoto,
      education: [{ degree: "S1 Fisika", school: "Universitas Lampung" }],
      skills: [
        { group: "Frontend", items: shared.skills.frontend },
        { group: "Backend", items: shared.skills.backend },
        { group: "Database", items: shared.skills.database },
        { group: "Blockchain", items: shared.skills.blockchain },
        { group: "Trading", items: shared.skills.trading },
      ],
      experiences: [
        {
          role: "Software Engineer",
          company: "NoLimit Indonesia",
          period: "Okt 2023 — Sekarang",
          description: "Bekerja sebagai software engineer.",
          highlights: [],
        },
        {
          role: "Trader Crypto",
          company: "Market crypto",
          period: "± 3 tahun",
          description: "Trading crypto dengan pendekatan Smart Money Concept.",
          highlights: [],
        },
      ],
    },
    contact: shared.contact,
    socials: shared.socials,
  },
  footer: { note: "© Disatu" },
};
