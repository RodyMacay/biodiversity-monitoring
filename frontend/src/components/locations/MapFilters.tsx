import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Filter,  
  Trees, 
  Shield, 
  Globe, 
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MapFilters as MapFiltersType, EcosystemType, ConservationStatus } from '@/types/maps';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

interface MapFiltersProps {
  filters: MapFiltersType;
  onFiltersChange: (filters: MapFiltersType) => void;
  availableEcosystems?: string[];
  availableCountries?: string[];
  className?: string;
}

const MapFilters = ({ 
  filters, 
  onFiltersChange, 
  availableEcosystems = [],
  availableCountries = [],
  className 
}: MapFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const ecosystemOptions = availableEcosystems.length > 0 
    ? availableEcosystems 
    : Object.values(EcosystemType);

  const conservationOptions = Object.values(ConservationStatus);

  const handleEcosystemChange = (ecosystem: string, checked: boolean) => {
    const current = filters.ecosystem || [];
    const updated = checked 
      ? [...current, ecosystem]
      : current.filter(e => e !== ecosystem);
    
    onFiltersChange({ ...filters, ecosystem: updated });
  };

  const handleConservationChange = (status: string, checked: boolean) => {
    const current = filters.conservationStatus || [];
    const updated = checked 
      ? [...current, status]
      : current.filter(s => s !== status);
    
    onFiltersChange({ ...filters, conservationStatus: updated });
  };

  const handleCountryChange = (country: string, checked: boolean) => {
    const current = filters.country || [];
    const updated = checked 
      ? [...current, country]
      : current.filter(c => c !== country);
    
    onFiltersChange({ ...filters, country: updated });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.ecosystem?.length) count += filters.ecosystem.length;
    if (filters.conservationStatus?.length) count += filters.conservationStatus.length;
    if (filters.country?.length) count += filters.country.length;
    if (filters.hasSpecies) count += 1;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  if (!isExpanded) {
    return (
      <Card className={`w-full max-w-sm ${className}`}>
        <CardContent className="p-4">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(true)}
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-sm ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
        
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Limpiar todo
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <ScrollArea className="h-64">
          <div className="space-y-6">
            {/* Filtro de especies */}
            <div>
              <Label className="text-sm font-medium mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                Disponibilidad de Datos
              </Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasSpecies"
                  checked={filters.hasSpecies || false}
                  onCheckedChange={(checked) => 
                    onFiltersChange({ ...filters, hasSpecies: checked as boolean })
                  }
                />
                <Label htmlFor="hasSpecies" className="text-sm">
                  Solo ubicaciones con especies registradas
                </Label>
              </div>
            </div>

            <Separator />

            {/* Filtro de ecosistemas */}
            <div>
              <Label className="text-sm font-medium mb-3 flex items-center gap-2">
                <Trees className="h-4 w-4 text-green-600" />
                Ecosistemas
                {filters.ecosystem?.length ? (
                  <Badge variant="secondary" className="text-xs">
                    {filters.ecosystem.length}
                  </Badge>
                ) : null}
              </Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {ecosystemOptions.map((ecosystem) => (
                  <div key={ecosystem} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ecosystem-${ecosystem}`}
                      checked={filters.ecosystem?.includes(ecosystem) || false}
                      onCheckedChange={(checked) => 
                        handleEcosystemChange(ecosystem, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`ecosystem-${ecosystem}`} 
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {ecosystem}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Filtro de estado de conservación */}
            <div>
              <Label className="text-sm font-medium mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-600" />
                Estado de Conservación
                {filters.conservationStatus?.length ? (
                  <Badge variant="secondary" className="text-xs">
                    {filters.conservationStatus.length}
                  </Badge>
                ) : null}
              </Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {conservationOptions.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`conservation-${status}`}
                      checked={filters.conservationStatus?.includes(status) || false}
                      onCheckedChange={(checked) => 
                        handleConservationChange(status, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`conservation-${status}`} 
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Filtro de países (si hay datos disponibles) */}
            {availableCountries.length > 0 && (
              <>
                <Separator />
                <div>
                  <Label className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    Países
                    {filters.country?.length ? (
                      <Badge variant="secondary" className="text-xs">
                        {filters.country.length}
                      </Badge>
                    ) : null}
                  </Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {availableCountries.map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox
                          id={`country-${country}`}
                          checked={filters.country?.includes(country) || false}
                          onCheckedChange={(checked) => 
                            handleCountryChange(country, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={`country-${country}`} 
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {country}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MapFilters;