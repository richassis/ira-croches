import { Instagram, MapPin, Heart } from 'lucide-react';
import { storeConfig } from '../../data/products';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-xl font-display font-bold text-primary mb-4">
              {storeConfig.name}
            </h3>
            <p className="text-gray-300 text-sm">
              {storeConfig.description}
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-gray-300">{storeConfig.location}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Instagram className="w-4 h-4 text-primary" />
                <a
                  href={storeConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {storeConfig.instagram}
                </a>
              </li>
            </ul>
          </div>

          {/* Informações */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Produtos artesanais</li>
              <li>Feitos à mão com dedicação</li>
              <li>Qualidade garantida</li>
              <li>Atendimento via WhatsApp</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center space-x-1">
            <span>© {new Date().getFullYear()} {storeConfig.name}. Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>em {storeConfig.location}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
