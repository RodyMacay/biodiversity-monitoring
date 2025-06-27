"use client";

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { GET_ALL_LOCATIONS } from '@/graphql/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Loader2, AlertCircle, Trees, Globe, Eye } from 'lucide-react';
import LocationDetails from './LocationDetails';
import 'leaflet/dist/leaflet.css';

// Configuración del icono personalizado
const createCustomIcon = (color: string = '#3b82f6') => {
  return divIcon({
    html: `
      <div class="w-8 h-8 bg-white rounded-full shadow-lg border-2 border-${color === '#3b82f6' ? 'blue' : 'green'}-500 flex items-center justify-center">
        <svg class="w-4 h-4 text-${color === '#3b82f6' ? 'blue' : 'green'}-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

interface Location {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface LocationsMapProps {
  className?: string;
}

const LocationsMap = ({ className }: LocationsMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [mapReady, setMapReady] = useState(false);

  const { loading, error, data } = useQuery(GET_ALL_LOCATIONS);

  useEffect(() => {
    if (data?.locations && data.locations.length > 0) {
      // Calcular el centro del mapa basado en todas las ubicaciones
      const latitudes = data.locations.map((loc: Location) => loc.coordinates.latitude);
      const longitudes = data.locations.map((loc: Location) => loc.coordinates.longitude);
      
      const centerLat = latitudes.reduce((a: number, b: number) => a + b, 0) / latitudes.length;
      const centerLng = longitudes.reduce((a: number, b: number) => a + b, 0) / longitudes.length;
      
      setMapCenter([centerLat, centerLng]);
      setMapReady(true);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row h-full bg-gray-50">
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg mx-4 mt-4">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Cargando mapa...</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 p-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error al cargar ubicaciones</h3>
            <p className="text-gray-600 mb-4">No se pudieron cargar las ubicaciones del mapa.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Intentar de nuevo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!mapReady || !data?.locations?.length) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay ubicaciones</h3>
            <p className="text-gray-600">No se encontraron ubicaciones para mostrar en el mapa.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`flex flex-col lg:flex-row h-full bg-gray-50 ${className}`}>
      {/* Mapa */}
      <div className="flex-1 relative">
        <MapContainer
          center={mapCenter}
          zoom={6}
          className="h-full w-full rounded-lg shadow-lg mx-4 mt-4"
          style={{ minHeight: '400px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {data.locations.map((location: Location) => (
            <Marker
              key={location.id}
              position={[location.coordinates.latitude, location.coordinates.longitude]}
              icon={createCustomIcon(selectedLocation === location.id ? '#10b981' : '#3b82f6')}
              eventHandlers={{
                click: () => setSelectedLocation(location.id),
              }}
            >
              <Popup>
                <div className="p-2 min-w-48">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {location.name}
                  </h3>
                  <Button
                    size="sm"
                    onClick={() => setSelectedLocation(location.id)}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver detalles
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Indicador de ubicaciones */}
        <div className="absolute top-8 left-8 z-[1000]">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Trees className="h-5 w-5 text-green-600" />
                <span className="font-medium">
                  {data.locations.length} ubicaciones encontradas
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Panel de detalles */}
      <div className="w-full lg:w-96 p-4 bg-white lg:bg-transparent">
        <Card className="h-full shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              {selectedLocation ? 'Detalles de Ubicación' : 'Selecciona una Ubicación'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 overflow-y-auto">
            {selectedLocation ? (
              <LocationDetails locationId={selectedLocation} />
            ) : (
              <div className="text-center py-8">
                <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Explora el Mapa
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Haz clic en cualquier marcador del mapa para ver información detallada sobre esa ubicación.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary" className="mr-2">
                    🌍 Ecosistemas
                  </Badge>
                  <Badge variant="secondary" className="mr-2">
                    🦎 Especies
                  </Badge>
                  <Badge variant="secondary">
                    📊 Datos de Monitoreo
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocationsMap;