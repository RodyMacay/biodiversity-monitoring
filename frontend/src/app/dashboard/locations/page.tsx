import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InteractiveMap } from '@/components/map/interactive-map';
import { getLocationsWithSpecies } from '@/lib/api/locations';

export default async function LocationsPage() {
  const locations = await getLocationsWithSpecies();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ubicaciones de Especies</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="map">
            <TabsList>
              <TabsTrigger value="map">Mapa</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="pt-4">
              <InteractiveMap locations={locations} />
            </TabsContent>
            <TabsContent value="list" className="pt-4">
              {/* List view will be implemented here */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}