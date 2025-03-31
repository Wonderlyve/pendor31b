import React from 'react';
import { Trophy, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface AdBannerProps {
  className?: string;
  variant?: 'default' | 'bonus' | 'live';
}

const adContent = [
  {
    title: "Pariez sur tous les sports !",
    subtitle: "Jusqu'à 100€ offerts pour vos paris sportifs",
    icon: Trophy,
    bgClass: "from-blue-600 to-blue-800",
    action: "Parier maintenant"
  },
  {
    title: "Bonus de bienvenue",
    subtitle: "Doublez votre 1er dépôt jusqu'à 200€",
    icon: Star,
    bgClass: "from-green-600 to-green-800",
    action: "Profiter de l'offre"
  },
  {
    title: "Paris en direct",
    subtitle: "Meilleures cotes sur les matchs en cours",
    icon: TrendingUp,
    bgClass: "from-red-600 to-red-800",
    action: "Voir les cotes live"
  },
  {
    title: "Offre spéciale weekend",
    subtitle: "Cotes boostées sur tous les matchs",
    icon: Star,
    bgClass: "from-purple-600 to-purple-800",
    action: "En profiter"
  }
];

export default function AdBanner({ className = "" }: AdBannerProps) {
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white !opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100',
        }}
        loop={true}
        className="ad-banner-swiper"
      >
        {adContent.map((content, index) => (
          <SwiperSlide key={index}>
            <div className={`bg-gradient-to-r ${content.bgClass} p-4 sm:p-6 text-white relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-sport-pattern transform rotate-12 scale-150"></div>
              </div>

              {/* Content */}
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center justify-center sm:justify-start">
                    <content.icon className="h-6 w-6 mr-2" />
                    {content.title}
                  </h3>
                  <p className="text-white/90">{content.subtitle}</p>
                  <button className="mt-4 bg-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 group"
                    style={{ color: content.bgClass.includes('blue') ? '#2563eb' : 
                            content.bgClass.includes('green') ? '#16a34a' :
                            content.bgClass.includes('red') ? '#dc2626' : '#9333ea' }}>
                    {content.action}
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="hidden lg:block">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    <content.icon className="w-full h-full text-white/80" />
                  </div>
                </div>
              </div>

              {/* Legal Notice */}
              <p className="text-xs mt-4 text-white/70 text-center sm:text-left">
                *Offre soumise à conditions. Jouer comporte des risques : endettement, isolement, dépendance.
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}