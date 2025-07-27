import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Users, Building, Clock, Star, Filter, SortAsc, Eye, Scale, BookOpen, Heart, Upload, Quote, Search, Download, Share2 } from 'lucide-react';
import { TabSearchField } from '@/components/common/TabSearchField';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimpleFilterModal } from '../legal/modals/SimpleFilterModal';
import { SimpleSortModal } from '../legal/modals/SimpleSortModal';

interface ProcedureCatalogTabProps {
  onAddProcedure?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function ProcedureCatalogTab({ onAddProcedure, onOpenApprovalQueue }: ProcedureCatalogTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'type' | 'status' | 'digitization'>('type');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDigitization, setSelectedDigitization] = useState<string | null>(null);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const handleTabSearch = (query: string) => {
    setSearchTerm(query);
    console.log('Procedure tab search:', query);
  };

  const handleFilterChange = (filters: { type?: string; status?: string; digitization?: string }) => {
    if (filters.type !== undefined) setSelectedType(filters.type);
    if (filters.status !== undefined) setSelectedStatus(filters.status);
    if (filters.digitization !== undefined) setSelectedDigitization(filters.digitization);
    console.log('Filters changed:', filters);
  };

  const handleFilter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFilterModalOpen(true);
  };

  const handleSort = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSortModalOpen(true);
  };

  const handleFiltersApplied = (filters: any) => {
    console.log('✅ Filters applied to procedures:', filters);
    // Ici on pourrait filtrer la liste des procédures
    setIsFilterModalOpen(false);
  };

  const handleSortApplied = (sort: any) => {
    console.log('✅ Sort applied to procedures:', sort);
    // Ici on pourrait trier la liste des procédures
    setIsSortModalOpen(false);
  };

  const handleTypeSelect = (typeId: string) => {
    const type = typeId === 'all' ? null : typeId;
    setSelectedType(type);
    handleFilterChange({ type });
  };

  const handleStatusSelect = (statusId: string) => {
    const status = statusId === 'all' ? null : statusId;
    setSelectedStatus(status);
    handleFilterChange({ status });
  };

  const handleDigitizationSelect = (digitizationId: string) => {
    const digitization = digitizationId === 'all' ? null : digitizationId;
    setSelectedDigitization(digitization);
    handleFilterChange({ digitization });
  };

  // Gestionnaire pour consulter une procédure - VERSION FONCTIONNELLE
  const handleViewProcedure = (procedure: any) => {
    // Créer une interface complète de consultation de procédure
    const procedureWindow = document.createElement('div');
    procedureWindow.className = 'fixed inset-0 bg-white z-50 overflow-y-auto';
    procedureWindow.innerHTML = `
      <div class="max-w-6xl mx-auto p-6">
        <div class="flex justify-between items-center mb-6 border-b pb-4">
          <h1 class="text-2xl font-bold text-emerald-600">${procedure.title}</h1>
          <button class="close-procedure bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Fermer
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Informations de la procédure -->
          <div class="lg:col-span-1">
            <div class="bg-emerald-50 p-4 rounded-lg mb-4">
              <h3 class="font-semibold text-emerald-900 mb-3">📋 Informations Générales</h3>
              <div class="space-y-2 text-sm">
                <div><strong>Type:</strong> ${procedure.type}</div>
                <div><strong>Durée estimée:</strong> ${procedure.duration || '15-30 jours'}</div>
                <div><strong>Coût:</strong> ${procedure.cost || 'Variable selon dossier'}</div>
                <div><strong>Complexité:</strong> ${procedure.complexity}</div>
                <div><strong>Numérisée:</strong> ${procedure.isDigitized ? 'Oui' : 'Non'}</div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 class="font-semibold text-blue-900 mb-3">📍 Où s'adresser</h3>
              <div class="space-y-2 text-sm">
                <div><strong>Institution:</strong> ${procedure.institution}</div>
                <div><strong>Service:</strong> État Civil</div>
                <div><strong>Adresse:</strong> Mairie de la commune</div>
                <div><strong>Horaires:</strong> 8h-16h30</div>
                <div><strong>Tél:</strong> 021 XX XX XX</div>
              </div>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h3 class="font-semibold text-yellow-900 mb-3">📄 Documents requis</h3>
              <ul class="space-y-1 text-sm">
                <li>• Pièce d'identité originale</li>
                <li>• Justificatif de domicile récent</li>
                <li>• Formulaire de demande</li>
                <li>• Timbre fiscal (si applicable)</li>
              </ul>
            </div>
          </div>
          
          <!-- Contenu principal -->
          <div class="lg:col-span-2">
            <div class="bg-white border rounded-lg p-6 mb-6">
              <h3 class="font-semibold text-gray-900 mb-4">🔍 Description de la procédure</h3>
              <p class="text-gray-700 mb-4">${procedure.description}</p>
              
              <h4 class="font-semibold text-gray-900 mb-3">📝 Étapes à suivre :</h4>
              <div class="space-y-4">
                <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                  <div class="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h5 class="font-medium">Préparation du dossier</h5>
                    <p class="text-sm text-gray-600">Rassembler tous les documents nécessaires listés ci-contre</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                  <div class="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h5 class="font-medium">Dépôt de la demande</h5>
                    <p class="text-sm text-gray-600">Se présenter au guichet avec le dossier complet</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                  <div class="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h5 class="font-medium">Instruction du dossier</h5>
                    <p class="text-sm text-gray-600">Vérification et traitement par les services compétents</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                  <div class="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h5 class="font-medium">Retrait du document</h5>
                    <p class="text-sm text-gray-600">Récupération du document sur présentation du récépissé</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Actions disponibles -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button class="action-btn bg-blue-600 text-white p-3 rounded hover:bg-blue-700 text-center">
                📄 Télécharger<br>Formulaire
              </button>
              <button class="action-btn bg-green-600 text-white p-3 rounded hover:bg-green-700 text-center">
                📍 Localiser<br>Service
              </button>
              <button class="action-btn bg-purple-600 text-white p-3 rounded hover:bg-purple-700 text-center">
                💰 Calculer<br>Coûts
              </button>
              <button class="action-btn bg-orange-600 text-white p-3 rounded hover:bg-orange-700 text-center">
                ⭐ Ajouter aux<br>Favoris
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Événements
    procedureWindow.querySelector('.close-procedure')?.addEventListener('click', () => {
      procedureWindow.remove();
    });
    
    procedureWindow.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert(`Action "${btn.textContent.replace(/\s+/g, ' ')}" exécutée pour "${procedure.title}"`);
      });
    });
    
    document.body.appendChild(procedureWindow);
  };

  const types = [
    { id: 'all', label: 'Tous', color: 'bg-gray-600' },
    { id: 'civil', label: 'État Civil', color: 'bg-emerald-600' },
    { id: 'commercial', label: 'Commercial', color: 'bg-blue-600' },
    { id: 'urbanisme', label: 'Urbanisme', color: 'bg-purple-600' },
    { id: 'fiscalite', label: 'Fiscalité', color: 'bg-orange-600' }
  ];

  const statuses = [
    { id: 'all', label: 'Tous', color: 'bg-teal-600' },
    { id: 'active', label: 'Active', color: 'bg-green-600' },
    { id: 'suspended', label: 'Suspendue', color: 'bg-yellow-600' },
    { id: 'modified', label: 'Modifiée', color: 'bg-blue-600' }
  ];

  const digitizationOptions = [
    { id: 'all', label: 'Tous', color: 'bg-gray-600' },
    { id: 'yes', label: 'Oui', color: 'bg-green-600' },
    { id: 'no', label: 'Non', color: 'bg-red-600' },
    { id: 'partially', label: 'Partiellement', color: 'bg-orange-600' }
  ];

  const procedures = [
    {
      id: 1,
      title: "Création d'entreprise SARL",
      description: "Procédure complète pour créer une société à responsabilité limitée",
      category: "Entreprise",
      type: "commercial",
      duration: "15-30 jours",
      complexity: "Moyenne",
      popularity: 95,
      status: "active",
      digitization: "yes"
    },
    {
      id: 2,
      title: "Permis de construire",
      description: "Demande d'autorisation de construction pour bâtiment résidentiel",
      category: "Urbanisme",
      type: "urbanisme",
      duration: "2-3 mois",
      complexity: "Élevée",
      popularity: 87,
      status: "active",
      digitization: "partially"
    },
    {
      id: 3,
      title: "Carte nationale d'identité",
      description: "Renouvellement ou première demande de CNI",
      category: "État Civil",
      type: "civil",
      duration: "7-14 jours",
      complexity: "Faible",
      popularity: 92,
      status: "active",
      digitization: "yes"
    },
    {
      id: 4,
      title: "Passeport biométrique",
      description: "Demande de passeport biométrique pour voyages internationaux",
      category: "État Civil",
      type: "civil",
      duration: "10-21 jours",
      complexity: "Moyenne",
      popularity: 89,
      status: "active",
      digitization: "yes"
    },
    {
      id: 5,
      title: "Licence d'importation",
      description: "Obtention d'une licence pour l'importation de marchandises",
      category: "Commerce",
      type: "commercial",
      duration: "30-45 jours",
      complexity: "Élevée",
      popularity: 76,
      status: "modified",
      digitization: "partially"
    },
    {
      id: 6,
      title: "Certificat de résidence",
      description: "Demande de certificat de résidence pour usage administratif",
      category: "État Civil",
      type: "civil",
      duration: "3-7 jours",
      complexity: "Faible",
      popularity: 85,
      status: "active",
      digitization: "no"
    },
    {
      id: 7,
      title: "Agrément sanitaire",
      description: "Obtention d'agrément pour activités liées à l'alimentation",
      category: "Santé",
      type: "commercial",
      duration: "45-60 jours",
      complexity: "Élevée",
      popularity: 73,
      status: "suspended",
      digitization: "no"
    },
    {
      id: 8,
      title: "Déclaration fiscale entreprise",
      description: "Procédure de déclaration fiscale annuelle pour entreprises",
      category: "Fiscalité",
      type: "fiscalite",
      duration: "5-15 jours",
      complexity: "Moyenne",
      popularity: 91,
      status: "active",
      digitization: "yes"
    }
  ];

  const institutions = [
    {
      id: 1,
      name: "Ministère de l'Intérieur",
      type: "Ministériel",
      proceduresCount: 156,
      description: "Responsable des procédures d'état civil et de sécurité",
      icon: Building
    },
    {
      id: 2,
      name: "Ministère du Commerce",
      type: "Ministériel",
      proceduresCount: 89,
      description: "Gestion des procédures commerciales et d'investissement",
      icon: Scale
    },
    {
      id: 3,
      name: "Wilayas",
      type: "Territorial",
      proceduresCount: 234,
      description: "Administration territoriale des procédures locales",
      icon: Users
    },
    {
      id: 4,
      name: "Communes",
      type: "Local",
      proceduresCount: 187,
      description: "Services de proximité et procédures municipales",
      icon: Building
    }
  ];

  const procedureTypes = [
    {
      id: 1,
      name: "État Civil",
      count: 45,
      description: "Documents d'identité et d'état civil",
      icon: FileText,
      color: "emerald"
    },
    {
      id: 2,
      name: "Entreprises",
      count: 67,
      description: "Création et gestion d'entreprises",
      icon: Building,
      color: "blue"
    },
    {
      id: 3,
      name: "Urbanisme",
      count: 34,
      description: "Permis de construire et urbanisme",
      icon: BookOpen,
      color: "purple"
    },
    {
      id: 4,
      name: "Commerce",
      count: 28,
      description: "Licences et autorisations commerciales",
      icon: Scale,
      color: "orange"
    }
  ];

  const featuredProcedures = [
    {
      id: 1,
      title: "Création d'entreprise en ligne",
      type: "Procédure",
      category: "Entreprise",
      publishDate: "10 janvier 2024",
      views: "3,247",
      downloads: "1,892",
      featured: true
    },
    {
      id: 2,
      title: "Renouvellement passeport express",
      type: "Procédure",
      category: "État Civil",
      publishDate: "2024-01-15",
      views: "2,156",
      downloads: "1,234",
      featured: true
    },
    {
      id: 3,
      title: "Licence d'exportation simplifiée",
      type: "Procédure",
      category: "Commerce",
      publishDate: "20 janvier 2024",
      views: "1,789",
      downloads: "856",
      featured: true
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "M. Ahmed Benali",
      role: "Entrepreneur",
      speciality: "Commerce",
      rating: 5,
      comment: "La procédure de création d'entreprise en ligne m'a fait gagner énormément de temps. Interface très claire.",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Mme. Fatima Khelil",
      role: "Citoyenne",
      speciality: "État Civil",
      rating: 5,
      comment: "Renouvellement de passeport très rapide grâce aux nouvelles procédures dématérialisées.",
      date: "12 janvier 2024"
    },
    {
      id: 3,
      name: "Dr. Karim Meziani",
      role: "Médecin",
      speciality: "Santé",
      rating: 4,
      comment: "Les procédures d'agrément sanitaire sont maintenant plus transparentes et accessibles.",
      date: "08 janvier 2024"
    }
  ];

  const contributeOptions = [
    {
      id: 1,
      title: "Ajouter une procédure",
      description: "Contribuez en ajoutant de nouvelles procédures administratives",
      icon: Plus,
      action: "Ajouter",
      color: "emerald"
    },
    {
      id: 2,
      title: "Importer des documents",
      description: "Importez des documents pour enrichir les procédures",
      icon: Upload,
      action: "Importer",
      color: "blue"
    },
    {
      id: 3,
      title: "Rejoindre la communauté",
      description: "Participez aux discussions sur les procédures",
      icon: Users,
      action: "Rejoindre",
      color: "purple"
    },
    {
      id: 4,
      title: "Signaler un problème",
      description: "Aidez-nous à améliorer les procédures existantes",
      icon: Heart,
      action: "Signaler",
      color: "red"
    }
  ];

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesQuickSearch = !quickSearchQuery || 
                              procedure.title.toLowerCase().includes(quickSearchQuery.toLowerCase()) ||
                              procedure.description.toLowerCase().includes(quickSearchQuery.toLowerCase()) ||
                              procedure.category.toLowerCase().includes(quickSearchQuery.toLowerCase());
    
    const matchesType = !selectedType || procedure.type === selectedType;
    const matchesStatus = !selectedStatus || procedure.status === selectedStatus;
    const matchesDigitization = !selectedDigitization || procedure.digitization === selectedDigitization;
    
    return matchesSearch && matchesQuickSearch && matchesType && matchesStatus && matchesDigitization;
  });

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-600", button: "bg-emerald-600 hover:bg-emerald-700" },
      blue: { bg: "bg-blue-100", text: "text-blue-600", button: "bg-blue-600 hover:bg-blue-700" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", button: "bg-purple-600 hover:bg-purple-700" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", button: "bg-orange-600 hover:bg-orange-700" },
      red: { bg: "bg-red-100", text: "text-red-600", button: "bg-red-600 hover:bg-red-700" }
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getTabButtonClass = (tab: 'type' | 'status' | 'digitization') => {
    const isActive = activeTab === tab;
    return `px-4 py-2 font-medium transition-colors ${
      isActive 
        ? 'bg-emerald-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    } ${tab === 'type' ? 'rounded-l-lg' : tab === 'digitization' ? 'rounded-r-lg' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Champ de recherche avec reconnaissance vocale */}
      <TabSearchField
        placeholder="Rechercher des procédures administratives..."
        onSearch={handleTabSearch}
        suggestions={[
          "Création d'entreprise",
          "Permis de construire",
          "Carte d'identité",
          "Passeport",
          "Acte de naissance",
          "Certificat de résidence",
          "Agrément commercial",
          "Licence d'importation"
        ]}
      />

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">248</div>
            <div className="text-sm text-gray-600">Procédures</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">1,542</div>
            <div className="text-sm text-gray-600">Utilisateurs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">47</div>
            <div className="text-sm text-gray-600">Organismes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">12.5</div>
            <div className="text-sm text-gray-600">Jours (moy.)</div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche et boutons d'action modifiée */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="text-lg font-semibold">
          {filteredProcedures.length} procédure(s) trouvée(s)
        </div>
        
        <div className="flex gap-2 flex-wrap items-center">
          {/* Nouveau champ de recherche rapide */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Recherche rapide..."
              value={quickSearchQuery}
              onChange={(e) => setQuickSearchQuery(e.target.value)}
              className="pl-10 w-48"
            />
          </div>
          
          <Button variant="outline" size="sm" onClick={handleFilter} type="button">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleSort} type="button">
            <SortAsc className="w-4 h-4 mr-2" />
            Trier
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              console.log('File d\'approbation clicked - redirection vers Alimentation de la Banque de Données');
              const event = new CustomEvent('navigate-to-section', {
                detail: 'bank-feeding-procedures-approval'
              });
              window.dispatchEvent(event);
            }}
            className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            File d'approbation
          </Button>
          
          <Button size="sm" onClick={() => {
            console.log('Ajouter une procédure clicked - redirection vers Alimentation de la Banque de Données');
            const event = new CustomEvent('navigate-to-section', {
              detail: 'bank-feeding-procedures-enrichment'
            });
            window.dispatchEvent(event);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une procédure
          </Button>
        </div>
      </div>

      {/* Filtre avec onglets Type, Statut et Numérisation */}
      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="flex flex-col gap-4">
            {/* Tabs */}
            <div className="flex">
              <button
                onClick={() => setActiveTab('type')}
                className={getTabButtonClass('type')}
              >
                Type
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={getTabButtonClass('status')}
              >
                Statut
              </button>
              <button
                onClick={() => setActiveTab('digitization')}
                className={getTabButtonClass('digitization')}
              >
                Numérisation
              </button>
            </div>

            {/* Filter Options */}
            <div className="flex flex-wrap gap-2">
              {activeTab === 'type' && types.map((type) => (
                <Badge
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm ${
                    selectedType === type.id || (selectedType === null && type.id === 'all')
                      ? `${type.color} text-white hover:opacity-80`
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  {type.label}
                </Badge>
              ))}
              
              {activeTab === 'status' && statuses.map((status) => (
                <Badge
                  key={status.id}
                  variant={selectedStatus === status.id ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm ${
                    selectedStatus === status.id || (selectedStatus === null && status.id === 'all')
                      ? `${status.color} text-white hover:opacity-80`
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleStatusSelect(status.id)}
                >
                  {status.label}
                </Badge>
              ))}
              
              {activeTab === 'digitization' && digitizationOptions.map((option) => (
                <Badge
                  key={option.id}
                  variant={selectedDigitization === option.id ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm ${
                    selectedDigitization === option.id || (selectedDigitization === null && option.id === 'all')
                      ? `${option.color} text-white hover:opacity-80`
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleDigitizationSelect(option.id)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des procédures */}
      <div className="space-y-4">
        {filteredProcedures.map((procedure) => (
          <Card key={procedure.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{procedure.title}</h3>
                    <Badge variant="secondary">{procedure.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{procedure.popularity}%</span>
                    </div>
                    <Badge 
                      variant={
                        procedure.digitization === 'yes' ? 'default' :
                        procedure.digitization === 'partially' ? 'secondary' : 'destructive'
                      }
                      className="text-xs"
                    >
                      {procedure.digitization === 'yes' ? 'Numérisée' : 
                       procedure.digitization === 'partially' ? 'Partiellement' : 'Non numérisée'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{procedure.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Durée: {procedure.duration}</span>
                    </div>
                    <div>
                      Complexité: <Badge variant={
                        procedure.complexity === 'Faible' ? 'default' :
                        procedure.complexity === 'Moyenne' ? 'secondary' : 'destructive'
                      }>{procedure.complexity}</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewProcedure(procedure)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Consulter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Télécharger
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Partager
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Onglets horizontaux pour les éléments */}
      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="types">Types de procédures</TabsTrigger>
          <TabsTrigger value="featured">Procédures en vedette</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages récents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {institutions.map((institution) => {
              const IconComponent = institution.icon;
              return (
                <Card key={institution.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{institution.name}</CardTitle>
                        <p className="text-sm text-gray-600">{institution.type}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{institution.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-emerald-600">
                        {institution.proceduresCount} procédures
                      </span>
                      <Button variant="outline" size="sm">
                        Voir les procédures
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {procedureTypes.map((type) => {
              const IconComponent = type.icon;
              const colorClasses = getColorClasses(type.color);
              return (
                <Card key={type.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                        <IconComponent className={`w-5 h-5 ${colorClasses.text}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{type.name}</CardTitle>
                        <p className="text-sm text-gray-600">{type.count} procédures</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Parcourir
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {featuredProcedures.map((procedure) => (
              <Card key={procedure.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{procedure.type}</Badge>
                        <Badge className="bg-emerald-100 text-emerald-800">{procedure.category}</Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{procedure.title}</CardTitle>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Publié le {procedure.publishDate}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {procedure.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {procedure.downloads}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewProcedure(procedure)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Consulter
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="w-4 h-4 mr-1" />
                        Partager
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <Badge variant="outline" className="mt-1">
                        {testimonial.speciality}
                      </Badge>
                    </div>
                    <Quote className="w-6 h-6 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-sm text-gray-700 italic">"{testimonial.comment}"</p>
                    <p className="text-xs text-gray-500">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Contribuez à la base de données */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Contribuez à la base de données des procédures administratives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contributeOptions.map((option) => {
            const IconComponent = option.icon;
            const colorClasses = getColorClasses(option.color);
            return (
              <Card key={option.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full ${colorClasses.bg} mb-3`}>
                      <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                    </div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-center">
                    <p className="text-sm text-gray-600">{option.description}</p>
                    <Button 
                      className={`w-full ${colorClasses.button}`}
                      onClick={option.id === 1 ? onAddProcedure : undefined}
                    >
                      {option.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modales */}
      <SimpleFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleFiltersApplied}
      />

      <SimpleSortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onApplySort={handleSortApplied}
      />
    </div>
  );
}
