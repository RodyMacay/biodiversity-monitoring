import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MapPin, 
  Globe2, 
  Trees, 
  AlertCircle, 
  Leaf, 
  FileText,
  Crown,
  Shield,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { conservationStatusOptions } from '@/constants';
import { GET_LOCATION_DETAILS } from '@/graphql/queries';

interface Species {
  id: string;
  name?: string;
  description?: string;
  scientificName?: string;
  conservationStatus?: string;
  imageUrl?: string;
}

interface LocationDetailsData {
  locationById: {
    id: string;
    name: string;
    description?: string;
    ecosystem: string;
    country: string;
    region?: string;
    monitoringData: Array<{
      id: string;
      species: Species;
    }>;
  };
}

interface Props {
  locationId: string;
}

const getConservationStatusIcon = (status: string) => {
  const statusLower = status?.toLowerCase() || '';
  
  if (statusLower.includes('critically endangered') || statusLower.includes('en peligro crítico')) {
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  }
  if (statusLower.includes('endangered') || statusLower.includes('en peligro')) {
    return <AlertCircle className="h-4 w-4 text-orange-600" />;
  }
  if (statusLower.includes('vulnerable') || statusLower.includes('vulnerable')) {
    return <Shield className="h-4 w-4 text-yellow-600" />;
  }
  if (statusLower.includes('least concern') || statusLower.includes('preocupación menor')) {
    return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  }
  return <Crown className="h-4 w-4 text-blue-600" />;
};

const getConservationStatusColor = (status: string) => {
  const statusLower = status?.toLowerCase() || '';
  
  if (statusLower.includes('critically endangered') || statusLower.includes('en peligro crítico')) {
    return 'destructive';
  }
  if (statusLower.includes('endangered') || statusLower.includes('en peligro')) {
    return 'destructive';
  }
  if (statusLower.includes('vulnerable') || statusLower.includes('vulnerable')) {
    return 'secondary';
  }
  if (statusLower.includes('least concern') || statusLower.includes('preocupación menor')) {
    return 'default';
  }
  return 'outline';
};

const LocationDetails = ({ locationId }: Props) => {
  const [fetchDetails, { loading, error, data }] = useLazyQuery<LocationDetailsData>(GET_LOCATION_DETAILS);

  useEffect(() => {
    if (locationId) {
      fetchDetails({ variables: { locationId } });
    }
  }, [locationId, fetchDetails]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/2" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error al cargar los detalles de la ubicación. Por favor, intenta de nuevo.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.locationById) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No se encontraron datos para esta ubicación.
        </AlertDescription>
      </Alert>
    );
  }

  const { locationById: location } = data;

  // Obtener especies únicas
  const uniqueSpecies = Array.from(
    new Map(
      location.monitoringData.map(item => [item.species.id, item.species])
    ).values()
  );

  // Estadísticas de conservación
  const conservationStats = uniqueSpecies.reduce((acc, species) => {
    const status = species.conservationStatus?.toLowerCase() || 'unknown';
    if (status.includes('critically endangered') || status.includes('en peligro crítico')) {
      acc.critical++;
    } else if (status.includes('endangered') || status.includes('en peligro')) {
      acc.endangered++;
    } else if (status.includes('vulnerable')) {
      acc.vulnerable++;
    } else if (status.includes('least concern') || status.includes('preocupación menor')) {
      acc.stable++;
    } else {
      acc.unknown++;
    }
    return acc;
  }, { critical: 0, endangered: 0, vulnerable: 0, stable: 0, unknown: 0 });

  return (
    <div className="space-y-6">
      {/* Información básica */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-blue-600" />
          {location.name}
        </h2>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Globe2 className="h-4 w-4" />
            <span className="font-medium">{location.country}</span>
            {location.region && <span className="text-gray-400">• {location.region}</span>}
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Trees className="h-4 w-4" />
            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
              {location.ecosystem}
            </Badge>
          </div>
        </div>

        {location.description && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 text-sm leading-relaxed">
                {location.description}
              </p>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Estadísticas de especies */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Especies Registradas
          </h3>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {uniqueSpecies.length}
          </Badge>
        </div>

        {/* Estadísticas de conservación */}
        {uniqueSpecies.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {conservationStats.critical > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <div className="text-red-700 font-bold text-lg">{conservationStats.critical}</div>
                <div className="text-red-600 text-xs">En Peligro Crítico</div>
              </div>
            )}
            {conservationStats.endangered > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                <div className="text-orange-700 font-bold text-lg">{conservationStats.endangered}</div>
                <div className="text-orange-600 text-xs">En Peligro</div>
              </div>
            )}
            {conservationStats.vulnerable > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <div className="text-yellow-700 font-bold text-lg">{conservationStats.vulnerable}</div>
                <div className="text-yellow-600 text-xs">Vulnerable</div>
              </div>
            )}
            {conservationStats.stable > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="text-green-700 font-bold text-lg">{conservationStats.stable}</div>
                <div className="text-green-600 text-xs">Estable</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lista de especies */}
      {uniqueSpecies.length > 0 ? (
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {uniqueSpecies.map((species) => (
              <Card key={species.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {species.name || 'Nombre no disponible'}
                      </h4>
                      
                      {species.scientificName && (
                        <p className="text-sm text-gray-600 italic mt-1">
                          {species.scientificName}
                        </p>
                      )}
                      
                      {species.conservationStatus && (
                        <div className="flex items-center gap-2 mt-2">
                          {getConservationStatusIcon(species.conservationStatus)}
                          <Badge 
                            variant={getConservationStatusColor(species.conservationStatus)}
                            className="text-xs"
                          >
                            {species.conservationStatus ? (conservationStatusOptions as Record<string, string>)[species.conservationStatus] : species.conservationStatus || ''}
                          </Badge>
                        </div>
                      )}
                      {species.description && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            {species.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-8">
          <Trees className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No hay datos de especies para esta ubicación.</p>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;