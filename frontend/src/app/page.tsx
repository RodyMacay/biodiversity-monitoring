import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  MapPin, 
  Microscope, 
  Satellite,
  Brain,
  ArrowRight,
  Shield,
  Users,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Sistema de Monitoreo de Biodiversidad
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Tecnología Avanzada para la Conservación
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Monitoreo Remoto de
            <span className="text-green-600"> Biodiversidad</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma integral que combina GIS, sensores remotos, técnicas moleculares 
            e inteligencia artificial para el monitoreo y conservación de especies.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="flex items-center space-x-2">
                <span>Explorar Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Métodos de Monitoreo Avanzados
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Utilizamos las tecnologías más avanzadas para el monitoreo 
              y conservación de la biodiversidad mundial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>Sistemas GIS</CardTitle>
                <CardDescription>
                  Análisis espacial-temporal y mapeo de distribución de especies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Mapeo de hábitats</li>
                  <li>• Análisis de cobertura vegetal</li>
                  <li>• Modelos de nicho ecológico</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Satellite className="h-12 w-12 text-purple-600 mb-2" />
                <CardTitle>Sensores Remotos</CardTitle>
                <CardDescription>
                  RADAR, LiDAR y tecnologías de detección avanzada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Seguimiento de vida silvestre</li>
                  <li>• Mapeo de estructuras forestales</li>
                  <li>• Monitoreo de ecosistemas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Microscope className="h-12 w-12 text-red-600 mb-2" />
                <CardTitle>Técnicas Moleculares</CardTitle>
                <CardDescription>
                  Análisis de ADN y marcadores genéticos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• ADN ambiental</li>
                  <li>• Diversidad genética</li>
                  <li>• Identificación de especies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Inteligencia Artificial</CardTitle>
                <CardDescription>
                  Reconocimiento automático y análisis predictivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Reconocimiento visual</li>
                  <li>• Análisis de audio</li>
                  <li>• Predicción de tendencias</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Impacto Global
            </h3>
            <p className="text-lg text-gray-600">
              Datos críticos sobre la crisis de biodiversidad mundial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">75%</h4>
              <p className="text-gray-600">
                del territorio terrestre ha sido alterado por actividades humanas
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">66%</h4>
              <p className="text-gray-600">
                del ecosistema marino ha sido distorsionado
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">300%</h4>
              <p className="text-gray-600">
                incremento en productividad agrícola desde 1970
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-lg font-semibold">BiodiversityMonitor</span>
              </div>
              <p className="text-gray-400">
                Tecnología avanzada para la conservación de la biodiversidad mundial.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/species" className="hover:text-white">Especies</Link></li>
                <li><Link href="/methods" className="hover:text-white">Métodos</Link></li>
                <li><Link href="/locations" className="hover:text-white">Ubicaciones</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-white">Documentación</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
                <li><Link href="/support" className="hover:text-white">Soporte</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">Acerca de</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contacto</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacidad</Link></li>
                <li><Link href="/terms" className="hover:text-white">Términos</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sistema de Monitoreo de Biodiversidad. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

