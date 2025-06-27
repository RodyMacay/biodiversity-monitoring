import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';


// Configurar el enlace HTTP
const httpLink = createHttpLink({
  uri: '/api/graphql-proxy',
});

// Configurar el manejo de errores
const errorLink = onError(({ graphQLErrors, networkError }) => {
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
  link: from([errorLink, httpLink]),
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

