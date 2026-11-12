import type { Appliance } from '../data/appliances';
import type { City } from '../data/cities';

export const PHONE_NUMBER = '09032486073';
export const PHONE_INTL = '+989032486073';
export const SITE_URL = 'https://semnan-service.ir';
export const SITE_NAME = 'سمنان سرویس';

export interface FaqItem {
  question: string;
  answer: string;
}

// --- Unique content generators for Level-3 pages ---

export function generateLevel3Intro(appliance: Appliance, city: City): string {
  const neighborhoodList = city.neighborhoods.slice(0, 3).join('، ');
  const climateNote = generateClimateNote(appliance, city);

  const templates = [
    `تعمیر ${appliance.name} در ${city.name} یکی از مهم‌ترین خدمات ارائه‌شده توسط ${SITE_NAME} است. با توجه به اینکه ${city.name} در فاصله ${city.distanceFromSemnan} مرکز استان قرار دارد و محله‌هایی مانند ${neighborhoodList} را در بر می‌گیرد، تیم تخصصی ما در کمترین زمان ممکن به منزل شما اعزام می‌شود. ${climateNote} متخصصین ما با سال‌ها تجربه در تعمیر برندهای مختلف ${appliance.name} آماده‌اند تا بهترین خدمات را با قیمت منصفانه به شما ارائه دهند. ${city.callout} و ما با تیم سیار خود در تمام محله‌های ${city.name} حاضر هستیم.`,
    `آیا به دنبال تعمیرکار حرفه‌ای ${appliance.name} در ${city.name} هستید؟ ${SITE_NAME} با تیمی مجرب و قطعات اصل، خدمات تعمیر ${appliance.name} را در تمام مناطق ${city.name} از جمله ${neighborhoodList} ارائه می‌دهد. ${climateNote} قیمت تعمیر ${appliance.name} در ${city.name} در محدوده ${appliance.priceRange} است و تمام خدمات با ضمانت همراه است. ${city.callout} و این موضوع اهمیت سرویس منظم لوازم خانگی در این منطقه را دوچندان می‌کند.`,
    `خدمات تعمیر ${appliance.name} در ${city.name} توسط ${SITE_NAME} با بالاترین استانداردهای کیفیت ارائه می‌شود. شهر ${city.name} با جمعیت ${city.population} نفر و محله‌های پرجمعیتی مانند ${neighborhoodList}، نیازمند خدمات تعمیراتی سریع و قابل اعتماد است. ${climateNote} متخصصین ما در تعمیر برندهای ${appliance.brands.slice(0, 3).join('، ')} و سایر برندهای ${appliance.name} تخصص دارند و با قطعات اصل، مشکلات دستگاه شما را برطرف می‌کنند. ${city.callout}.`,
  ];

  const index = hashString(appliance.slug + city.slug) % templates.length;
  return templates[index];
}

export function generateClimateNote(appliance: Appliance, city: City): string {
  const climateApplianceMap: Record<string, string[]> = {
    'کولر-گازی': [
      `با توجه به آب‌وهوای ${city.climate} در ${city.name}، تعمیر کولر گازی اهمیت ویژه‌ای دارد و در فصول گرم تقاضا برای این服务 به شدت افزایش می‌یابد.`,
      `آب‌وهوای ${city.name} (${city.climate}) باعث می‌شود کولر گازی بیشترین استفاده را داشته باشد و سرویس منظم آن ضروری است.`,
    ],
    'پکیج': [
      `با توجه به آب‌وهوای ${city.climate} در ${city.name}، پکیج و آبگرمکن در فصل زمستان پرتقاضاترین خدمت ما هستند.`,
      `زمستان‌های سرد ${city.name} با ${city.climate}، اهمیت تعمیر و سرویس منظم پکیج را دوچندان می‌کند.`,
    ],
    'یخچال': [
      `آب‌وهوای ${city.name} (${city.climate}) و نوسانات دمایی می‌تواند روی عملکرد یخچال تأثیر بگذارد و سرویس دوره‌ای آن را ضروری می‌کند.`,
      `در ${city.name} با ${city.climate}، یخچال فریزر در تمام فصول سال در حال کار است و خرابی آن نیاز فوری به تعمیر دارد.`,
    ],
    'لباسشویی': [
      `در ${city.name} با ${city.climate}، ماشین لباسشویی به دلیل سختی آب و نوسانات دمایی بیشتر تحت فشار قرار می‌گیرد.`,
      `آب‌وهوای ${city.name} و کیفیت آب در این منطقه می‌تواند باعث رسوب‌گیری در ماشین لباسشویی شود و سرویس منظم را ضروری کند.`,
    ],
    'ظرفشویی': [
      `با توجه به ${city.climate} در ${city.name} و سختی آب منطقه، ماشین ظرفشویی نیازمند سرویس دوره‌ای و ضدعفونی است.`,
      `در ${city.name}، آب‌وهوای ${city.climate} و کیفیت آب باعث رسوب‌گیری در ماشین ظرفشویی می‌شود که با سرویس منظم قابل جلوگیری است.`,
    ],
    'تلویزیون': [
      `در ${city.name} با ${city.climate}، نوسانات برق می‌تواند به برد تلویزیون آسیب بزند و استفاده از محافظ برق توصیه می‌شود.`,
      `آب‌وهوای ${city.name} و نوسانات برق منطقه می‌تواند باعث خرابی تلویزیون شود و سرویس آن را ضروری کند.`,
    ],
    'مایکروویو': [
      `در ${city.name} با ${city.climate}، مایکروویو به دلیل استفاده مکرر و نوسانات برق ممکن است نیاز به تعمیر داشته باشد.`,
      `آب‌وهوای ${city.name} و نوسانات برق منطقه می‌تواند به مایکروویو آسیب بزند و تعمیر آن را ضروری کند.`,
    ],
    'جاروبرقی': [
      `در ${city.name} با ${city.climate}، گرد و غبار بیشتر باعث می‌شود جاروبرقی بیشتر تحت فشار قرار بگیرد و سرویس منظم آن ضروری است.`,
      `آب‌وهوای ${city.name} و گرد و غبار منطقه باعث می‌شود فیلتر جاروبرقی سریع‌تر مسدود شود و تعمیر و سرویس آن را ضروری می‌کند.`,
    ],
  };

  const notes = climateApplianceMap[appliance.slug] || [
    `آب‌وهوای ${city.name} (${city.climate}) می‌تواند روی عملکرد ${appliance.name} تأثیر بگذارد.`,
  ];
  const index = hashString(appliance.slug + city.slug) % notes.length;
  return notes[index];
}

export function generateLevel3Faqs(appliance: Appliance, city: City): FaqItem[] {
  const applianceIssues = appliance.commonIssues;
  const issue1 = applianceIssues[0];
  const issue2 = applianceIssues[1];

  const applianceFaqs: FaqItem[] = [
    {
      question: `هزینه تعمیر ${appliance.name} در ${city.name} چقدر است؟`,
      answer: `هزینه تعمیر ${appliance.name} در ${city.name} بسته به نوع خرابی و قطعه مورد نیاز متغیر است. به طور کلی قیمت تعمیر ${appliance.name} در محدوده ${appliance.priceRange} است. پس از بررسی دستگاه توسط تکنسین، هزینه دقیق به شما اعلام می‌شود و بدون اطلاع قبلی هیچ هزینه‌ای دریافت نمی‌گردد.`,
    },
    {
      question: `چرا ${appliance.name} من در ${city.name} ${issue1.replace('عدم ', 'داشته و ') || 'خراب شده است'}؟`,
      answer: `${issue1} یکی از رایج‌ترین مشکلات ${appliance.name} است که می‌تواند به دلایل مختلفی از جمله فرسودگی قطعات، نوسانات برق یا عدم سرویس دوره‌ای رخ دهد. تکنسین‌های ما در ${city.name} با بررسی دقیق علت مشکل را تشخیص داده و آن را برطرف می‌کنند.`,
    },
  ];

  const localFaqs: FaqItem[] = [
    {
      question: `آیا تعمیرکار ${appliance.name} در ${city.name} همان روز اعزام می‌شود؟`,
      answer: `بله، ${SITE_NAME} در ${city.name} خدمات امداد همان روز ارائه می‌دهد. با تماس با شماره ${PHONE_NUMBER}، تکنسین نزدیک‌ترین به محل شما در ${city.name} در کمترین زمان ممکن اعزام می‌شود. در محله‌های ${city.neighborhoods.slice(0, 2).join(' و ')} و سایر مناطق ${city.name} زمان رسیدن کمتر از ۲ ساعت است.`,
    },
    {
      question: `تعمیر ${appliance.name} در ${city.name} چه ضمانتی دارد؟`,
      answer: `تمام خدمات تعمیر ${appliance.name} در ${city.name} توسط ${SITE_NAME} با ضمانت قطعات و خدمات ارائه می‌شود. در صورت بروز مجدد مشکل در دوره ضمانت، تکنسین به صورت رایگان به محل شما در ${city.name} اعزام می‌شود و مشکل را برطرف می‌کند. رضایت مشتری در ${city.name} اولویت ماست.`,
    },
  ];

  return [...applianceFaqs, ...localFaqs];
}

export function generateLevel3MetaTitle(appliance: Appliance, city: City): string {
  return `تعمیر ${appliance.name} در ${city.name} | امداد فوری ${PHONE_NUMBER} | ${SITE_NAME}`;
}

export function generateLevel3MetaDescription(appliance: Appliance, city: City): string {
  return `تعمیر ${appliance.name} در ${city.name} توسط تکنسین‌های متخصص ${SITE_NAME}. تعمیر فوری برندهای ${appliance.brands.slice(0, 3).join('، ')} با قطعات اصل و ضمانت. تماس: ${PHONE_NUMBER}`;
}

export function generateLevel3Canonical(appliance: Appliance, city: City): string {
  return `${SITE_URL}/تعمیرات/لوازم-خانگی/${appliance.slug}/${city.slug}/`;
}

// --- Schema generators ---

export function generateServiceSchema(appliance: Appliance, city: City, imageUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `تعمیر ${appliance.name} در ${city.name}`,
    serviceType: `تعمیر ${appliance.name}`,
    provider: {
      '@type': 'LocalBusiness',
      name: SITE_NAME,
      telephone: PHONE_INTL,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'سمنان',
        addressCountry: 'IR',
      },
      areaServed: {
        '@type': 'City',
        name: city.name,
      },
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    description: generateLevel3MetaDescription(appliance, city),
    image: imageUrl,
    offers: {
      '@type': 'Offer',
      priceRange: appliance.priceRange,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };
}

export function generateFAQSchema(faqs: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateLocalBusinessSchema(city?: City): object {
  const base: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    image: `${SITE_URL}/og-default.webp`,
    telephone: PHONE_INTL,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'سمنان',
      addressCountry: 'IR',
    },
    areaServed: 'استان سمنان',
    url: SITE_URL,
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2500',
    },
  };
  if (city) {
    base.areaServed = [{ '@type': 'City', name: city.name }];
    base.address = {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: 'سمنان',
      addressCountry: 'IR',
    };
  }
  return base;
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateDirectAnswerAppliance(appliance: Appliance, city: City): string {
  const neighborhoods = city.neighborhoods.slice(0, 3).join('، ');
  return `تعمیر ${appliance.name} در ${city.name} معمولاً بین ۴۵ تا ۹۰ دقیقه زمان می‌برد و هزینه آن از ${appliance.priceRange} شروع می‌شود. تکنسین آقای تعمیر در ${city.name} و محله‌های ${neighborhoods} به‌صورت حضوری و با گارانتی ۶ ماهه خدمات ارائه می‌دهد.`;
}

export function generateDirectAnswerTowTruck(city: City): string {
  return `خودروبر و امداد خودرو در ${city.name} به‌صورت شبانه‌روزی و با جرثقیل تحت مدیریت آقای ابراهیم همتی انجام می‌شود. میانگین زمان رسیدن به محل در ${city.name} کمتر از ۴۵ دقیقه است.`;
}

// --- Helpers ---

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function generateContentBody(appliance: Appliance, city: City): { heading: string; paragraphs: string[] }[] {
  const sections: { heading: string; paragraphs: string[] }[] = [];

  // Section 1: Common issues
  sections.push({
    heading: `شایع‌ترین مشکلات ${appliance.name} در ${city.name} چیست؟`,
    paragraphs: [
      `در ${city.name}، ${appliance.name} به دلایلی مانند ${city.climate} و شرایط محیطی، با مشکلات مختلفی مواجه می‌شود. شناخت این مشکلات کمک می‌کند تا در زمان بروز خرابی، سریع‌تر اقدام کنید. در ادامه به رایج‌ترین عیوب ${appliance.name} در ${city.name} اشاره می‌کنیم.`,
      appliance.commonIssues.map((issue, i) => `${i + 1}. ${issue} در ${city.name}`).join('\n\n'),
      `برای رفع هر یک از این مشکلات، تیم متخصص ${SITE_NAME} در ${city.name} آماده اعزام است. کافیست با شماره ${PHONE_NUMBER} تماس بگیرید تا تکنسین نزدیک‌ترین به محل شما در ${city.name} اعزام شود.`,
    ],
  });

  // Section 2: Brands
  sections.push({
    heading: `کدام برندهای ${appliance.name} در ${city.name} تعمیر می‌شوند؟`,
    paragraphs: [
      `تکنسین‌های ما در ${city.name} در تعمیر تمام برندهای ${appliance.name} تخصص دارند. از برندهای ${appliance.brands.slice(0, 4).join('، ')} گرفته تا برندهای ${appliance.brands.slice(4).join(' و ')}، تیم ما با قطعات اصل و دانش فنی روز، هر خرابی را برطرف می‌کند.`,
      `با توجه به اینکه ${city.name} شهری با جمعیت ${city.population} نفر است و لوازم خانگی برندهای مختلفی در آن استفاده می‌شود، تکنسین‌های ما با تجربه تعمیر بیش از هزاران دستگاه از برندهای مختلف، آماده ارائه بهترین خدمات در ${city.name} هستند.`,
    ],
  });

  // Section 3: Climate-specific section
  sections.push({
    heading: `آب‌وهوای ${city.name} چه تأثیری بر عملکرد ${appliance.name} دارد؟`,
    paragraphs: [
      generateClimateNote(appliance, city),
      `ساکنین محله‌های ${city.neighborhoods.slice(0, 4).join('، ')} در ${city.name} بیشتر با مشکلات مربوط به ${appliance.commonIssues[0]} و ${appliance.commonIssues[1]} مواجه می‌شوند. دلیل اصلی این است که ${city.climate} باعث می‌شود ${appliance.name} با فشار بیشتری کار کند و قطعات آن سریع‌تر فرسوده شوند.`,
      `توصیه می‌کنیم ساکنین ${city.name} حداقل هر ۶ ماه یک‌بار ${appliance.name} خود را سرویس کنند تا از خرابی‌های ناگهانی جلوگیری شود. برای رزرو سرویس دوره‌ای در ${city.name} با شماره ${PHONE_NUMBER} تماس بگیرید.`,
    ],
  });

  // Section 4: Price
  sections.push({
    heading: `هزینه تعمیر ${appliance.name} در ${city.name} چقدر است؟`,
    paragraphs: [
      `قیمت تعمیر ${appliance.name} در ${city.name} شامل هزینه بازدید، دستمزد تکنسین و قیمت قطعات است. به طور کلی هزینه تعمیر ${appliance.name} در محدوده ${appliance.priceRange} متغیر است. هزینه بازدید در صورت انجام تعمیر رایگان است.`,
      `در ${city.name}، برخلاف شهرهای بزرگ، هزینه تعمیر ${appliance.name} منصفانه‌تر است و ${SITE_NAME} با ارائه قیمت رقابتی، تلاش می‌کند خدمات باکیفیت را در دسترس همه ساکنین ${city.name} قرار دهد. پس از بررسی دستگاه، فاکتور دقیق به شما ارائه می‌شود.`,
    ],
  });

  // Section 5: Process
  sections.push({
    heading: `مراحل تعمیر ${appliance.name} در ${city.name} چگونه است؟`,
    paragraphs: [
      `1. تماس و ثبت درخواست: با تماس به ${PHONE_NUMBER}، درخواست تعمیر ${appliance.name} در ${city.name} را ثبت کنید. اپراتور ما نزدیک‌ترین تکنسین به محل شما در ${city.name} را پیدا می‌کند.`,
      `2. اعزام تکنسین: تکنسین ما در کمترین زمان ممکن (معمولاً کمتر از ۲ ساعت در ${city.name}) به منزل شما اعزام می‌شود و ${appliance.name} را بررسی می‌کند.`,
      `3. تشخیص و اعلام هزینه: تکنسین پس از بررسی دقیق ${appliance.name}، علت خرابی را به شما اعلام کرده و هزینه تعمیر را به شفاف‌ترین شکل ممکن پیش از شروع کار ارائه می‌دهد.`,
      `4. تعمیر و ضمانت: پس از تأیید شما، تعمیر ${appliance.name} با قطعات اصل انجام می‌شود و کارت ضمانت به شما داده می‌شود. در صورت بروز مجدد مشکل در ${city.name}، تکنسین به صورت رایگان اعزام می‌شود.`,
    ],
  });

  // Section 6: Review
  sections.push({
    heading: `مشتریان ${SITE_NAME} در ${city.name} چه نظری دارند؟`,
    paragraphs: [
      `${city.localReview.customerName} از ساکنین ${city.name} می‌گوید: «${city.localReview.text}» — امتیاز: ${city.localReview.rating} از ۵`,
      `مشتریان ما در ${city.name} رضایت بالایی از خدمات تعمیر ${appliance.name} دارند. با امتیاز میانگین ۴.۸ از ۵، ${SITE_NAME} یکی از معتبرترین مراکز تعمیر لوازم خانگی در ${city.name} است.`,
    ],
  });

  return sections;
}

export function generateApplianceHubIntro(appliance: Appliance): string {
  return `${appliance.uniqueIntro} در استان سمنان، ${SITE_NAME} با تیمی از متخصصین حرفه‌ای، خدمات تعمیر ${appliance.name} را در تمام ۲۲ شهر استان ارائه می‌دهد. خرابی ${appliance.name} می‌تواند زندگی روزمره شما را به شدت مختل کند و به همین دلیل ما خدمات امداد فوری در همان روز را در تمام مناطق استان سمنان ارائه می‌دهیم.`;
}

export function generateCityHubIntro(city: City): string {
  return `شهر ${city.name} با جمعیت ${city.population} نفر و محله‌های متعددی مانند ${city.neighborhoods.slice(0, 5).join('، ')}، یکی از مهم‌ترین مناطق تحت پوشش ${SITE_NAME} است. ${city.callout}. آب‌وهوای ${city.name} (${city.climate}) باعث می‌شود لوازم خانگی در این منطقه با چالش‌های خاصی مواجه شوند و به سرویس منظم و تعمیر حرفه‌ای نیاز داشته باشند. تیم تخصصی ما در ${city.name} آماده ارائه خدمات تعمیر تمام انواع لوازم خانگی با قطعات اصل و ضمانت است.`;
}

export function generateApplianceHubFaqs(appliance: Appliance): FaqItem[] {
  return [
    {
      question: `تعمیر ${appliance.name} چه مدت طول می‌کشد؟`,
      answer: `زمان تعمیر ${appliance.name} بسته به نوع خرابی متفاوت است. تعمیرات ساده معمولاً ۱ تا ۲ ساعت طول می‌کشد، اما در مواردی که نیاز به سفارش قطعه باشد، ممکن است تا ۲۴ ساعت زمان نیاز باشد. تکنسین‌های ما در تمام شهرهای استان سمنان آماده ارائه خدمات سریع هستند.`,
    },
    {
      question: `هزینه تعمیر ${appliance.name} چقدر است؟`,
      answer: `هزینه تعمیر ${appliance.name} در محدوده ${appliance.priceRange} متغیر است. هزینه دقیق پس از بررسی دستگاه توسط تکنسین اعلام می‌شود. هزینه بازدید در صورت انجام تعمیر رایگان است.`,
    },
    {
      question: `کدام برندهای ${appliance.name} را تعمیر می‌کنید؟`,
      answer: `ما تمام برندهای ${appliance.name} از جمله ${appliance.brands.join('، ')} را تعمیر می‌کنیم. تکنسین‌های ما در تعمیر برندهای ایرانی و خارجی تخصص کامل دارند.`,
    },
    {
      question: `آیا تعمیر ${appliance.name} ضمانت دارد؟`,
      answer: `بله، تمام خدمات تعمیر ${appliance.name} با ضمانت قطعات و خدمات ارائه می‌شود. در صورت بروز مجدد مشکل در دوره ضمانت، تکنسین به صورت رایگان اعزام می‌شود.`,
    },
  ];
}

export function generateCityHubFaqs(city: City): FaqItem[] {
  return [
    {
      question: `آیا خدمات تعمیر لوازم خانگی در ${city.name} همان روز ارائه می‌شود؟`,
      answer: `بله، ${SITE_NAME} در ${city.name} خدمات امداد همان روز را ارائه می‌دهد. با تماس با شماره ${PHONE_NUMBER}، تکنسین نزدیک‌ترین به محل شما در ${city.name} در کمترین زمان اعزام می‌شود.`,
    },
    {
      question: `تعمیر کدام لوازم خانگی در ${city.name} بیشتر تقاضا دارد؟`,
      answer: `در ${city.name} با توجه به ${city.climate}، تعمیر کولر گازی در تابستان و پکیج در زمستان بیشترین تقاضا را دارد. همچنین تعمیر یخچال و ماشین لباسشویی در تمام فصول سال پرتقاضاست.`,
    },
    {
      question: `هزینه بازدید تعمیرکار در ${city.name} چقدر است؟`,
      answer: `هزینه بازدید در ${city.name} در صورت انجام تعمیر رایگان است. در صورتی که تعمیر انجام نشود، هزینه بازدید نمادین دریافت می‌شود. برای اطلاع از هزینه دقیق با ${PHONE_NUMBER} تماس بگیرید.`,
    },
    {
      question: `آیا در محله‌های دور ${city.name} هم خدمات ارائه می‌دهید؟`,
      answer: `بله، تیم سیار ما تمام محله‌های ${city.name} از جمله ${city.neighborhoods.slice(0, 3).join('، ')} را تحت پوشش دارد. حتی در مناطق دورتر ${city.name} نیز تکنسین اعزام می‌شود.`,
    },
  ];
}
