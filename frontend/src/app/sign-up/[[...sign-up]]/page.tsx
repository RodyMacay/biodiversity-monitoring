import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors">
            <Leaf className="h-8 w-8 text-green-600" />
            <span>BiodiversityMonitor</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-600">
            Únete a la red global de conservacionistas y investigadores
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="flex justify-center">
          <SignUp 
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-xl border-0 bg-white/80 backdrop-blur-sm',
                headerTitle: 'text-gray-900',
                headerSubtitle: 'text-gray-600',
                socialButtonsBlockButton: 'border-gray-200 hover:bg-gray-50',
                formButtonPrimary: 'bg-green-600 hover:bg-green-700',
                footerActionLink: 'text-green-600 hover:text-green-700',
              },
            }}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/sign-in" className="text-green-600 hover:text-green-700 font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

