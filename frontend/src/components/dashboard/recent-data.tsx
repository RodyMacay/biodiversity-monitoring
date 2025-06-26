'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { format, isValid  } from 'date-fns';
import { es } from 'date-fns/locale';

interface RecentDataItem {
  id: string;
  species: {
    name: string;
    scientificName: string;
    conservationStatus: string;
  };
  method: {
    name: string;
    type: string;
  };
  location: {
    name: string;
    country: string;
  };
  value: number;
  unit: string;
  date: string;
  verified: boolean;
}

interface RecentDataProps {
  data: RecentDataItem[];
  title?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'LEAST_CONCERN':
      return 'bg-green-100 text-green-800';
    case 'NEAR_THREATENED':
      return 'bg-yellow-100 text-yellow-800';
    case 'VULNERABLE':
      return 'bg-orange-100 text-orange-800';
    case 'ENDANGERED':
      return 'bg-red-100 text-red-800';
    case 'CRITICALLY_ENDANGERED':
      return 'bg-red-100 text-red-900';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'LEAST_CONCERN':
      return 'Preocupación Menor';
    case 'NEAR_THREATENED':
      return 'Casi Amenazada';
    case 'VULNERABLE':
      return 'Vulnerable';
    case 'ENDANGERED':
      return 'En Peligro';
    case 'CRITICALLY_ENDANGERED':
      return 'En Peligro Crítico';
    default:
      return 'Datos Insuficientes';
  }
};

const getMethodTypeText = (type: string) => {
  switch (type) {
    case 'GIS':
      return 'SIG';
    case 'REMOTE_SENSING':
      return 'Sensores Remotos';
    case 'MOLECULAR':
      return 'Molecular';
    case 'AI':
      return 'IA';
    default:
      return type;
  }
};

export function RecentData({ data, title = "Datos Recientes de Monitoreo" }: RecentDataProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Button variant="ghost" size="sm">
          Ver todos
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-3 rounded-lg border bg-gray-50/50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-green-100 text-green-700">
                  {item.species.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.species.name}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(item.species.conservationStatus)}
                  >
                    {getStatusText(item.species.conservationStatus)}
                  </Badge>
                </div>
                
                <p className="text-xs text-gray-500 italic mb-1">
                  {item.species.scientificName}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>📍 {item.location.name}, {item.location.country}</span>
                  <span>🔬 {getMethodTypeText(item.method.type)}</span>
                  <span>📊 {item.value} {item.unit}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center space-x-1">
                  {item.verified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-xs text-gray-500">
                    {item.verified ? 'Verificado' : 'Pendiente'}
                  </span>
                </div>
                
                <span className="text-xs text-gray-400">
                {isValid(new Date(item.date)) 
                  ? format(new Date(item.date), 'dd MMM yyyy', { locale: es }) 
                  : 'Fecha inválida'}                </span>
              </div>
            </div>
          ))}
          
          {data.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No hay datos recientes disponibles</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

