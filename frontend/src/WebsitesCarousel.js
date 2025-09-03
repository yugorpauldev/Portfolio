import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './WebsitesCarousel.css';

import malikaSite from './assets/malika-site.webp';
import perfectusSite from './assets/perfectus-site.webp';
import nodeMint from './assets/nodemint-site (1).webp';

const websiteIdeas = {
  en: [
    {
      title: 'Perfectus',
      description: 'Official reseller of Oracle Primavera licenses and expert consulting for project management solutions.',
      image: perfectusSite,
      url: 'https://perfectus.co.mz',
    },
    {
      title: 'Malika Art Store',
      description: 'A beautiful and immersive online store for a visual artist, featuring a gallery and print shop.',
      image: malikaSite,
      url: 'https://malikafavre.com',
    },
    {
      title: 'NodeMint',
      description: 'A User Experience digital agency, specialized in Building UI',
      image: nodeMint,
      url: 'https://www.figma.com/proto/B0eGWzRBJKw2WGVxIAvBza/Nodemint---Site?node-id=0-1&t=dltX6H9hqsniH9nV-1',
    },
  ],
  pt: [
    {
      title: 'Perfectus',
      description: 'Revendedor oficial de licenças Oracle Primavera e consultoria especializada para soluções de gestão de projetos.',
      image: perfectusSite,
      url: 'https://perfectus.co.mz',
    },
    {
      title: 'Loja de Arte Malika',
      description: 'Uma loja online bela e imersiva para uma artista visual, com galeria e loja de impressões.',
      image: malikaSite,
      url: 'https://malikafavre.com',
    },
    {
      title: 'NodeMint',
      description: 'Um estudio especializado em Experiência do Usuário, focado em construir UIs interativas, focadas em conversão',
      image: nodeMint,
      url: 'https://www.figma.com/proto/B0eGWzRBJKw2WGVxIAvBza/Nodemint---Site?node-id=0-1&t=dltX6H9hqsniH9nV-1',
    },
  ]
};

const WebsitesCarousel = ({ palette, language = 'en' }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true
  };

  return (
    <section style={{backgroundColor: palette?.surface || '#fff'}}>
      <div className="max-w-7xl mx-auto px-8 pb-32">
        <div className="transform transition-all duration-1000">
          <h2 className="text-5xl font-extralight mb-16 text-center" style={{color: palette?.text || '#222'}}>
            {language === 'pt' ? 'Websites em Destaque' : 'Featured Websites'}
          </h2>
          <div className="relative">
            <Slider {...settings}>
              {websiteIdeas[language].map((website, index) => (
                <div key={index} className="px-4">
                  <div className="website-frame mb-8">
                    <img src={website.image} alt={website.title} className="w-full h-auto object-contain rounded-lg" style={{ aspectRatio: '16/9' }} />
                  </div>
                  <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-light mb-3" style={{color: palette?.text || '#222'}}>{website.title}</h3>
                    <p className="text-lg font-light mb-6" style={{color: palette?.primary || '#555'}}>{website.description}</p>
                    <a 
                      href={website.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block px-8 py-3 text-sm font-light border hover:bg-gray-50 transition-colors duration-300" 
                      style={{color: palette?.text || '#222', borderColor: palette?.primary || '#555'}}
                    >
                      {language === 'pt' ? 'Ver Site' : 'View Live Site'}
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsitesCarousel;
