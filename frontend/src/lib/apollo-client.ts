import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Configurar el enlace HTTP
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
});

// Configurar el enlace de autenticación
const authLink = setContext(async (_, { headers }) => {
  // Obtener el token de autenticación desde Clerk
  let token = null;
  
  if (typeof window !== 'undefined') {
    try {
      // Intentar obtener el token de Clerk
      const { getToken } = await import('@clerk/nextjs');
      token = await getToken();
    } catch (error) {
      console.log('Error obteniendo token de Clerk:', error);
      // Fallback a localStorage
      token = localStorage.getItem('authToken');
    }
  }
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Configurar el manejo de errores
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `Error de GraphQL: Mensaje: ${message}, Ubicación: ${locations}, Ruta: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`Error de red: ${networkError}`);
    
    // Si es un error 401, redirigir al login
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      // Limpiar el token y redirigir
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/sign-in';
      }
    }
  }
});

// Crear el cliente Apollo
const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          monitoringData: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          species: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          locations: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          monitoringMethods: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;

