import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { type LocationWithSpecies } from '@/types';
import { Badge } from '@/components/ui/badge';

type InteractiveMapProps = {
  locations: LocationWithSpecies[];
};

export function InteractiveMap({ locations }: InteractiveMapProps) {
  return (
    <Card className="h-[600px] w-full p-4">
      <MapContainer 
        center={[0, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locations.map((location) => (
          <Marker 
            key={location._id} 
            position={[location.coordinates.latitude, location.coordinates.longitude]}
          >
            <Popup>
              <div className="space-y-2">
                <h3 className="font-bold">{location.name}</h3>
                <p>{location.description}</p>
                <div className="flex flex-wrap gap-1">
                  {location.species.map((species) => (
                    <Badge 
                      key={species._id} 
                      variant={species.conservationStatus === 'Endangered' ? 'destructive' : 'default'}
                    >
                      {species.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Card>
  );
}