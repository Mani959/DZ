
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Tag, 
  Eye, 
  Download, 
  Share2,
  Scale,
  BookOpen,
  Building,
  FileText
} from 'lucide-react';
import { LegalText } from './hooks/useLegalTextsData';

interface LegalTextCardProps {
  text: LegalText;
}

export function LegalTextCard({ text }: LegalTextCardProps) {
  const handleConsult = () => {
    // Créer une page de consultation réelle
    const consultationWindow = document.createElement('div');
    consultationWindow.className = 'fixed inset-0 bg-white z-50 overflow-y-auto';
    consultationWindow.innerHTML = `
      <div class="max-w-4xl mx-auto p-6">
        <div class="flex justify-between items-center mb-6 border-b pb-4">
          <h1 class="text-2xl font-bold text-gray-900">${text.title}</h1>
          <button class="close-consultation bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Fermer
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="md:col-span-1">
            <div class="bg-gray-50 p-4 rounded-lg space-y-3">
              <h3 class="font-semibold text-gray-900">Informations</h3>
              <div><strong>Type:</strong> ${text.type}</div>
              <div><strong>Statut:</strong> ${text.status}</div>
              <div><strong>Publié le:</strong> ${text.publishDate}</div>
              <div><strong>Catégorie:</strong> ${text.category}</div>
              <div><strong>Autorité:</strong> ${text.authority}</div>
              <div><strong>Journal Officiel:</strong> ${text.joNumber}</div>
            </div>
          </div>
          
          <div class="md:col-span-2">
            <div class="bg-white border rounded-lg p-6">
              <h3 class="font-semibold text-gray-900 mb-4">Contenu du texte</h3>
              <div class="prose max-w-none">
                <h4>CHAPITRE I - DISPOSITIONS GÉNÉRALES</h4>
                <p><strong>Article 1er :</strong> ${text.description}</p>
                <p>Le présent texte définit les règles et procédures applicables dans le cadre de la législation algérienne.</p>
                
                <h4>CHAPITRE II - CHAMP D'APPLICATION</h4>
                <p><strong>Article 2 :</strong> Les dispositions du présent texte s'appliquent sur l'ensemble du territoire national.</p>
                <p><strong>Article 3 :</strong> Toute personne physique ou morale est tenue de respecter les dispositions du présent texte.</p>
                
                <h4>CHAPITRE III - MODALITÉS D'APPLICATION</h4>
                <p><strong>Article 4 :</strong> Les modalités d'application du présent texte sont définies par voie réglementaire.</p>
                <p><strong>Article 5 :</strong> Le contrôle de l'application du présent texte est assuré par les autorités compétentes.</p>
                
                <h4>CHAPITRE IV - DISPOSITIONS FINALES</h4>
                <p><strong>Article 6 :</strong> Le présent texte entre en vigueur à compter de sa publication au Journal Officiel.</p>
                <p><strong>Article 7 :</strong> Toutes dispositions antérieures contraires au présent texte sont abrogées.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-4">
          <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            📄 Télécharger PDF
          </button>
          <button class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            📧 Partager
          </button>
          <button class="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
            ⭐ Ajouter aux favoris
          </button>
          <button class="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700">
            🖨️ Imprimer
          </button>
        </div>
      </div>
    `;
    
    // Ajouter l'événement de fermeture
    consultationWindow.querySelector('.close-consultation')?.addEventListener('click', () => {
      consultationWindow.remove();
    });
    
    // Ajouter les événements pour les boutons d'action
    consultationWindow.querySelectorAll('button').forEach(btn => {
      if (!btn.classList.contains('close-consultation')) {
        btn.addEventListener('click', () => {
          alert(`Action "${btn.textContent}" exécutée pour "${text.title}"`);
        });
      }
    });
    
    // Ajouter à la page
    document.body.appendChild(consultationWindow);
  };

  const handleDownload = () => {
    console.log('Downloading legal text:', text.title);
    // Simulate download
    window.dispatchEvent(new CustomEvent('download-legal-text', { 
      detail: { 
        textId: text.id,
        title: text.title,
        format: 'pdf'
      }
    }));
  };

  const handleShare = () => {
    console.log('Sharing legal text:', text.title);
    // Open share modal
    window.dispatchEvent(new CustomEvent('share-legal-text', { 
      detail: { 
        textId: text.id,
        title: text.title,
        url: `${window.location.origin}/legal-text/${text.id}`
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En vigueur':
        return 'bg-green-100 text-green-800';
      case 'Abrogé':
        return 'bg-red-100 text-red-800';
      case 'Suspendu':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Loi':
        return Scale;
      case 'Ordonnance':
        return BookOpen;
      case 'Décret':
        return Building;
      default:
        return FileText;
    }
  };

  const TypeIcon = getTypeIcon(text.type);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TypeIcon className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-lg">{text.title}</CardTitle>
              <Badge variant="outline">{text.type}</Badge>
              <Badge className={getStatusColor(text.status)}>
                {text.status}
              </Badge>
            </div>
            <CardDescription className="mb-3">
              {text.description}
            </CardDescription>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Publié le:</span>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {text.publishDate}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Catégorie:</span>
                <p className="font-medium flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {text.category}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Autorité:</span>
                <p className="font-medium">{text.authority}</p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {text.joNumber}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleConsult}
            >
              <Eye className="w-4 h-4 mr-1" />
              Consulter
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-1" />
              Télécharger
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-1" />
              Partager
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
